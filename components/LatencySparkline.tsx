// components/LatencySparkline.tsx
// --------------------------------
// 7-day latency sparkline: server component, plain SVG.
// Colour by peak latency: green ≤ 200ms, amber ≤ 500ms, red above.

type Props = {
  /** Average latency per hour, oldest first. */
  data: number[];
  width?: number;
  height?: number;
  className?: string;
};

export default function LatencySparkline({
  data,
  width   = 80,
  height  = 24,
  className = "",
}: Props) {
  // Not enough points to draw a line
  if (data.length < 2) return null;

  const min   = Math.min(...data);
  const max   = Math.max(...data);
  const range = max - min || 1;   // avoid division by zero
  const pad   = 2;                // inner margin in px

  // SVG coordinates of each point
  const points = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (width  - pad * 2);
      const y = height - pad - ((v - min) / range) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  // Colour from the peak latency
  const stroke =
    max > 500 ? "#fb7185"   // rose-400
  : max > 200 ? "#fbbf24"   // amber-400
  :             "#34d399";  // emerald-400

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
