/**
 * Scroll handlers must never ask where an element is (getBoundingClientRect,
 * offsetHeight): after the camera writes styles, every such read forces the
 * browser to lay the page out again in the middle of a frame. On a phone that
 * cost up to 0.3 s per scroll event on the homepage (measured).
 *
 * Instead: measure positions here, in page coordinates, and on scroll work from
 * window.scrollY alone, which costs nothing. `measure` runs now, on resize, and
 * whenever the page's size changes (images, fonts, a phone's address bar).
 * Returns the cleanup.
 */
export function watchGeometry(measure: () => void): () => void {
  let raf = 0;
  const schedule = () => {
    if (!raf)
      raf = requestAnimationFrame(() => {
        raf = 0;
        measure();
      });
  };
  measure();
  window.addEventListener("resize", schedule);
  const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
  ro?.observe(document.body);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", schedule);
    ro?.disconnect();
  };
}

/** An element's top in page coordinates. Only for use inside a `measure`. */
export const pageTop = (el: Element) => el.getBoundingClientRect().top + window.scrollY;
