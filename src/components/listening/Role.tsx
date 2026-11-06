import Image from "next/image";
import Link from "next/link";
import { hub } from "@/data/listening-hub";

const { role } = hub;

/**
 * 05: Who you would be talking to. His portrait stands tall against the dusk,
 * in daylight from a window, and the sentence crosses on to him. No credentials
 * are claimed: only what he does in the conversation.
 */
export function Role() {
  return (
    <section aria-labelledby="hub-role" className="hub-role">
      <div className="hub-role-photo">
        <Image src={role.photo.src} alt={role.photo.alt} fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover object-[50%_12%]" />
      </div>
      <div className="shell hub-role-copy">
        <h2 id="hub-role" className="t-scale">
          {role.heading}
        </h2>
        <p className="hub-partner">
          <span className="hub-partner-big">{role.statement}</span>{" "}
          <span className="hub-partner-how">{role.how}</span>
        </p>
        <p className="hub-role-body">{role.body}</p>
        <p className="mt-7 text-[0.9375rem]">
          {role.who}
          <span aria-hidden="true"> · </span>
          <Link href={role.more.href} className="link-quiet">
            {role.more.label} <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
