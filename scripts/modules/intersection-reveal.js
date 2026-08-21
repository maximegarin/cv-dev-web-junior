/**
 * INTERSECTION-REVEAL.JS
 * Ajoute la classe .is-visible aux éléments .reveal quand ils entrent
 * dans le viewport. Animations CSS prennent ensuite le relais.
 *
 * Utilise IntersectionObserver pour la perf (vs scroll listener).
 */

export function initIntersectionReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    // Fallback : si IntersectionObserver pas dispo, on affiche tout direct
    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // One-shot : on désinscrit pour éviter de re-trigger
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Déclenche un peu avant que l'élément soit complètement visible
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    });

    elements.forEach((el) => observer.observe(el));
}
