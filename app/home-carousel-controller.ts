/** Shared by the React page and the static Hostland export. */
export function initHomeCarousel(root: HTMLElement) {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-slide]"));
  const selectors = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-slide-select]"));
  const pause = root.querySelector<HTMLButtonElement>("[data-slide-pause]")!;
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0, paused = media.matches, hovered = false, focused = false, visible = true;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const controller = new AbortController();
  const options = { signal: controller.signal };
  function schedule() {
    clearTimeout(timer);
    const running = !paused && !hovered && !focused && visible && !document.hidden;
    root.dataset.running = String(running);
    if (running) timer = setTimeout(() => show(index + 1), 6000);
  }
  function show(next: number) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
      slide.setAttribute("aria-hidden", String(i !== index));
      slide.inert = i !== index;
    });
    selectors.forEach((button, i) => button.setAttribute("aria-pressed", String(i === index)));
    schedule();
  }
  function updatePause() {
    pause.setAttribute("aria-pressed", String(paused));
    pause.setAttribute("aria-label", paused ? "Включить смену слайдов" : "Остановить смену слайдов");
    schedule();
  }
  selectors.forEach((button,i) => button.addEventListener("click", () => show(i), options));
  root.querySelector("[data-slide-prev]")!.addEventListener("click", () => show(index - 1), options);
  root.querySelector("[data-slide-next]")!.addEventListener("click", () => show(index + 1), options);
  pause.addEventListener("click", () => { paused = !paused; updatePause(); }, options);
  root.addEventListener("pointerenter", event => { if(event.pointerType === "mouse") { hovered = true; schedule(); } }, options);
  root.addEventListener("pointerleave", () => { hovered = false; schedule(); }, options);
  root.addEventListener("focusin", () => { focused = true; schedule(); }, options);
  root.addEventListener("focusout", event => { focused = root.contains(event.relatedTarget as Node | null); schedule(); }, options);
  document.addEventListener("visibilitychange", schedule, options);
  media.addEventListener("change", () => { paused = media.matches; updatePause(); }, options);
  root.addEventListener("keydown", event => {
    if(event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); show(index + (event.key === "ArrowRight" ? 1 : -1)); }
  }, options);
  let touchX = 0, touchY = 0;
  root.addEventListener("touchstart", event => { touchX = event.touches[0].clientX; touchY = event.touches[0].clientY; }, { ...options, passive: true });
  root.addEventListener("touchend", event => {
    const dx = event.changedTouches[0].clientX - touchX, dy = event.changedTouches[0].clientY - touchY;
    if(Math.abs(dx)>65 && Math.abs(dx)>Math.abs(dy)*1.5) show(index + (dx<0 ? 1 : -1));
  }, { ...options, passive: true });
  const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, {threshold:0.15});
  observer.observe(root);
  updatePause();
  return () => { clearTimeout(timer); observer.disconnect(); controller.abort(); delete root.dataset.initialized; };
}
