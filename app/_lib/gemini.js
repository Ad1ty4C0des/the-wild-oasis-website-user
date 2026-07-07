import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
export const genAI = new GoogleGenerativeAI(apiKey);

export const PRIMARY_MODEL = "gemini-3.5-flash-lite";
export const FALLBACK_MODEL = "gemini-3.1-flash-lite";

/**
 * Generate content using primary model (gemini-3.5-flash-lite)
 * with automatic fallback to (gemini-3.1-flash-lite)
 */
export async function generateContentWithFallback(promptOrConfig) {
  const models = [PRIMARY_MODEL, FALLBACK_MODEL];
  let lastError = null;

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(promptOrConfig);
      return {
        text: result.response.text(),
        model: modelName,
      };
    } catch (err) {
      console.warn(`[Gemini] ${modelName} failed, attempting next model if available. Reason:`, err.message);
      lastError = err;
    }
  }

  throw lastError;
}

export default genAI;

