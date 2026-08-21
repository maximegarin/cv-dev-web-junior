/**
 * SMOOTH-ANCHORS.JS
 * Scroll fluide vers les ancres + update de l'URL sans saut brutal.
 * CSS `scroll-behavior: smooth` suffit en théorie, mais ce module
 * permet d'ajouter un offset pour le nav sticky en mobile.
 */

export function initSmoothAnchors() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    if (!anchors.length) return;

    // Sur mobile, la nav est sticky en haut. On lit dynamiquement sa hauteur
    // pour que les sections ciblées ne soient pas masquées sous la nav.
    const sideNav = document.querySelector('.side-nav');

    function getScrollOffset() {
        const isMobile = window.innerWidth <= 960;
        if (!isMobile || !sideNav) return 0;
        // Hauteur réelle de la nav + petit espace de respiration
        return sideNav.getBoundingClientRect().height + 16;
    }

    anchors.forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const offset = getScrollOffset();
            const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });

            // Update URL sans déclencher de scroll automatique
            history.pushState(null, '', targetId);
        });
    });
}
