import Image from "next/image";
import type { Shot } from "@/data/media";

/**
 * A photograph at its own proportions, never forced into a box. The caption, if
 * any, describes the picture and nothing else.
 */
export function Photo({ shot, sizes, caption, className }: { shot: Shot; sizes: string; caption?: string; className?: string }) {
  return (
    <figure className={className ? `media-photo ${className}` : "media-photo"}>
      <div className="media-photo-frame">
        <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={sizes} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
