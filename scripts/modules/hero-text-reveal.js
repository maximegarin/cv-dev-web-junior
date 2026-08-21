/**
 * HERO-TEXT-REVEAL.JS
 * Split le titre principal "Maxime Garin" caractère par caractère,
 * chaque char wrappé dans un <span> avec son index en CSS var.
 *
 * L'animation se déclenche via .is-visible (ajoutée par intersection-reveal.js)
 * et le delay par caractère est géré en CSS via calc(var(--char-i) * Xms).
 *
 * Préserve l'accessibilité : on conserve un aria-label avec le texte original
 * et on marque chaque char en aria-hidden pour que le lecteur d'écran
 * lise une seule fois "Maxime Garin" (pas char par char).
 */

export function initHeroTextReveal() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    // Respect reduced motion : on skip le split, l'h1 garde son comportement reveal
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const text = title.textContent.trim();
    if (!text) return;

    // Préserve la lecture accessible
    title.setAttribute('aria-label', text);

    // Vide et reconstruit avec un span par caractère
    title.textContent = '';

    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'hero-char';
        span.style.setProperty('--char-i', i);
        span.setAttribute('aria-hidden', 'true');
        // NBSP pour les espaces (évite leur collapse en inline-block)
        span.textContent = char === ' ' ? ' ' : char;
        title.appendChild(span);
    });
}
