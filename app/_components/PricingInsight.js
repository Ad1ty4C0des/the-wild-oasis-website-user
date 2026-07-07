import { generateContentWithFallback } from "../_lib/gemini";

async function PricingInsight({ cabin, demandData }) {
  if (!demandData) return null;

  const { currentDemandLevel, bestMonth, peakMonth } = demandData;
  const effectivePrice = cabin.regularPrice - (cabin.discount || 0);

  let tip = "";

  try {
    const prompt = `You are a dynamic pricing advisor for a boutique luxury cabin retreat named "The Wild Oasis". 
Generate a single, natural, encouraging booking insight (under 25 words) for a guest browsing this cabin.

Cabin Details:
- Cabin Name: "${cabin.name}"
- Current Price: $${effectivePrice}/night
- Current Season Demand: ${currentDemandLevel}
- Lowest Demand Upcoming Window: ${bestMonth?.monthName || "Upcoming month"} (${bestMonth?.occupancyRate ?? 10}% occupancy)
- Peak Season Window: ${peakMonth?.monthName || "Peak season"}

Requirements:
- Sound luxurious, helpful, and concise.
- Mention specific months or season advantages if relevant.
- Do NOT use quotation marks around your entire response.
- Example: "March offers serene solitude and prime availability before summer peak begins."`;

    const result = await generateContentWithFallback(prompt);
    tip = result.text.trim().replace(/^["']|["']$/g, "");
  } catch (err) {
    // Graceful offline fallback message
    const month = bestMonth?.monthName || "the upcoming weeks";
    tip = `Tip: Consider booking for ${month} for optimal mountain tranquility and open dates.`;
  }

  return (
    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/30 backdrop-blur-sm">
      <span className="text-base select-none mt-0.5">💡</span>
      <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
        <span className="font-semibold text-ds-primary">Market Insight: </span>
        {tip}
      </p>
    </div>
  );
}

export default PricingInsight;

