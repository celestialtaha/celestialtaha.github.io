function initSearch() {
  const backdrop = document.getElementById("backdrop");
  const dialog = document.getElementById("pagefind-container");
  const triggers = [
    ...document.querySelectorAll<HTMLElement>(
      "#portfolio-search,[data-open-search]",
    ),
  ];
  if (!backdrop || !dialog || !triggers.length || backdrop.dataset.ready)
    return;
  backdrop.dataset.ready = "true";
  const panel = backdrop,
    content = dialog;
  let previous: HTMLElement | null = null;
  let background: Array<{ element: HTMLElement; inert: boolean }> = [];
  function focusInput() {
    const input = content.querySelector<HTMLInputElement>("input");
    input?.setAttribute("aria-label", "Search projects, research, and writing");
    input?.setAttribute("dir", "auto");
    (input || content).focus({ preventScroll: true });
  }
  function close(restoreFocus = true) {
    if (panel.hidden) return;
    panel.hidden = true;
    document.documentElement.classList.remove("search-open");
    background.forEach(({ element, inert }) => (element.inert = inert));
    background = [];
    if (restoreFocus && previous?.isConnected)
      previous.focus({ preventScroll: true });
  }
  function open() {
    if (!panel.hidden) {
      focusInput();
      return;
    }
    previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    panel.hidden = false;
    background = [
      ...document.querySelectorAll<HTMLElement>(
        ".site-header, main, .site-footer, .skip-link",
      ),
    ].map((element) => ({ element, inert: element.inert }));
    background.forEach(({ element }) => (element.inert = true));
    document.documentElement.classList.add("search-open");
    focusInput();
  }
  function key(event: KeyboardEvent) {
    const typing =
      event.target instanceof HTMLElement &&
      (event.target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName));
    if (
      (!typing && event.key === "/" && !event.altKey) ||
      ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")
    ) {
      event.preventDefault();
      open();
    }
    if (panel.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const items = [
      ...content.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),[tabindex="0"]',
      ),
    ].filter((el) => el.getClientRects().length && el.tabIndex !== -1);
    const first = items[0],
      last = items[items.length - 1];
    if (!first) {
      event.preventDefault();
      content.focus();
      return;
    }
    if (
      event.shiftKey &&
      (document.activeElement === first ||
        !content.contains(document.activeElement))
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      (document.activeElement === last ||
        !content.contains(document.activeElement))
    ) {
      event.preventDefault();
      first.focus();
    }
  }
  function outside(event: MouseEvent) {
    if (event.target === panel) close();
  }
  function resultClick(event: MouseEvent) {
    if (event.target instanceof Element && event.target.closest("a[href]"))
      close(false);
  }
  const dismiss = () => close();
  triggers.forEach((trigger) => trigger.addEventListener("click", open));
  const closeButton = content.querySelector("[data-close-search]");
  closeButton?.addEventListener("click", dismiss);
  panel.addEventListener("click", outside);
  content.addEventListener("click", resultClick);
  document.addEventListener("keydown", key);
  document.addEventListener(
    "astro:before-swap",
    () => {
      close(false);
      document.removeEventListener("keydown", key);
      triggers.forEach((trigger) => trigger.removeEventListener("click", open));
      closeButton?.removeEventListener("click", dismiss);
      panel.removeEventListener("click", outside);
      content.removeEventListener("click", resultClick);
    },
    { once: true },
  );
}
initSearch();
document.addEventListener("astro:page-load", initSearch);
