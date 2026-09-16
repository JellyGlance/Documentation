---
hide:
  - toc
---

<div class="faq-page" markdown>

<div class="faq-intro" markdown>

<span class="faq-eyebrow">HELP & TROUBLESHOOTING</span>

# A little help. Back to watching.

Answers to the setup questions, connection issues, and everyday fixes that come up when running JellyGlance.

</div>

<div class="faq-shortcuts" markdown>

[![Docker](../icons/brands/docker.svg){ .shortcut-brand } **Start here** ↗<br>Installation & first setup](getting-started.md)

[![Nginx](../icons/brands/nginx.svg){ .shortcut-brand } **Connect securely** ↗<br>Reverse proxy & HTTPS](../operations/reverse-proxy.md)

[![Jellyfin](../icons/selfhst/jellyfin.svg){ .shortcut-brand } **Add your apps** ↗<br>Integration configuration](../integrations.md)

</div>

<div class="faq-tools" hidden>
<label class="faq-search-label" for="faq-search">Find an answer</label>
<div class="faq-search-row"><input id="faq-search" type="search" placeholder="Search API keys, Docker, sync…" autocomplete="off"><button class="faq-clear" type="button">Clear</button></div>
<div class="faq-filters" role="group" aria-label="Filter questions by topic">
<button type="button" data-topic="All" aria-pressed="true">All</button>
<button type="button" data-topic="Basics" aria-pressed="false">Basics</button>
<button type="button" data-topic="Connection" aria-pressed="false">Connection</button>
<button type="button" data-topic="Access" aria-pressed="false">Access</button>
<button type="button" data-topic="Troubleshooting" aria-pressed="false">Troubleshooting</button>
<button type="button" data-topic="Maintenance" aria-pressed="false">Maintenance</button>
</div>
<p class="faq-count" role="status" aria-live="polite"></p>
</div>

<div class="faq-answers" markdown>

<details class="faq-question" id="product" data-topic="Basics" markdown="1">
<summary><span class="software-mark brand-jellyfin" aria-hidden="true"></span><span class="faq-topic">Basics</span><span class="faq-title">Does JellyGlance replace Jellyfin?</span></summary>

No. Jellyfin stays the media server. Glance sits beside it and pulls sessions, libraries, users, requests, downloads, jobs, and health into one admin view.

[Link to this answer](#product){ .faq-permalink }

</details>

<details class="faq-question" id="install" data-topic="Basics" markdown="1">
<summary><span class="software-mark brand-docker" aria-hidden="true"></span><span class="faq-topic">Basics</span><span class="faq-title">What do I need to run it?</span></summary>

Docker Compose v2, PostgreSQL 16 (the compose file starts it), and a Jellyfin URL plus API key. Open `http://localhost:3000` after `docker compose up -d`.

Change `JWT_SECRET`, `POSTGRES_PASSWORD`, and `TZ` before you expose the stack off your LAN. See [Getting Started](getting-started.md) and [Docker](../operations/docker.md).

[Link to this answer](#install){ .faq-permalink }

</details>

<details class="faq-question" id="jellyfin" data-topic="Connection" markdown="1">
<summary><span class="software-mark brand-jellyfin" aria-hidden="true"></span><span class="faq-topic">Connection</span><span class="faq-title">Jellyfin will not validate the URL or API key</span></summary>

Glance has to reach Jellyfin **from the container**, not from your browser.

- Use a LAN IP or hostname, not `localhost`, if Jellyfin runs on the host or another container.
- Match `http` / `https` to what Jellyfin actually serves.
- Use a Jellyfin API key with library and user access, not a user password.
- If Jellyfin is on another Docker network, put both stacks on the same network or use the host IP.

A `403` from Jellyfin usually means the key is wrong or the user that created it cannot see the libraries.

[Link to this answer](#jellyfin){ .faq-permalink }

</details>

<details class="faq-question" id="auth" data-topic="Access" markdown="1">
<summary><span class="software-mark brand-jellyglance" aria-hidden="true"></span><span class="faq-topic">Access</span><span class="faq-title">Which login should I pick?</span></summary>

**Quick Connect** — Household already on Jellyfin. They approve login there and inherit the Glance role from Users.

**Local admin** — You want a Glance-only owner account and will add other local users later.

**OIDC** — An external identity provider is already in the stack. Configure OIDC login and map the identity to an existing Jellyfin user. See [authentication setup](authentication.md).

Quick Connect users and local accounts can share the same install.

[Link to this answer](#auth){ .faq-permalink }

</details>

<details class="faq-question" id="sync" data-topic="Troubleshooting" markdown="1">
<summary><span class="software-mark brand-jellyfin" aria-hidden="true"></span><span class="faq-topic">Troubleshooting</span><span class="faq-title">The first sync is stuck or Home looks empty</span></summary>

The wizard only starts the sync. The work runs as **Settings → Tasks**.

- Wait for **Complete Jellyfin Sync**, not only Recently Added.
- Confirm Jellyfin still answers from the Glance container (`docker logs jellyglance`).
- Artwork and stats fill in after the first full sync, not instantly.

If the task never starts, check that Postgres is healthy (`jellyglance-db`) and restart the Glance container. `Unable to start first sync` means the API could not queue the job — logs are the next stop.

[Link to this answer](#sync){ .faq-permalink }

</details>

<details class="faq-question" id="pages" data-topic="Troubleshooting" markdown="1">
<summary><span class="software-mark brand-sonarr" aria-hidden="true"></span><span class="faq-topic">Troubleshooting</span><span class="faq-title">Where are Requests, Downloads, or Invites?</span></summary>

Those pages stay hidden until the matching integration is configured. Empty queue screens are intentional.

Connect the app under **Settings → Integrations**, then look again: Seerr for Requests, a download client for Downloads, Tdarr for Active Transcodes, Wizarr for Invites.

[Link to this answer](#pages){ .faq-permalink }

</details>

<details class="faq-question" id="proxy" data-topic="Connection" markdown="1">
<summary><span class="software-mark brand-nginx" aria-hidden="true"></span><span class="faq-topic">Connection</span><span class="faq-title">How do I put it behind a reverse proxy?</span></summary>

Follow the [reverse-proxy guide](../operations/reverse-proxy.md) for Nginx Proxy Manager, Caddy, Nginx, and Traefik configuration, HTTPS, WebSockets, and troubleshooting.

Point the proxy at Glance on port `3000`. Do not publish Postgres.

Keep the UI and API on the same origin. Forward `Host` and `X-Forwarded-Proto`. LAN origins are already allowed; a public HTTPS name works when the browser talks to that same host.

Do not put a Glance API key in a public iframe URL. Widget calls should stay server-side on the LAN. See [Homepage widgets](../operations/widgets.md).

[Link to this answer](#proxy){ .faq-permalink }

</details>

<details class="faq-question" id="sessions" data-topic="Access" markdown="1">
<summary><span class="software-mark brand-jellyglance" aria-hidden="true"></span><span class="faq-topic">Access</span><span class="faq-title">I changed JWT_SECRET and everyone is logged out</span></summary>

That is expected. `JWT_SECRET` signs Glance sessions. Changing it invalidates every login. Set it once, keep it stable, and store it with the rest of the compose secrets.

[Link to this answer](#sessions){ .faq-permalink }

</details>

<details class="faq-question" id="reset" data-topic="Maintenance" markdown="1">
<summary><span class="software-mark brand-postgresql" aria-hidden="true"></span><span class="faq-topic">Maintenance</span><span class="faq-title">How do I reset first-run?</span></summary>

Follow the [backup and restore guide](../operations/backup-restore.md) and save an independent backup first. Then wipe the database and start again.

If you use the repo compose file (Postgres in `./postgres-data`):

```
docker compose down
rm -rf ./postgres-data
docker compose up -d
```

If you used a named Docker volume instead, remove that volume. This deletes Glance state, not Jellyfin.

[Link to this answer](#reset){ .faq-permalink }

</details>

<details class="faq-question" id="bootstrap" data-topic="Basics" markdown="1">
<summary><span class="software-mark brand-docker" aria-hidden="true"></span><span class="faq-topic">Basics</span><span class="faq-title">Can I skip the wizard?</span></summary>

Yes. The compose file has optional `JF_HOST`, `JF_API_KEY`, `JS_AUTH_MODE`, `JS_USER`, `JS_PASSWORD`, `JS_SKIP_FIRST_RUN`, and `JS_AUTO_START_SYNC` comments. That seeds the same first-run data the wizard writes.

[Link to this answer](#bootstrap){ .faq-permalink }

</details>

<details class="faq-question" id="nas" data-topic="Basics" markdown="1">
<summary><span class="software-mark brand-truenas" aria-hidden="true"></span><span class="faq-topic">Basics</span><span class="faq-title">Unraid or TrueNAS?</span></summary>

Same image and volumes as Docker Compose. PostgreSQL is a second container on the same network. Notes are on [Unraid and TrueNAS](../operations/catalog.md).

[Link to this answer](#nas){ .faq-permalink }

</details>

<details class="faq-question" id="widgets" data-topic="Troubleshooting" markdown="1">
<summary><span class="software-mark brand-homarr" aria-hidden="true"></span><span class="faq-topic">Troubleshooting</span><span class="faq-title">Homepage or Homarr says 403</span></summary>

That token is a **JellyGlance** API key from **Settings → API Key**, sent as `x-api-token`. It is not the Jellyfin API key from first-run.

Download Homarr JSON widgets or the Homepage YAML pack from that Settings page, or from [Homepage widgets](../operations/widgets.md). After a Homarr import, paste the Glance key — it is not stored in the JSON. New keys can be widgets-only. Try the same routes in the app at **Settings → API Key**.

[Link to this answer](#widgets){ .faq-permalink }

</details>

<details class="faq-question" id="update" data-topic="Maintenance" markdown="1">
<summary><span class="software-mark brand-docker" aria-hidden="true"></span><span class="faq-topic">Maintenance</span><span class="faq-title">How do I update?</span></summary>

```
docker compose pull
docker compose up -d
```

Images are on `ghcr.io/nerdy-technician/jellyglance` for `linux/amd64`, `linux/arm64`, and `linux/arm/v7`.

`docker-compose` (v1, with a hyphen) can crash on modern Docker with `KeyError: 'id'`. Use `docker compose`.

[Link to this answer](#update){ .faq-permalink }

</details>

</div>

<p class="faq-empty" hidden>No matching answers. Try a different search or choose another topic.</p>

<div class="faq-help" markdown>

### Still need a hand?

Start with the [troubleshooting hub](troubleshooting.md), then share what you tried and any relevant error messages. Remove passwords, API keys, and tokens before sharing logs.

[![Discord](../icons/selfhst/discord.svg){ .button-brand } Ask in Discord](https://discord.gg/dMGhv8j2kx){ .md-button .md-button--primary }
[![GitHub](../icons/brands/github.svg){ .button-brand } Open an issue](https://github.com/Nerdy-Technician/JellyGlance/issues){ .md-button }

</div>

</div>
