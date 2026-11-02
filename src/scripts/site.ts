function initSite() {
  document.documentElement.classList.remove("dark");
  document.querySelectorAll<HTMLElement>("pre").forEach((pre) => {
    if (pre.querySelector(".copy-code")) return;
    const code = pre.querySelector("code");
    if (!code) return;
    pre.style.position = "relative";
    pre.tabIndex = 0;
    const status = document.createElement("span");
    status.className = "sr-only";
    status.setAttribute("role", "status");
    pre.append(status);
    const button = document.createElement("button");
    button.className = "copy-code";
    button.textContent = "Copy";
    const citation = !!pre.closest(".paper-cite");
    button.setAttribute("aria-label", citation ? "Copy citation" : "Copy code");
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.textContent || "");
        button.textContent = "Copied";
        status.textContent = citation
          ? "Citation copied to clipboard."
          : "Code copied to clipboard.";
        setTimeout(() => (button.textContent = "Copy"), 1600);
      } catch {
        button.textContent = "Try again";
        status.textContent =
          "Could not copy. Select the code to copy it manually.";
      }
    });
    pre.append(button);
  });
}
document.addEventListener("astro:page-load", initSite);
initSite();
