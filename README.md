# Arpit Kumar — Portfolio
Personal profile for Arpit Kumar.

A responsive, dark-first personal portfolio built with semantic HTML, CSS, and vanilla JavaScript modules. There is no build step or framework.

## Run locally

ES modules require an HTTP server (opening `index.html` directly may block module imports). From this folder, run one of:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. VS Code users can also use the Live Server extension.

## Personalize the content

- **Profile, links, skills, education, projects, and coding usernames:** edit `js/data.js`.
- **Résumé:** your supplied PDF is installed at `assets/resume.pdf` and shown in the embedded preview. Replace that file when you update your résumé.
- **Project screenshots:** add optimized images under `assets/`, then set each project's `screenshotUrl` in `js/data.js`, for example `assets/phishai.jpg`.
- **Education, experience, achievements:** update the profile content values in `js/data.js` and their labels in `index.html` where needed.

Project cover art is an illustrative interface preview unless a real `screenshotUrl` is supplied. PhishAI, SkyPulse Weather, and Scientific Calculator are marked completed. CareerTwin AI and AKTU Smart LMS remain in development. SkyPulse and Scientific Calculator details are based on their repository source. PhishAI is linked to the supplied Vercel sign-in page; its repository and technology stack were not supplied.

## Coding profile data

Set usernames and profile URLs in `js/data.js`. GitHub public repository counts, followers, repositories, and a contribution graph are loaded when possible. LeetCode solved counts and Codeforces rating use public endpoints; HackerRank has no general public profile statistics API available to this static page, so it links to the profile instead. Each dashboard card has refresh and failure states. Browser CORS rules, provider rate limits, or third-party API changes may prevent a fetch; the profile link remains the fallback. No stats are generated locally.

For reliable production statistics, use a provider you control or a small serverless proxy that caches public API responses. Never put private API tokens in this static repository.

## Deploy

This is a static site with no compilation step. The included `.github/workflows/pages.yml` deploys the repository root to GitHub Pages after each push to `main`; choose **GitHub Actions** as the Pages source in repository settings if it is not enabled automatically. For Netlify or Vercel, import the repository and leave the build command blank and publish directory as `.`. Add a custom domain and update canonical/social metadata if desired.

## Structure

```text
index.html
project.html
css/style.css
css/dashboard.css
js/main.js
js/project-page.js
js/data.js
assets/arpit-profile.jpg
assets/hero-waves.svg
assets/resume.pdf
assets/                   # Add optimized project screenshots here
```
