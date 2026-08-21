/**
 * BACK-TO-TOP.JS
 * Bouton sticky bottom-right qui apparaît après un seuil de scroll
 * et ramène smoothly en haut de page au clic.
 *
 * - Apparition contrôlée par .is-visible (transition CSS)
 * - rAF throttle sur le scroll listener (perf)
 * - scrollTo avec behavior 'smooth' (respecté en CSS via scroll-behavior)
 */

const SHOW_THRESHOLD = 400; // px scrollés avant d'apparaître

export function initBackToTop() {
    const btn = document.getElementById('btn-back-top');
    if (!btn) return;

    let ticking = false;

    function update() {
        const isShown = window.scrollY > SHOW_THRESHOLD;
        btn.classList.toggle('is-visible', isShown);
        ticking = false;
    }

    window.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        },
        { passive: true }
    );

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // État initial
    update();
}
