import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { profile, projects } from '../src/content.js';

export const pages = {
  'index.html': [`${profile.name} — Data, Code & Possibility`, 'A personal portfolio exploring data science, software, design, and thoughtful questions.'],
  'about/index.html': [`About — ${profile.name}`, 'The person and interests behind the work.'],
  'projects/index.html': [`Projects and Internships — ${profile.name}`, 'A collection of all the projects I have done so far.'],
  'blog/index.html': [`Field notes — ${profile.name}`, 'Blog posts coming soon.'],
  'contact/index.html': [`Contact — ${profile.name}`, 'Start a conversation about data, research, or working together.'],
  '404.html': ['404 — Outside the dataset.', 'This page is outside the dataset. Find your way home.'],
  ...Object.fromEntries(projects.map(project => [`projects/${project.id}.html`, [`${project.title} — ${profile.name}`, project.description]])),
};

const escape = value => String(value).replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]);

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  for (const [path, [title, description]] of Object.entries(pages)) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#f7f8fa" />
  <meta name="description" content="${escape(description)}" />
  <title>${escape(title)}</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,450;0,500;0,550;0,600;0,650;0,700;0,800;1,500&family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
`);
  }
}
