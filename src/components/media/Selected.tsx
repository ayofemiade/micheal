import Link from "next/link";
import { media, mediaEnquiryHref } from "@/data/media";
import { Photo } from "./Photo";

const { selected, discuss } = media;

/** Selected work: each project has its own ground and hang. Nothing is a matching tile. */
export function Selected() {
  return (
    <section aria-labelledby="selected-title">
      <div className="shell selected-head">
        <h2 id="selected-title" className="t-word">
          {selected.heading}
        </h2>
      </div>
      {selected.projects.map((project) => {
        const facts = [project.kind, project.year, project.role, project.relationship].filter(Boolean).join(" · ");
        return (
          <article key={project.id} aria-labelledby={`work-${project.id}`} className={`work work-${project.id}`}>
            <header className="shell work-head">
              <h3 id={`work-${project.id}`} className="media-heading">
                {project.name}
              </h3>
              <p className="t-scale">{facts}</p>
            </header>
            <div className="shell work-hang">
              {project.shots.map((shot, i) => (
                <Photo key={shot.src} shot={shot} sizes="(max-width: 1023px) 100vw, 60vw" className={`w-${i}`} />
              ))}
            </div>
          </article>
        );
      })}

      <div className="discuss">
        <div className="shell discuss-inner">
          <h2 className="t-word">{discuss.heading}</h2>
          <div>
            <p className="discuss-body">{discuss.body}</p>
            <Link href={mediaEnquiryHref} className="cta cta-plain cover-cta mt-8">
              {discuss.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
