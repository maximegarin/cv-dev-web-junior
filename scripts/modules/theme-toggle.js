/**
 * THEME-TOGGLE.JS
 * Bascule entre thème light et dark.
 * - Persiste le choix dans localStorage
 * - Respecte la préférence système au premier chargement
 * - Met à jour <html data-theme="..."> consommé par les CSS variables
 */

const STORAGE_KEY = 'mg-cv-theme';

function getInitialTheme() {
    // 1. Si l'utilisateur a déjà choisi explicitement → on respecte
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;

    // 2. Par défaut : dark (parti pris design du CV)
    //    L'utilisateur peut toujours basculer en light via le toggle.
    return 'dark';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

export function initThemeToggle() {
    const btn = document.getElementById('btn-theme');

    // Applique le thème initial dès le boot (pré-rendu)
    const initial = getInitialTheme();
    applyTheme(initial);

    if (!btn) return;

    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
    });

    // Si l'utilisateur change sa préférence système ET n'a pas explicitement choisi
    // dans notre toggle → on suit le système
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}
