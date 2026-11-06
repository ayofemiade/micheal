"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { about } from "@/data/about";
import { LineReveal } from "@/components/motion/LineReveal";
import { useStageProgress } from "./useStageProgress";

const { camera } = about;

/**
 * Holds a camera. Two beats: first the photograph and the words alone, then his
 * paragraphs passing beside a photograph that holds perfectly still, always
 * framed whole however short the screen. Its only movement is a slow pull-back.
 * On phones the photograph sits above the words and nothing is pinned.
 */
export function Camera() {
  const track = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);

  const render = useCallback((p: number, reduced: boolean) => {
    if (lens.current && !reduced) lens.current.style.transform = `scale(${(1.07 - 0.07 * p).toFixed(4)})`;
  }, []);

  useStageProgress(track, stage, render);

  return (
    <article ref={track} aria-labelledby="holds-camera" className="camera">
      <div ref={stage} className="camera-photo">
        <div ref={lens} className="camera-lens">
          <Image src={camera.photo.src} alt={camera.photo.alt} fill sizes="(max-width: 1023px) 100vw, 62vw" className="camera-img" />
        </div>
      </div>
      <div className="camera-copy">
        <div className="camera-opening">
          <LineReveal as="h3" id="holds-camera" className="holds-word">
            {camera.word}
          </LineReveal>
        </div>
        <div className="camera-read">
          <h4 className="holds-sub">{camera.heading}</h4>
          <p className="camera-para">{camera.work}</p>
          <p className="camera-lead">{camera.lead}</p>
          <p className="camera-para">{camera.homes}</p>
          <Link href={camera.link.href} className="link-quiet mt-8 inline-block text-[0.9375rem]">
            {camera.link.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
