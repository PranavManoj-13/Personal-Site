# Pranav's portfolio

React/Vite portfolio with Home, About, Projects, Blog, Contact, standalone project pages, and a custom 404.

## Run

Node.js 20.19+ or 22.12+:

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

Deploy `dist/` to a static host. Configure the host to serve `404.html` for missing URLs. `_redirects` is included for compatible hosts such as Netlify.

## Edit

- `src/content.js`: name, email, social URLs, technologies, and projects. Project `githubUrl` and `liveUrl` enable their buttons; blank values keep them disabled.
- `src/main.jsx`: page layouts and the Formspree `FORM_ID` (`mnpplapk`). The contact form sits beside the social links on larger screens and sends name, email, and message through `@formspree/react`, with validation, sending, error, and success states.
- `src/styles.css`: shared sans-serif typography, responsive layouts, colors, and animations.
- `src/DescentBackground.jsx`: cached loss contours with animated gradient-descent trajectories behind the centered hero introduction.
- `src/NetworkBackground.jsx`: shared decorative data visualization background.
- `src/PageLoader.jsx`: 2–4–2 loader; `MIN_LOADING_MS` controls its 1.4-second delay. Reduced-motion preferences disable animation and the deliberate delay.
- `scripts/pages.mjs`: shared page catalog, titles, and HTML generation. Project entries are derived from content and reused by the Vite configuration.

The blog and home page show “Coming soon” until posts are ready. Each page has its own generated HTML entry. After adding content, run `npm run build` to generate its page.

Replace `public/cv.pdf` with your actual PDF. The About button downloads it directly. Replace the sample CV content before publishing. IntelliMF is the current project, with repository and live-site links.

Blank social profile URLs open platform homepages. Optional `profile.email` sets direct email links; contact-form delivery uses Formspree independently.

The navbar hides after scrolling and reappears near the top edge, on keyboard focus, or through the mobile reveal control. Selection moves only on activation. The hero occupies the first viewport, followed by the toolkit.

Technology SVGs are local. Seven are from [Devicon](https://github.com/devicons/devicon/tree/v2.17.0); its license is retained in `public/logos/DEVICON-LICENSE.txt`. SQL uses a vendor-neutral database icon.
