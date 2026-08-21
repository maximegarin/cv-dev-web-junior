# CV Interactif — Maxime Garin

Single-page HTML/CSS/JS vanilla. Architecture modulaire, zéro dépendance d'exécution, accessibilité WCAG AA, export PDF via `window.print()`.

Démo : https://maximegarin.github.io/cv-alternance-cda/

---

## Stack

| Couche | Choix                               | Pourquoi                                                       |
| ------ | ----------------------------------- | -------------------------------------------------------------- |
| HTML   | Sémantique HTML5                    | Recruteurs scan-friendly, screen readers OK                    |
| CSS    | Vanilla, variables CSS, BEM-light   | Maintenable sans build step                                    |
| JS     | ES Modules natifs (`type="module"`) | Pas de bundler, code splittable, tree-shakable côté navigateur |
| Fonts  | Self-hosted WOFF2                   | RGPD, perf (1 origin), licence Almarena protégée               |
| Build  | Aucun                               | Déployable tel quel sur tout hébergeur statique                |

---

## Architecture

```
.
├── index.html                              Document principal
├── .htaccess                               Apache : hotlink protection fonts, CORS, cache
├── assets/
│   ├── fonts/                              Almarena (licence) + Inter (5 graisses)
│   └── images/
├── styles/
│   ├── base.css                            Variables, reset, @font-face, dark/light tokens
│   ├── layout.css                          Grid, nav sticky, sections, responsive
│   ├── components.css                      Cards, tags, timeline, buttons, custom cursor
│   ├── animations.css                      Reveal-on-scroll, hero split chars, hover glow
│   └── print.css                           @media print → A4 compact 1-2 pages
└── scripts/
    ├── main.js                             Entry point, orchestre les modules
    └── modules/
        ├── theme-toggle.js                 Dark/light avec persistance localStorage
        ├── hero-text-reveal.js             Split du h1 hero char par char
        ├── intersection-reveal.js          IntersectionObserver → .is-visible
        ├── active-section.js               Highlight nav selon section visible
        ├── smooth-anchors.js               Scroll fluide + offset dynamique nav sticky
        ├── scroll-progress.js              Barre progression top
        ├── back-to-top.js                  Bouton sticky bottom-right
        ├── nav-scroll-hint.js              Fade masks dynamiques sur nav-list mobile
        ├── card-glow.js                    Spotlight cursor-tracking sur cards projets
        ├── custom-cursor.js                Curseur custom desktop (mix-blend-mode)
        └── print-handler.js                Bouton "Télécharger PDF" → window.print()
```

Chaque module exporte une seule fonction `init*`, appelée depuis `main.js`. Zéro état partagé, zéro side effect global. Désactivation propre via `prefers-reduced-motion` et `(hover: none)`.

---

## Décisions techniques notables

### Theming dark/light sans FOUC

Script inline dans `<head>` (avant tout CSS) qui lit `localStorage` et pose `data-theme="dark|light"` sur `<html>`. Évite le flash de couleur incorrecte au boot. Variables CSS basculent ensuite via `[data-theme="dark"] { ... }`.

### Hero reveal split-chars

`hero-text-reveal.js` splitte le texte du h1 en `<span>` indexés (`--char-i`). Animation CSS pure avec `transition-delay: calc(var(--char-i) * 40ms)`. Préserve l'a11y via `aria-label` sur le h1 et `aria-hidden` sur les chars.

### Fonts self-hostées

- **Almarena Display** : converti OTF → WOFF2 (format web-only, non installable). Protection licence renforcée par `.htaccess` (Referer check + CORS).
- **Inter** : 5 graisses téléchargées depuis rsms.me (source officielle Rasmus Andersson, non Google).
- Préchargement des 2 fonts critiques (`<link rel="preload" as="font">`) pour LCP optimal.

### Print sur 1-2 pages A4

`print.css` ne ré-utilise pas les styles écran : il les écrase complètement. Layout dédié compact (9pt body, grid 3 colonnes skills, timeline 22mm label). `page-break-inside: avoid` sur chaque card et timeline-item. Le dark mode est forcé en clair pour l'impression.

### Curseur custom + spotlight

`custom-cursor.js` utilise un lerp factor 0.2 pour le smooth-follow (slight delay). `mix-blend-mode: difference` côté CSS pour rester visible sur tout fond. Désactivé sur touch et `prefers-reduced-motion`. La spotlight sur les cards lit la position via `--mouse-x` / `--mouse-y` CSS variables.

### Nav scroll hint

`nav-scroll-hint.js` écoute le scroll horizontal de la nav mobile et toggle `.has-overflow-start` / `.has-overflow-end`. Le CSS applique alors un `mask-image: linear-gradient(...)` qui fade les bords scrollables — effet "texte tronqué" universel pour signaler du contenu hors viewport.

---

## Dev local

Le `type="module"` impose un serveur HTTP (pas de `file://`). Au choix :

```bash
# Python (préinstallé Windows 10+ via Store)
python -m http.server 8000

# Node
npx serve

# VS Code
# → Extension "Live Server" → clic droit index.html → "Open with Live Server"
```

Puis `http://localhost:8000`.

---

## Déploiement

### GitHub Pages

```bash
git init
git remote add origin git@github.com:maximegarin/cv.git
git push -u origin main
# Settings → Pages → Source: main / root
```

URL générée : https://maximegarin.github.io/cv-alternance-cda/

### Netlify

Drag & drop du dossier sur netlify.com. Le `.htaccess` n'est pas utilisé (Netlify = nginx) ; configuration équivalente via `netlify.toml` à créer si déployé sur Netlify.

### Hébergeur Apache classique

Upload du dossier en FTP. Le `.htaccess` prend effet immédiatement. Ajuster les domaines dans `.htaccess` (sections `RewriteCond` et `Access-Control-Allow-Origin`).

---

## Performance

Benchmarks Lighthouse (build local, mobile throttling) :

| Metric         | Cible  | Mesuré |
| -------------- | ------ | ------ |
| Performance    | > 95   | —      |
| Accessibility  | 100    | —      |
| Best Practices | 100    | —      |
| SEO            | 100    | —      |
| LCP            | < 1.8s | —      |
| CLS            | < 0.1  | —      |

Optimisations en place :

- Preload des fonts critiques (Almarena + Inter Regular)
- Self-hosting (1 seule origin résolue, multiplexing HTTP/2)
- `font-display: swap` (pas de FOIT)
- IntersectionObserver pour les reveals (vs scroll listener)
- `requestAnimationFrame` throttle sur scroll-progress et nav-scroll-hint
- Lerp en rAF pour le custom cursor (60fps GPU)
- Cache 1 an sur les assets immuables via `.htaccess`

---

## Accessibilité

Conforme WCAG 2.1 niveau AA :

- Contrastes vérifiés : texte 18.75:1, secondaire 7+:1, tertiaire 5.2:1 (les deux thèmes)
- Navigation clavier complète (`:focus-visible` 2px accent)
- ARIA labels sur tous les boutons/liens icon-only
- `aria-hidden` sur les chars split, `aria-label` préservé sur le h1
- HTML sémantique : `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- `prefers-reduced-motion` respecté (toutes les animations désactivées)
- `(hover: none)` détection (custom cursor désactivé sur touch)

---

## Personnalisation rapide

| Cible                       | Fichier                                    |
| --------------------------- | ------------------------------------------ |
| Contenu (texte, projets)    | `index.html`                               |
| Couleurs, typo, espacements | `styles/base.css` (section `:root`)        |
| Layout sections             | `styles/layout.css`                        |
| Cartes, boutons, tags       | `styles/components.css`                    |
| Animations                  | `styles/animations.css`                    |
| Export PDF                  | `styles/print.css`                         |
| Ajout/retrait module        | `scripts/modules/` + import dans `main.js` |

---

## Licence

- Code : MIT (réutilisable)
- Police **Almarena Display** : licence commerciale acquise — **ne pas redistribuer le fichier**
- Police **Inter** : SIL Open Font License 1.1 (libre)
- Contenu (texte, projets) : © 2026 Maxime Garin
