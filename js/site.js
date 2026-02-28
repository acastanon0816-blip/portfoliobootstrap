// js/site.js
// Handles dropdown menus + theme settings (dark/light + font size) with localStorage.

(function () {
  const root = document.documentElement;

  // ---------- Theme ----------
  function applyMode(mode) {
    root.setAttribute("data-theme", mode === "dark" ? "dark" : "light");
    localStorage.setItem("themeMode", mode);
  }

  function applyFontSize(size) {
    let px = "16px";
    if (size === "small") px = "14px";
    if (size === "medium") px = "16px";
    if (size === "large") px = "18px";
    root.style.setProperty("--base-font-size", px);
    localStorage.setItem("fontSize", size);
  }

  // Load saved settings
  applyMode(localStorage.getItem("themeMode") || "light");
  applyFontSize(localStorage.getItem("fontSize") || "medium");

  // ---------- Dropdowns ----------
  const dropdownItems = document.querySelectorAll(".has-dropdown");

  function closeAll() {
    dropdownItems.forEach((li) => {
      li.classList.remove("open");
      const btn = li.querySelector(".dropdown-toggle");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  dropdownItems.forEach((li) => {
    const btn = li.querySelector(".dropdown-toggle");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = li.classList.contains("open");
      closeAll();
      if (!isOpen) {
        li.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Close menus if you click outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-dropdown")) closeAll();

    // Theme clicks
    const modeBtn = e.target.closest("[data-theme-mode]");
    const sizeBtn = e.target.closest("[data-font-size]");
    if (modeBtn) applyMode(modeBtn.getAttribute("data-theme-mode"));
    if (sizeBtn) applyFontSize(sizeBtn.getAttribute("data-font-size"));
  });

  // Close menus on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
})();