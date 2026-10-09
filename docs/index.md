# ![JellyGlance](project-logo.png){ .page-brand } JellyGlance documentation

Learn how to install JellyGlance, connect Jellyfin or Emby, and manage your media stack. JellyGlance runs alongside the media server and brings sessions, users, requests, downloads, and server health into one dashboard.

<div class="video-embed">
<iframe src="https://www.youtube-nocookie.com/embed/IWa0RgbOogQ?start=2" title="JellyGlance trailer: a free, self-hosted dashboard for Jellyfin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

<div class="project-links" markdown>

[Live documentation ↗](http://docs.jellyglance.com/)
[JellyGlance website ↗](https://jellyglance.com/)
[Application repo ↗](https://github.com/Nerdy-Technician/JellyGlance)
[Documentation repo ↗](https://github.com/JellyGlance/Documentation)

</div>

<div class="software-grid" markdown>

[![Docker](icons/brands/docker.svg) **Docker**](operations/docker.md)

[![Jellyfin](icons/selfhst/jellyfin.svg) **Jellyfin**](integrations.md#jellyfin)

[![Emby](icons/selfhst/emby.svg) **Emby**](integrations.md#emby)

[![PostgreSQL](icons/brands/postgresql.svg) **PostgreSQL**](guide/architecture.md)

[![Sonarr](icons/selfhst/sonarr.svg) **Sonarr**](integrations.md#arr-apps)

[![Radarr](icons/selfhst/radarr.svg) **Radarr**](integrations.md#arr-apps)

[![Nginx](icons/brands/nginx.svg) **Nginx**](operations/reverse-proxy.md)

[![Homarr](icons/brands/homarr.svg) **Homarr**](operations/widgets.md)

[![Discord](icons/selfhst/discord.svg) **Discord**](integrations.md#notifications)

</div>

## Get started

If this is your first installation, follow these steps:

1. **[Install JellyGlance](guide/getting-started.md#docker-start)** with Docker Compose and configure your database and application secrets.
2. **[Complete first setup](guide/getting-started.md#first-setup)** to connect Jellyfin or Emby, choose a login method, and run the initial sync.
3. **[Connect integrations](integrations.md)** for requests, downloads, calendars, and notifications.

!!! note "Before you begin"
    You need a running Jellyfin or Emby server, an API key for that server, and Docker with Compose v2. PostgreSQL is included in the example Compose stack.

## Installation and configuration

<div class="guide-grid">
<div class="guide-card"><a href="guide/getting-started/"><strong>Installation</strong><span>Requirements, Docker setup, and the first-run wizard</span></a></div>
<div class="guide-card"><a href="operations/docker/"><strong>Docker</strong><span>Environment values, persistent storage, and updates</span></a></div>
<div class="guide-card"><a href="installation/ugreen/"><strong>UGREEN NAS</strong><span>Follow Marius Hosting’s UGREEN guide</span></a></div>
<div class="guide-card"><a href="installation/synology/"><strong>Synology NAS</strong><span>Follow Marius Hosting’s Synology guide</span></a></div>
<div class="guide-card"><a href="installation/unraid/"><strong>Unraid and TrueNAS</strong><span>Community Apps on Unraid, and Compose on TrueNAS</span></a></div>
<div class="guide-card"><a href="operations/reverse-proxy/"><strong>Reverse proxy</strong><span>HTTPS with Nginx Proxy Manager, Caddy, Nginx, or Traefik</span></a></div>
<div class="guide-card"><a href="reference/configuration/"><strong>Configuration reference</strong><span>Environment variables, defaults, and first-run bootstrap</span></a></div>
<div class="guide-card"><a href="guide/authentication/"><strong>Authentication</strong><span>Local accounts, Quick Connect, Emby sign-in, OIDC, and roles</span></a></div>
<div class="guide-card"><a href="integrations/"><strong>Integrations</strong><span>Jellyfin or Emby, Seerr, Arr apps, downloads, and notifications</span></a></div>
</div>

## Using JellyGlance

<div class="guide-grid">
<div class="guide-card"><a href="guide/dashboard/"><strong>Dashboard and kiosk</strong><span>Annotated dashboard, layouts, themes, and wall displays</span></a></div>
<div class="guide-card"><a href="operations/notifications/"><strong>Notifications</strong><span>Discord, Gotify, ntfy, Telegram, and Pushover</span></a></div>
<div class="guide-card"><a href="guide/screenshots/"><strong>Screenshots</strong><span>Setup screens, dashboard pages, and settings</span></a></div>
<div class="guide-card"><a href="operations/widgets/"><strong>Homepage and Homarr widgets</strong><span>API tokens, endpoints, and downloadable widget files</span></a></div>
<div class="guide-card"><a href="operations/backup-restore/"><strong>Backup and restore</strong><span>Exports, retention, recovery, and moving servers</span></a></div>
<div class="guide-card"><a href="operations/updates/"><strong>Updates and recovery</strong><span>Stable and beta channels, update checks, and recovery</span></a></div>
<div class="guide-card"><a href="reference/tasks/"><strong>Background tasks</strong><span>What each task does, and how to read a failure</span></a></div>
<div class="guide-card"><a href="reference/api-cookbook/"><strong>API cookbook</strong><span>Read-only requests and example JSON responses</span></a></div>
<div class="guide-card"><a href="guide/architecture/"><strong>Architecture</strong><span>How the web app, API, database, and integrations fit</span></a></div>
</div>

## Troubleshooting

Use the [troubleshooting hub](guide/troubleshooting.md) for step-by-step diagnosis and log collection.

The [frequently asked questions](guide/faq.md) cover common installation and connection problems:

- [Jellyfin or Emby URL or API key will not validate](guide/faq.md#jellyfin)
- [First sync is stuck or the dashboard looks empty](guide/faq.md#sync)
- [Requests, Downloads, or Invites are missing](guide/faq.md#pages)
- [Homepage or Homarr returns 403](guide/faq.md#widgets)
- [Reverse proxy configuration](operations/reverse-proxy.md)

For further help, ask in [Discord](https://discord.gg/dMGhv8j2kx) or [open an issue on GitHub](https://github.com/Nerdy-Technician/JellyGlance/issues).

Documentation correction or suggestion? [Open a documentation issue](https://github.com/JellyGlance/Documentation/issues/new/choose).
