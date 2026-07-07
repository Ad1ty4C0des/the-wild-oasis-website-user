function DemandBadge({ demandLevel = "low" }) {
  const config = {
    low: {
      label: "Low Season",
      emoji: "🟢",
      color: "text-emerald-400",
      border: "border-emerald-500/20 bg-emerald-500/10",
      tip: "Best rates available",
    },
    moderate: {
      label: "Moderate Demand",
      emoji: "🟡",
      color: "text-amber-300",
      border: "border-amber-400/20 bg-amber-400/10",
      tip: "Good availability",
    },
    high: {
      label: "High Demand",
      emoji: "🟠",
      color: "text-orange-400",
      border: "border-orange-500/20 bg-orange-500/10",
      tip: "Booking up quickly",
    },
    peak: {
      label: "Peak Season",
      emoji: "🔴",
      color: "text-rose-400",
      border: "border-rose-500/20 bg-rose-500/10",
      tip: "Limited dates left",
    },
  };

  const { label, emoji, color, border, tip } =
    config[demandLevel] || config.low;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${border} transition-all`}
    >
      <span className="text-xs">{emoji}</span>
      <span className={`font-body text-label-sm font-semibold ${color}`}>
        {label}
      </span>
      <span className="text-xs text-on-surface-variant/80 font-body hidden sm:inline">
        • {tip}
      </span>
    </div>
  );
}

export default DemandBadge;

