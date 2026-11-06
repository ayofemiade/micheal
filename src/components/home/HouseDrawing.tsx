import { HOUSE } from "./scene";

type Pt = readonly [number, number];

const k = HOUSE.w / HOUSE.pxW;
const pts = (list: readonly Pt[]) => list.map(([x, y]) => `${HOUSE.x + x * k},${HOUSE.y + y * k}`).join(" ");
const box = (x0: number, y0: number, x1: number, y1: number): readonly Pt[] => [
  [x0, y0],
  [x1, y0],
  [x1, y1],
  [x0, y1],
  [x0, y0],
];

/**
 * The house in the Places photograph, traced in that photograph's own pixels
 * (HOUSE.pxW wide), so the drawing sits exactly on the real building.
 * Listed in the order a builder would draw it: ground, walls, roof, openings.
 */
const LINES: readonly { p: readonly Pt[]; faint?: boolean }[] = [
  { p: [[118, 530], [324, 536], [438, 546], [876, 572]] }, // the ground
  { p: [[118, 530], [118, 385]] },
  { p: [[438, 546], [438, 272]] },
  { p: [[876, 572], [876, 258]] },
  { p: [[82, 365], [190, 307], [397, 307]] }, // low wing roof
  { p: [[82, 365], [434, 360]] },
  { p: [[397, 271], [644, 179], [917, 256]] }, // the gable
  { p: [[439, 271], [651, 196], [875, 258]] },
  { p: [[397, 271], [408, 298], [438, 300]], faint: true },
  { p: [[917, 256], [880, 292]], faint: true },
  { p: [[438, 451], [876, 451]] },
  { p: box(512, 292, 579, 383) }, // upper windows
  { p: [[514, 337], [577, 337]], faint: true },
  { p: box(717, 287, 788, 381) },
  { p: [[719, 334], [786, 334]], faint: true },
  { p: box(378, 388, 436, 517) }, // the door
  { p: box(389, 396, 424, 453), faint: true },
  { p: box(190, 392, 306, 472) }, // the wing's window, with shutters
  { p: [[248, 392], [248, 472]], faint: true },
  { p: box(158, 388, 186, 476), faint: true },
  { p: box(308, 387, 333, 473), faint: true },
  { p: box(522, 470, 586, 542) }, // lower storey
  { p: box(490, 474, 519, 541), faint: true },
  { p: box(587, 473, 617, 541), faint: true },
  { p: box(722, 470, 792, 540) },
  { p: box(691, 473, 720, 541), faint: true },
  { p: box(793, 472, 824, 541), faint: true },
  { p: box(324, 524, 462, 540), faint: true }, // the step
];

/** Draws itself on the way in to Places. Stays as a blueprint on the open ground at 1:∞. */
export function HouseDrawing() {
  return (
    <g className="pullback-house">
      {LINES.map((l, i) => (
        <polyline key={i} points={pts(l.p)} pathLength={1} className={l.faint ? "faint" : undefined} data-line />
      ))}
    </g>
  );
}
