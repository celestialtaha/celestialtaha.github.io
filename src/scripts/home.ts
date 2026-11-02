import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createWorkbench } from "./workbench";
gsap.registerPlugin(ScrollTrigger);

function initPortfolio() {
  const story = document.querySelector<HTMLElement>(".signal-story");
  const canvas = story?.querySelector<HTMLCanvasElement>("#intelligence-scene");
  if (!story || !canvas || canvas.dataset.ready) return;
  const root = document.documentElement;
  const panels = [...story.querySelectorAll<HTMLElement>("[data-story-panel]")];
  const buttons = [
    ...story.querySelectorAll<HTMLButtonElement>("[data-story-button]"),
  ];
  const controls = story.querySelector<HTMLElement>(".story-controls")!;
  const toggle = story.querySelector<HTMLButtonElement>(".motion-toggle")!;
  const caption = story.querySelector<HTMLElement>("[data-scene-label]")!;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const short = matchMedia(
    "(min-width:701px) and (max-height:680px), (max-height:560px)",
  );
  let view: ReturnType<typeof createWorkbench>;
  let phase = 0,
    staticMode = false,
    userStatic = false,
    active = -1,
    disposed = false;
  let trigger: ScrollTrigger | undefined;
  let tween: gsap.core.Tween | undefined;
  const labels = [
    "00 / THE INTELLIGENCE WORKBENCH",
    "01 / AGENTS — PLAN · ACT · CHECK",
    "02 / ORCHESTRATION — ROUTE · COORDINATE",
    "03 / BACKEND — API · WORKERS · DATA",
    "04 / RESEARCH — OBSERVE · EXPERIMENT",
  ];
  const progress = { value: 0 };
  function present() {
    if (disposed) return;
    phase = staticMode ? 0 : progress.value;
    const index = Math.round(phase);
    if (active !== index) {
      active = index;
      panels.forEach((panel, i) => {
        panel.classList.toggle("is-current", i === index);
        panel.inert = !staticMode && i !== index;
        panel.setAttribute("aria-hidden", String(!staticMode && i !== index));
      });
      buttons.forEach((button, i) =>
        button.setAttribute("aria-pressed", String(index === i)),
      );
      caption.textContent = labels[index];
    }
    panels.forEach((panel, i) => {
      panel.style.transform = staticMode
        ? ""
        : `translateY(${(i - phase) * 12}px)`;
    });
    story!.style.setProperty("--story-progress", String(phase / 4));
    view?.render(phase);
  }
  try {
    view = createWorkbench(canvas);
  } catch {
    return;
  }
  canvas.dataset.ready = "true";
  root.classList.add("scene-ready");
  controls.hidden = false;
  function resize() {
    if (disposed) return;
    const rect = canvas!.getBoundingClientRect();
    if (rect.width && rect.height) view.resize(rect.width, rect.height);
  }
  function setup() {
    trigger?.kill();
    tween?.kill();
    staticMode = userStatic || motion.matches || short.matches;
    root.classList.toggle("story-static", staticMode);
    active = -1;
    toggle.disabled = motion.matches || short.matches;
    toggle.setAttribute("aria-pressed", String(staticMode));
    toggle.textContent = motion.matches
      ? "Reduced motion"
      : short.matches
        ? "Compact view"
        : staticMode
          ? "Scroll view ↕"
          : "Static view Ⅱ";
    progress.value = 0;
    if (!staticMode) {
      tween = gsap.to(progress, {
        value: 4,
        duration: 1,
        ease: "none",
        paused: true,
        onUpdate: present,
      });
      trigger = ScrollTrigger.create({
        trigger: story,
        start: () =>
          `top ${parseFloat(getComputedStyle(document.body).getPropertyValue("--story-header")) || 0}px`,
        end: () =>
          `+=${story!.offsetHeight - (innerHeight - (parseFloat(getComputedStyle(document.body).getPropertyValue("--story-header")) || 0))}`,
        animation: tween,
        scrub: 0.65,
        onRefresh: resize,
      });
    }
    resize();
    present();
  }
  function goTo(index: number, behavior: ScrollBehavior = "smooth") {
    if (!trigger) return;
    window.scrollTo({
      top: trigger.start + ((trigger.end - trigger.start) * index) / 4,
      behavior,
    });
  }
  const listeners = buttons.map((button, i) => {
    const handler = () => goTo(i);
    button.addEventListener("click", handler);
    return handler;
  });
  const entryLink = story.querySelector<HTMLAnchorElement>(
    'a[href="#practice-agents"]',
  )!;
  const follow = (event: MouseEvent) => {
    if (staticMode) return;
    event.preventDefault();
    history.pushState(null, "", "#practice-agents");
    goTo(1);
  };
  const followHash = () => {
    const index = panels.findIndex((p) => `#${p.id}` === location.hash);
    if (index >= 0 && !staticMode) goTo(index, "instant");
  };
  entryLink.addEventListener("click", follow);
  window.addEventListener("hashchange", followHash);
  const toggleView = () => {
    userStatic = !userStatic;
    setup();
    story!.scrollIntoView({ behavior: "instant", block: "start" });
  };
  toggle.addEventListener("click", toggleView);
  motion.addEventListener("change", setup);
  short.addEventListener("change", setup);
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  // Render once fonts are ready so labels use the same typography as the page.
  void document.fonts.ready.then(() => {
    if (!disposed) {
      resize();
      present();
    }
  });
  const contextLost = (event: Event) => {
    event.preventDefault();
    if (disposed) return;
    disposed = true;
    observer.disconnect();
    root.classList.remove("scene-ready", "story-static");
    controls.hidden = true;
    panels.forEach((p) => {
      p.inert = false;
      p.removeAttribute("aria-hidden");
      p.style.removeProperty("transform");
    });
    trigger?.kill();
    tween?.kill();
  };
  canvas.addEventListener("webglcontextlost", contextLost);
  setup();
  followHash();
  document.addEventListener(
    "astro:before-swap",
    () => {
      disposed = true;
      entryLink.removeEventListener("click", follow);
      window.removeEventListener("hashchange", followHash);
      trigger?.kill();
      tween?.kill();
      observer.disconnect();
      toggle.removeEventListener("click", toggleView);
      motion.removeEventListener("change", setup);
      short.removeEventListener("change", setup);
      canvas.removeEventListener("webglcontextlost", contextLost);
      buttons.forEach((b, i) => b.removeEventListener("click", listeners[i]));
      view.dispose();
      root.classList.remove("scene-ready", "story-static");
    },
    { once: true },
  );
}
initPortfolio();
document.addEventListener("astro:page-load", initPortfolio);
