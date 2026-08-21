/**
 * ACTIVE-SECTION.JS
 * Met en surbrillance le lien de nav correspondant à la section
 * actuellement visible dans le viewport.
 *
 * Utilise IntersectionObserver pour détecter quelle section est en vue.
 */

export function initActiveSection() {
    const links = document.querySelectorAll('.side-nav-link');
    const sections = document.querySelectorAll('section[id]');
    if (!links.length || !sections.length) return;

    if (!('IntersectionObserver' in window)) return;

    function setActive(sectionId) {
        links.forEach((link) => {
            const targetId = link.getAttribute('data-section');
            link.classList.toggle('active', targetId === sectionId);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        // On choisit la section la plus visible
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
            setActive(visible[0].target.id);
        }
    }, {
        // La section est considérée active quand son milieu est dans le viewport
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    });

    sections.forEach((section) => observer.observe(section));
}
