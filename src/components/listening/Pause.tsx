import { hub } from "@/data/listening-hub";

/**
 * 04: The pause. A tall, still screen: the small sentence at the top, the large
 * one at the foot. The empty space between them is the pause.
 */
export function Pause() {
  return (
    <section aria-label={`${hub.pause.first} ${hub.pause.second}`} className="hub-pause shell">
      <p className="hub-pause-first">{hub.pause.first}</p>
      <p className="hub-pause-second">{hub.pause.second}</p>
    </section>
  );
}
