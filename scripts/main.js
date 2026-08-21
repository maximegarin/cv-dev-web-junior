import { initScrollProgress } from "./modules/scroll-progress.js";
import { initIntersectionReveal } from "./modules/intersection-reveal.js";
import { initSmoothAnchors } from "./modules/smooth-anchors.js";
import { initPrintHandler } from "./modules/print-handler.js";
import { initActiveSection } from "./modules/active-section.js";
import { initCardGlow } from "./modules/card-glow.js";
import { initThemeToggle } from "./modules/theme-toggle.js";
import { initHeroTextReveal } from "./modules/hero-text-reveal.js";
import { initCustomCursor } from "./modules/custom-cursor.js";
import { initBackToTop } from "./modules/back-to-top.js";
import { initNavScrollHint } from "./modules/nav-scroll-hint.js";

function boot() {
  // ordre important
  initThemeToggle();
  initHeroTextReveal();
  // ordre indiférent
  initScrollProgress();
  initIntersectionReveal();
  initSmoothAnchors();
  initPrintHandler();
  initActiveSection();
  initCardGlow();
  initBackToTop();
  initNavScrollHint();
  initCustomCursor();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
