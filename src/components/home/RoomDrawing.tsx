/**
 * An elevation drawing of a room arranged for a conversation: two chairs
 * facing, a lamp, a window, a doorway. Illustrative only. No dimensions or
 * figures, and it depicts no real property.
 *
 * World units match the pull-back scene (floor at y = 1000).
 */
export function RoomDrawing({ ground = false }: { ground?: boolean }) {
  return (
    <>
      {ground && <line x1="-40000" y1="1000" x2="40000" y2="1000" />}
      {!ground && <line x1="-1500" y1="1000" x2="2100" y2="1000" />}
      {/* the wall */}
      <polyline points="-1400,1000 -1400,-800 2000,-800 2000,1000" />
      <line x1="-1400" y1="930" x2="2000" y2="930" className="faint" />
      {/* dimension line, deliberately without figures */}
      <line x1="-1400" y1="-930" x2="2000" y2="-930" className="faint" />
      <line x1="-1400" y1="-960" x2="-1400" y2="-900" className="faint" />
      <line x1="2000" y1="-960" x2="2000" y2="-900" className="faint" />
      {/* window */}
      <rect x="-1150" y="-450" width="500" height="800" />
      <line x1="-900" y1="-450" x2="-900" y2="350" className="faint" />
      <line x1="-1150" y1="-50" x2="-650" y2="-50" className="faint" />
      {/* doorway */}
      <polyline points="1520,1000 1520,40 1860,40 1860,1000" />
      <polyline points="1550,1000 1550,70 1830,70 1830,1000" className="faint" />
      {/* two chairs, facing */}
      <polyline points="690,560 700,820 900,820" />
      <line x1="708" y1="820" x2="708" y2="1000" />
      <line x1="892" y1="820" x2="892" y2="1000" />
      <polyline points="1310,560 1300,820 1100,820" />
      <line x1="1292" y1="820" x2="1292" y2="1000" />
      <line x1="1108" y1="820" x2="1108" y2="1000" />
      {/* lamp */}
      <line x1="1000" y1="1000" x2="1000" y2="700" />
      <polygon points="958,700 1042,700 1026,640 974,640" />
    </>
  );
}

/** Survey grid on the open ground, seen only from far away. */
export function GroundGrid() {
  const lines: React.ReactElement[] = [];
  // Just past the widest frame the camera ever shows (1:∞ on an ultrawide spans
  // about x −11 900…6 700; a tall phone reaches y ≈ 24 000). Anything larger is
  // only an oversized layer for the phone to hold in memory.
  for (let x = -16200; x <= 16100; x += 1700)
    lines.push(<line key={`v${x}`} x1={x} y1="1000" x2={x} y2="30000" />);
  for (let y = 1600; y <= 30000; y += y < 4000 ? 600 : 1700)
    lines.push(<line key={`h${y}`} x1="-16200" y1={y} x2="16100" y2={y} />);
  return <g className="faint">{lines}</g>;
}
