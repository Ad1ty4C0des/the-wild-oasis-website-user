import { genAI, PRIMARY_MODEL, FALLBACK_MODEL } from "@/app/_lib/gemini";
import { chatbotTools } from "@/app/_lib/chatbot-tools";
import { executeFunctionCall } from "@/app/_lib/chatbot-executor";

const SYSTEM_PROMPT = `You are the friendly, luxury AI Concierge for "The Wild Oasis" — a boutique cabin retreat nestled in the heart of nature.

VOICE & BEHAVIOR:
- Warm, polite, hospitable, and concise (2-4 sentences per response unless detail is requested).
- Use subtle nature motifs (e.g. pine, stars, quiet mountains, timber).
- You are knowledgeable, trustworthy, and precise with numbers and facts.

CAPABILITIES:
- Answer guest questions about cabins, pricing, capacity, amenities, and policies.
- Check live cabin availability and unavailable dates.
- Recommend the best cabin based on guest count and budget.
- Provide direct navigation links like "/cabins/[cabinId]" for booking.

CRITICAL INSTRUCTIONS:
- ALWAYS use your tools (searchCabins, getCabinDetails, checkAvailability, getAllCabins, getBookingSettings) to fetch real, accurate data from the database. NEVER invent prices, discounts, or cabin names.
- When quoting a price, state the final price per night after discount, and mention the discount if one exists.
- Check-in is 3:00 PM, Check-out is 11:00 AM.
- Direct guests to complete reservations using the booking calendar on the cabin's page: "/cabins/{cabinId}".
- Do not attempt to confirm reservations directly in chat; always guide them to reserve on the cabin page.`;

async function runChatWithModel(modelName, messages) {
  const model = genAI.getGenerativeModel({
    model: modelName,
    tools: chatbotTools,
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
  });

  // Gemini history MUST start with role 'user'. Filter out any leading assistant greetings.
  const firstUserIndex = messages.findIndex((m) => m.role === "user");
  const conversation =
    firstUserIndex >= 0 ? messages.slice(firstUserIndex) : messages;

  const lastMessage = conversation[conversation.length - 1];

  // Convert previous history into Gemini format (alternating user / model)
  const history = conversation.slice(0, -1).map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const chat = model.startChat({ history });

  let result = await chat.sendMessage(lastMessage.content);
  let response = result.response;

  // Function calling loop (up to 5 iterations)
  let loopCount = 0;
  while (
    loopCount < 5 &&
    response.candidates?.[0]?.content?.parts?.some((p) => p.functionCall)
  ) {
    // gemini-3.5-flash-lite in the current SDK throws 400 on functionResponse because
    // it requires thought_signature not yet supported in @google/generative-ai SDK.
    // If 3.5 requests a tool, immediately switch to 3.1 to avoid a 400 round-trip delay.
    if (modelName === PRIMARY_MODEL) {
      throw new Error(
        `Model ${modelName} triggered tool calls; delegating to tool-optimized model ${FALLBACK_MODEL}`
      );
    }

    loopCount++;
    const functionCallParts = response.candidates[0].content.parts.filter(
      (p) => p.functionCall
    );

    const functionResponses = [];
    for (const part of functionCallParts) {
      const toolResult = await executeFunctionCall(part.functionCall);
      functionResponses.push({
        functionResponse: {
          name: part.functionCall.name,
          response: toolResult,
        },
      });
    }

    result = await chat.sendMessage(functionResponses);
    response = result.response;
  }

  const text =
    response.candidates?.[0]?.content?.parts
      ?.map((p) => p.text)
      ?.filter(Boolean)
      ?.join("\n") ||
    "I'm here to help with your stay. What would you like to know?";

  return { text, model: modelName };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const messages = body?.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Valid message history array is required." },
        { status: 400 }
      );
    }

    const modelsToTry = [PRIMARY_MODEL, FALLBACK_MODEL];
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const { text, model } = await runChatWithModel(modelName, messages);
        return Response.json({ message: text, modelUsed: model });
      } catch (err) {
        console.warn(
          `[Chat API] Model ${modelName} encountered error, trying fallback if available:`,
          err.message
        );
        lastError = err;
      }
    }

    throw lastError || new Error("Failed to process conversation");
  } catch (error) {
    console.error("Chat API Fatal Error:", error);
    return Response.json(
      {
        error:
          "Our concierge is momentarily unavailable. Please explore our cabins or try again shortly.",
      },
      { status: 500 }
    );
  }
}
