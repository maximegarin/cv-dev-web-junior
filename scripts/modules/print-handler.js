/**
 * PRINT-HANDLER.JS
 * Branche le bouton "Télécharger PDF" sur window.print().
 * Le CSS @media print fait le reste : il restyle la page en sobre A4.
 * L'utilisateur n'a qu'à choisir "Enregistrer en PDF" dans le dialogue
 * d'impression du navigateur.
 */

export function initPrintHandler() {
    const btn = document.getElementById('btn-print');
    if (!btn) return;

    btn.addEventListener('click', () => {
        window.print();
    });

    // Ctrl+P / Cmd+P : on laisse le comportement natif,
    // qui utilise aussi notre print.css.
}
