/**
 * CARD-GLOW.JS
 * Effet "spot light" qui suit la souris sur les cartes projets.
 * Inspiré cosmos.so : très subtil, juste un soupçon de vie.
 *
 * Met à jour des CSS variables --mouse-x / --mouse-y consommées
 * par le pseudo-element ::after des .project-card (cf animations.css).
 */

export function initCardGlow() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;

    // Désactive sur mobile / touch — pas de souris à tracker
    if (window.matchMedia('(hover: none)').matches) return;

    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}
