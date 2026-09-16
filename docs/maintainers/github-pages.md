# Documentation setup

This project contains the JellyGlance documentation migrated to **MkDocs Material**. The application remains in [Nerdy-Technician/JellyGlance](https://github.com/Nerdy-Technician/JellyGlance).

## Build and preview locally

Requires Python 3.10 or newer. Run from this documentation project's root:

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs build --strict
mkdocs serve --dev-addr 127.0.0.1:8000
```

Open <http://127.0.0.1:8000/>. MkDocs reloads when you edit a page. Press Ctrl+C to stop. The static output is in `site/`; it and `.venv/` are ignored by Git.

For local previews, `SITE_URL` defaults to `http://127.0.0.1:8000/`. To check production metadata:

```sh
SITE_URL=https://jellyglance.github.io/Documentation/ mkdocs build --strict
```

The documentation repository is [JellyGlance/Documentation](https://github.com/JellyGlance/Documentation). The default project Pages URL is `https://jellyglance.github.io/Documentation/` unless a custom domain is configured. Edit-page links assume the publishing branch is `main`.

## GitHub Pages setup

When you are ready to publish this repository:

1. Ensure the publishing branch is `main`, or adjust both branch conditions and the push trigger in `.github/workflows/docs.yml`.
2. In **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**.
3. In **Settings → Actions → General**, allow GitHub Actions and the official `actions/*` actions used by the workflow.
4. If the `github-pages` environment has deployment restrictions, allow the publishing branch under **Settings → Environments → github-pages**.
5. Push your changes to `main`, or run **Actions → Documentation → Run workflow** on `main`.

Pull requests build with strict validation. Only `main` builds deploy. The workflow grants deployment permissions to its deploy job and uses GitHub's automatic token; you do not need to create a personal access token.

See GitHub's [custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [publishing source settings](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Variables and secrets

Set repository variables under **Settings → Secrets and variables → Actions → Variables**.

| Name | Required? | Value / purpose |
| --- | --- | --- |
| `SITE_URL` | No | Full public URL including any repository path, preferably with a trailing slash. Example: `https://jellyglance.github.io/Documentation/` or `https://jellyglance.com/`. When unset, the workflow uses the URL reported by GitHub Pages. |
| `GITHUB_TOKEN` | Automatic | GitHub provides it for workflow actions. Do not create a secret with this name. |

**No custom secrets or variables are required for the default GitHub Pages deployment.** `SITE_URL` changes site metadata; it does not configure DNS or enable Pages.

The old VitePress workflow used `DOCS_BOT_APP_ID` and `DOCS_BOT_PRIVATE_KEY` to fetch dynamic GitHub data. This documentation does not fetch GitHub project or release data, so those secrets are not needed. JellyGlance runtime values such as `JWT_SECRET`, `POSTGRES_PASSWORD`, and `JF_API_KEY` belong in the application deployment, never this public documentation workflow.

## Optional custom domain

The original site used `jellyglance.com`. This project does not claim that domain by default.

When moving it here, configure the domain in **Settings → Pages → Custom domain**, follow GitHub's DNS instructions, and enable HTTPS when available. Set `SITE_URL` to the matching full URL if you want an explicit override. With this Actions deployment, a `CNAME` file is not required; the domain is configured in Pages settings.

A custom domain can only belong to one Pages site at a time. At cutover, remove it from the old repository, configure it here, and disable the old docs publishing workflow to avoid competing deployments. The application source and its existing workflow have not been changed by this migration.

Reference: [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Editing and migration notes

- Edit Markdown under `docs/` and navigation in `mkdocs.yml`.
- Use relative links to `.md` pages and assets so links work under a repository path or a custom domain.
- Screenshots, branding, icons, and all 37 widget downloads were copied from the source docs.
- Vue FAQ answers are now searchable Markdown; integrations use headings instead of Vue filters.
- Widget downloads remain available; interactive API exploration stays in the JellyGlance application.
- Promotional comparisons, press coverage, roadmap, and release-pipeline pages are excluded from this documentation site.
- The root `LICENSE` is copied unchanged from the source checkout. Original screenshot and third-party icon attribution remains with their respective projects.
- This copy is maintained independently. Future application documentation changes must be ported here deliberately.

The build uses [MkDocs configuration](https://www.mkdocs.org/user-guide/configuration/) and the Material theme. No Node.js, database, Jellyfin instance, or application credentials are needed to preview the docs.
