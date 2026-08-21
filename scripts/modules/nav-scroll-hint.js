/**
 * NAV-SCROLL-HINT.JS
 * Ajoute des indicateurs visuels de scroll horizontal sur la nav-list mobile.
 *
 * Toggle des classes sur .side-nav-list :
 *  - .has-overflow-end   → quand il reste du contenu à droite (fade right)
 *  - .has-overflow-start → quand on a scrollé et qu'il y a du contenu à gauche (fade left)
 *
 * Le CSS consomme ces classes pour adapter le mask-image dynamiquement.
 * Throttle via requestAnimationFrame pour la perf.
 */

export function initNavScrollHint() {
    const list = document.querySelector('.side-nav-list');
    if (!list) return;

    let ticking = false;

    function update() {
        const { scrollLeft, scrollWidth, clientWidth } = list;
        const maxScroll = scrollWidth - clientWidth;

        // Tolérance d'1px pour les arrondis
        const isAtStart = scrollLeft <= 1;
        const isAtEnd = scrollLeft >= maxScroll - 1;
        const hasOverflow = maxScroll > 1;

        list.classList.toggle('has-overflow-start', hasOverflow && !isAtStart);
        list.classList.toggle('has-overflow-end', hasOverflow && !isAtEnd);

        ticking = false;
    }

    function requestUpdate() {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }

    list.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    // État initial
    update();
}
