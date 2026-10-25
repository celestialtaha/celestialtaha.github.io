let motionPaused = false;
function initPortfolio() {
  const canvas = document.querySelector<HTMLCanvasElement>(
    "#intelligence-scene",
  );
  if (!canvas || canvas.dataset.ready) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.dataset.ready = "true";
  const context = ctx;
  const motionButton =
    document.querySelector<HTMLButtonElement>(".motion-toggle");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const chapters = [
    ...document.querySelectorAll<HTMLElement>("[data-chapter]"),
  ];
  const scenes = [...document.querySelectorAll<HTMLElement>("[data-scene]")];
  const buttons = [
    ...document.querySelectorAll<HTMLButtonElement>("[data-chapter-button]"),
  ];
  document.documentElement.classList.add("scene-ready");
  let width = 0,
    height = 0,
    frame = 0,
    rotation = 0,
    visible = false,
    pointerX = 0,
    pointerY = 0,
    active = -1,
    previousTime = 0;
  const points = Array.from({ length: 850 }, (_, i) => {
    const y = 1 - (2 * i) / 849;
    const r = Math.sqrt(1 - y * y);
    const a = i * Math.PI * (3 - Math.sqrt(5));
    return { x: Math.cos(a) * r, y, z: Math.sin(a) * r };
  });
  function draw() {
    context.clearRect(0, 0, width, height);
    const radius = Math.min(width * 0.31, height * 0.35);
    const angle = rotation + pointerX * 0.3;
    const tilt = -0.3 + pointerY * 0.2;
    const projected = points
      .map((p) => {
        const x = p.x * Math.cos(angle) - p.z * Math.sin(angle);
        const z = p.x * Math.sin(angle) + p.z * Math.cos(angle);
        const y = p.y * Math.cos(tilt) - z * Math.sin(tilt);
        const depth = p.y * Math.sin(tilt) + z * Math.cos(tilt);
        const perspective = 3.7 / (3.7 - depth);
        return {
          x: width * 0.5 + x * radius * perspective,
          y: height * 0.46 + y * radius * perspective,
          z: depth,
          size: perspective,
        };
      })
      .sort((a, b) => a.z - b.z);
    context.strokeStyle = "#81906d40";
    context.lineWidth = 0.7;
    context.beginPath();
    context.ellipse(
      width * 0.5,
      height * 0.55,
      radius * 1.42,
      radius * 0.38,
      -0.18,
      0,
      Math.PI * 2,
    );
    context.stroke();
    context.beginPath();
    context.moveTo(width * 0.1, height * 0.52);
    context.lineTo(width * 0.91, height * 0.52);
    context.moveTo(width * 0.5, height * 0.04);
    context.lineTo(width * 0.5, height * 0.88);
    context.stroke();
    for (const p of projected) {
      context.beginPath();
      context.fillStyle =
        p.z > 0.55
          ? `rgba(190,75,36,${0.5 + p.z * 0.4})`
          : `rgba(63,82,47,${0.14 + (p.z + 1) * 0.3})`;
      context.arc(p.x, p.y, p.size * (p.z > 0.6 ? 1.8 : 1), 0, Math.PI * 2);
      context.fill();
    }
  }
  function resize() {
    const rect = canvas!.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(devicePixelRatio, 2);
    canvas!.width = width * dpr;
    canvas!.height = height * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
    scroll();
  }
  function tick(now: number) {
    frame = 0;
    if (!visible || document.hidden || motion.matches || motionPaused) return;
    const elapsed = previousTime
      ? Math.min((now - previousTime) / 1000, 0.05)
      : 1 / 60;
    rotation += elapsed * 0.108;
    previousTime = now;
    draw();
    frame = requestAnimationFrame(tick);
  }
  function syncAnimation() {
    const stopped = motion.matches || motionPaused;
    document.documentElement.classList.toggle("motion-paused", stopped);
    if (motionButton) {
      motionButton.hidden = false;
      motionButton.disabled = motion.matches;
      motionButton.textContent = motion.matches
        ? "Reduced motion"
        : motionPaused
          ? "Resume motion"
          : "Pause motion";
      motionButton.setAttribute("aria-pressed", String(stopped));
    }
    scroll();
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    if (visible && !document.hidden && !motion.matches && !motionPaused)
      frame = requestAnimationFrame(tick);
    else draw();
  }
  function pointer(event: PointerEvent) {
    if (motion.matches || motionPaused) return;
    const rect = canvas!.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
  }
  function resetPointer() {
    pointerX = 0;
    pointerY = 0;
  }
  function selectChapter(index: number) {
    if (index === active) return;
    active = index;
    scenes.forEach((scene, i) => {
      scene.classList.toggle("is-active", i === index);
    });
    buttons.forEach((button, i) =>
      button.setAttribute("aria-pressed", String(i === index)),
    );
  }
  function scroll() {
    let closest = Infinity;
    let index = 0;
    chapters.forEach((chapter, i) => {
      const rect = chapter.getBoundingClientRect();
      const offset =
        (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight;
      const progress =
        motion.matches || motionPaused ? 0 : Math.max(-1, Math.min(1, offset));
      const visual = chapter.querySelector<HTMLElement>(
        ".chapter-mobile-visual",
      );
      [scenes[i], visual].forEach((element) => {
        element?.style.setProperty("--scene-turn", `${progress * 8}deg`);
        element?.style.setProperty("--scene-rise", `${progress * 15}px`);
      });
      const distance = Math.abs(rect.top + rect.height / 2 - innerHeight / 2);
      if (distance < closest) {
        closest = distance;
        index = i;
      }
    });
    selectChapter(index);
  }
  const toggleMotion = () => {
    motionPaused = !motionPaused;
    syncAnimation();
  };
  motionButton?.addEventListener("click", toggleMotion);
  const clickHandlers = buttons.map((button, index) => {
    const listener = () => {
      selectChapter(index);
      chapters[index].scrollIntoView({
        behavior: motion.matches || motionPaused ? "instant" : "smooth",
        block: "center",
      });
    };
    button.addEventListener("click", listener);
    return listener;
  });
  const observer = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    syncAnimation();
  });
  observer.observe(canvas);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  window.addEventListener("scroll", scroll, { passive: true });
  canvas.addEventListener("pointermove", pointer, { passive: true });
  canvas.addEventListener("pointerleave", resetPointer);
  document.addEventListener("visibilitychange", syncAnimation);
  motion.addEventListener("change", syncAnimation);
  resize();
  syncAnimation();
  document.addEventListener(
    "astro:before-swap",
    () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scroll);
      canvas.removeEventListener("pointermove", pointer);
      canvas.removeEventListener("pointerleave", resetPointer);
      document.removeEventListener("visibilitychange", syncAnimation);
      motion.removeEventListener("change", syncAnimation);
      buttons.forEach((b, i) =>
        b.removeEventListener("click", clickHandlers[i]),
      );
      document.documentElement.classList.remove("scene-ready", "motion-paused");
      motionButton?.removeEventListener("click", toggleMotion);
    },
    { once: true },
  );
}
initPortfolio();
document.addEventListener("astro:page-load", initPortfolio);
