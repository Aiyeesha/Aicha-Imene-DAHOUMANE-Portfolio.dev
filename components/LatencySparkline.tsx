// components/LatencySparkline.tsx
// --------------------------------
// Sparkline SVG de la latence sur 7 jours — composant serveur pur.
// Aucune dépendance externe : SVG natif uniquement.
//
// Couleur adaptative :
//   vert   (emerald-400) → latence max ≤ 200 ms  (bonne)
//   ambre  (amber-400)   → latence max ≤ 500 ms  (acceptable)
//   rouge  (rose-400)    → latence max  > 500 ms  (dégradée)

type Props = {
  /** Tableau de latences moyennes par heure (ordre chronologique). */
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
  // Pas assez de points pour tracer une courbe
  if (data.length < 2) return null;

  const min   = Math.min(...data);
  const max   = Math.max(...data);
  const range = max - min || 1;   // éviter la division par zéro
  const pad   = 2;                // marge interne en px

  // Coordonnées SVG de chaque point
  const points = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (width  - pad * 2);
      const y = height - pad - ((v - min) / range) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  // Couleur selon la latence maximale observée
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
