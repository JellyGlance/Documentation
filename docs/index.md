# ![JellyGlance](project-logo.png){ .page-brand } JellyGlance documentation

Learn how to install JellyGlance, connect your Jellyfin server, and manage your media stack. JellyGlance runs alongside Jellyfin and brings sessions, users, requests, downloads, and server health into one dashboard.

<div class="software-grid" markdown>

[![Docker](icons/brands/docker.svg) **Docker**](operations/docker.md)

[![Jellyfin](icons/selfhst/jellyfin.svg) **Jellyfin**](integrations.md#media-server)

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
2. **[Complete first setup](guide/getting-started.md#first-setup)** to connect Jellyfin, choose a login method, and run the initial sync.
3. **[Connect integrations](integrations.md)** for requests, downloads, calendars, and notifications.

!!! note "Before you begin"
    You need a running Jellyfin server, a Jellyfin API key, and Docker with Compose v2. PostgreSQL is included in the example Compose stack.

## Installation and configuration

| Guide | What you’ll find |
| --- | --- |
| [Installation](guide/getting-started.md) | Requirements, Docker setup, and the first-run wizard |
| [Docker](operations/docker.md) | Environment values, persistent storage, and updates |
| [Unraid and TrueNAS](operations/catalog.md) | Deploying the stack on your NAS |
| [Reverse proxy](operations/reverse-proxy.md) | HTTPS access with Nginx Proxy Manager, Caddy, Nginx, or Traefik |
| [Configuration reference](reference/configuration.md) | Environment variables, defaults, and first-run bootstrap |
| [Authentication](guide/authentication.md) | Local accounts, Quick Connect, OIDC, and roles |
| [Integrations](integrations.md) | Jellyfin, Seerr, Arr apps, download clients, and notifications |

## Using JellyGlance

| Guide | What you’ll find |
| --- | --- |
| [Dashboard and kiosk](guide/dashboard.md) | Annotated dashboard, layouts, themes, and wall displays |
| [Notifications](operations/notifications.md) | Discord, Gotify, ntfy, Telegram, and Pushover |
| [Screenshots and interface guide](guide/screenshots.md) | Setup screens, dashboard pages, and settings |
| [Homepage and Homarr widgets](operations/widgets.md) | API authentication, endpoints, and downloadable widget configurations |
| [Backup and restore](operations/backup-restore.md) | Exports, retention, recovery, and moving servers |
| [Updates and recovery](operations/updates.md) | Stable/beta channels, update checks, and recovery |
| [Background tasks](reference/tasks.md) | Task purpose, refresh selection, and failure diagnosis |
| [API cookbook](reference/api-cookbook.md) | Read-only requests and example JSON responses |
| [Architecture](guide/architecture.md) | How the web app, API, database, and integrations fit together |

## Troubleshooting

Use the [troubleshooting hub](guide/troubleshooting.md) for step-by-step diagnosis and log collection.

The [frequently asked questions](guide/faq.md) cover common installation and connection problems:

- [Jellyfin URL or API key will not validate](guide/faq.md#jellyfin)
- [First sync is stuck or the dashboard looks empty](guide/faq.md#sync)
- [Requests, Downloads, or Invites are missing](guide/faq.md#pages)
- [Homepage or Homarr returns 403](guide/faq.md#widgets)
- [Reverse proxy configuration](operations/reverse-proxy.md)

For further help, ask in [Discord](https://discord.gg/dMGhv8j2kx) or [open an issue on GitHub](https://github.com/Nerdy-Technician/JellyGlance/issues).
