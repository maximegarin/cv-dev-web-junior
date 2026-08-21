/**
 * CUSTOM-CURSOR.JS
 * Curseur custom : petit cercle qui suit la souris avec un slight delay (lerp).
 * Passe en mode "loupe modéré" (légèrement plus gros) au-dessus des éléments
 * interactifs.
 *
 * Désactivé automatiquement :
 *  - Sur touch devices (pas de souris)
 *  - Si l'utilisateur a coché prefers-reduced-motion
 *
 * Utilise mix-blend-mode: difference côté CSS pour rester visible
 * sur n'importe quel fond (s'inverse automatiquement).
 */

export function initCustomCursor() {
    // 1. Skip touch / pas de souris
    if (window.matchMedia('(hover: none)').matches) return;
    // 2. Skip si reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Création de l'élément curseur (injecté dans le body)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);

    // Activation du flag sur body (le CSS peut alors masquer le natif si besoin)
    document.body.classList.add('has-custom-cursor');

    // Position cible (vraie position souris) et position actuelle (animée)
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    // Mise à jour de la cible à chaque mouvement
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Lerp animation : le curseur "rattrape" la souris avec un effet lissé
    // Facteur 0.2 = légère trainée (plus bas = plus de trainée, plus haut = direct)
    function animate() {
        currentX += (targetX - currentX) * 0.2;
        currentY += (targetY - currentY) * 0.2;
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        requestAnimationFrame(animate);
    }
    animate();

    // Mode "loupe modéré" au survol des éléments interactifs
    const interactiveSelector = 'a, button, .project-card, [role="button"], [tabindex]:not([tabindex="-1"])';
    document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
    });

    // Masquer le curseur quand on quitte la fenêtre
    document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('is-hidden'));

    // Effet "press" : curseur plus petit pendant un click
    document.addEventListener('mousedown', () => cursor.classList.add('is-pressed'));
    document.addEventListener('mouseup', () => cursor.classList.remove('is-pressed'));
}
