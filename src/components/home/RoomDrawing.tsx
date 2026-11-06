/** The ground line and survey grid, seen only from far away. */
export function GroundGrid() {
  const lines: React.ReactElement[] = [];
  // Just past the widest frame the camera ever shows (1:∞ on an ultrawide spans
  // about x −11 900…6 700; a tall phone reaches y ≈ 24 000). Anything larger is
  // only an oversized layer for the phone to hold in memory.
  for (let x = -16200; x <= 16100; x += 1700)
    lines.push(<line key={`v${x}`} x1={x} y1="1000" x2={x} y2="30000" />);
  for (let y = 1600; y <= 30000; y += y < 4000 ? 600 : 1700)
    lines.push(<line key={`h${y}`} x1="-16200" y1={y} x2="16100" y2={y} />);
  return (
    <g data-ground>
      <line x1="-40000" y1="1000" x2="40000" y2="1000" />
      <g className="faint">{lines}</g>
    </g>
  );
}
