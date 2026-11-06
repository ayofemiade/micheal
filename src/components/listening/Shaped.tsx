import { hub } from "@/data/listening-hub";

const { shaped } = hub;

/**
 * 03: Five choices, each with a full line of its own. They are choices, not
 * steps, so they are never numbered.
 */
export function Shaped() {
  return (
    <section aria-labelledby="hub-shaped" className="hub-shaped shell">
      <div className="hub-shaped-head">
        <h2 id="hub-shaped" className="hub-shaped-title">
          {shaped.heading}
        </h2>
        <p className="hub-shaped-intro">{shaped.intro}</p>
      </div>
      <ul className="hub-options">
        {shaped.options.map((option) => (
          <li key={option}>{option}</li>
        ))}
      </ul>
    </section>
  );
}
