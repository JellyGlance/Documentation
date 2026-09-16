---
hide:
  - toc
---

<div class="integration-directory" markdown>

<div class="directory-heading" markdown>

<span class="faq-eyebrow">THE JELLYGLANCE STACK</span>

# Your apps. One place to manage them.

Connect Jellyfin first, then add the services you use. Browse by category to see what each integration does and where to configure it.

</div>

<div class="directory-start" markdown>

![Jellyfin](icons/selfhst/jellyfin.svg){ .directory-core-logo }

**Start with Jellyfin** <span class="directory-badge">Required connection</span>

Connect your server URL and API key during [first setup](guide/getting-started.md#first-setup). Optional Requests, Downloads, Transcodes, and Invites pages appear when their services are configured.

</div>

<div class="directory-tools" hidden>
<label class="faq-search-label" for="integration-search">Find your software</label>
<div class="faq-search-row"><input id="integration-search" type="search" placeholder="Search Sonarr, requests, API keys…" autocomplete="off"><button class="directory-clear" type="button">Clear</button></div>
<div class="directory-filters" role="group" aria-label="Integration category">
<button type="button" data-category="all" aria-pressed="true">All apps</button>
<button type="button" data-category="media-server" aria-pressed="false">Media server</button>
<button type="button" data-category="3rd-party-apps" aria-pressed="false">Media tools</button>
<button type="button" data-category="seerr-apps" aria-pressed="false">Requests</button>
<button type="button" data-category="arr-apps" aria-pressed="false">Automation</button>
<button type="button" data-category="download-clients" aria-pressed="false">Downloads</button>
<button type="button" data-category="notifications" aria-pressed="false">Notifications</button>
<button type="button" data-category="imports-and-digest" aria-pressed="false">Imports & email</button>
</div>
<p class="directory-count" role="status" aria-live="polite"></p>
</div>

<section class="directory-section" data-category="media-server" markdown="1">

## Media server {#media-server}

<p class="directory-caption">Your library starts here</p>

<div class="integration-cards" markdown="1">

<article class="integration-card" id="jellyfin" markdown="1">

![Jellyfin](icons/selfhst/jellyfin.svg){ .integration-card-logo loading=lazy }

### Jellyfin

The required media server connection.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** First setup → Jellyfin

Configure it during first setup or under **Settings → Integrations → Media Server**.

- Validate the Jellyfin URL and API key.
- Sync libraries, users, items, seasons, episodes, and playback data.
- Proxy posters, backdrops, avatars, and login artwork.
- Read active sessions for Activity views and nav badges.
- Support Jellyfin Quick Connect login.

[Link to Jellyfin](#jellyfin)

</details>

[Setup walkthrough →](integrations/jellyfin.md){ .integration-guide-link }

</article>

</div>

</section>

<section class="directory-section" data-category="3rd-party-apps" markdown="1">

## Media tools {#3rd-party-apps}

<p class="directory-caption">Invites, transcodes & housekeeping</p>

3rd party apps live under <strong>Settings &gt; Integrations &gt; 3rd Party Apps</strong> and bring invites, transcodes, cleanup, and alternative TV automation into JellyGlance.

<div class="integration-cards" markdown="1">

<article class="integration-card" id="wizarr" markdown="1">

![Wizarr](icons/brands/wizarr.png){ .integration-card-logo loading=lazy }

### Wizarr

Create, copy, open, sync, and manage invite links directly from JellyGlance.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → 3rd Party Apps



[Link to Wizarr](#wizarr)

</details>

</article>

<article class="integration-card" id="tdarr" markdown="1">

![Tdarr](icons/brands/tdarr.png){ .integration-card-logo loading=lazy }

### Tdarr

Track active transcodes, queued jobs, history, artwork, conversion details, and live progress.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → 3rd Party Apps



[Link to Tdarr](#tdarr)

</details>

</article>

<article class="integration-card" id="maintainerr" markdown="1">

![Maintainerr](icons/brands/maintainerr.png){ .integration-card-logo loading=lazy }

### Maintainerr

Monitor cleanup collections, scheduled actions, recent activity, storage state, health, and reclaimable space.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → 3rd Party Apps



[Link to Maintainerr](#maintainerr)

</details>

</article>

<article class="integration-card" id="unpackerr" markdown="1">

![Unpackerr](icons/brands/unpackerr.png){ .integration-card-logo loading=lazy }

### Unpackerr

Connect the Unpackerr URL so Glance can health-check extract status next to the download queue. There is no second Unpackerr console.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → 3rd Party Apps



[Link to Unpackerr](#unpackerr)

</details>

</article>

<article class="integration-card" id="kometa" markdown="1">

![Kometa](icons/brands/kometa.png){ .integration-card-logo loading=lazy }

### Kometa

Ping Kometa as a connected overlay/collection service. Status appears on item glance when the URL answers.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → 3rd Party Apps



[Link to Kometa](#kometa)

</details>

</article>

<article class="integration-card" id="notifiarr" markdown="1">

![Notifiarr](icons/brands/notifiarr.png){ .integration-card-logo loading=lazy }

### Notifiarr

Health-only. Connect the Notifiarr API so Glance can confirm the client is reachable. It does not replace Notifiarr's Discord tools.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → 3rd Party Apps



[Link to Notifiarr](#notifiarr)

</details>

</article>

<article class="integration-card" id="recyclarr" markdown="1">

![Recyclarr](icons/brands/recyclarr.png){ .integration-card-logo loading=lazy }

### Recyclarr

Health-only ping for a Recyclarr URL. Glance does not edit quality profiles.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → 3rd Party Apps



[Link to Recyclarr](#recyclarr)

</details>

</article>

<article class="integration-card" id="autobrr" markdown="1">

![autobrr](icons/brands/autobrr.png){ .integration-card-logo loading=lazy }

### autobrr

Filter hits appear on Downloads next to the client queue. Glance does not configure autobrr filters.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → 3rd Party Apps



[Link to autobrr](#autobrr)

</details>

</article>

<article class="integration-card" id="sickchill" markdown="1">

![SickChill](https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/sickchill.png){ .integration-card-logo loading=lazy }

### SickChill

Connect and health-check SickChill as optional TV automation. It does not sync the JellyGlance release calendar (use Sonarr for that).

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → 3rd Party Apps



[Link to SickChill](#sickchill)

</details>

</article>

</div>

</section>

<section class="directory-section" data-category="seerr-apps" markdown="1">

## Requests {#seerr-apps}

<p class="directory-caption">Bring requests into your dashboard</p>

Seerr apps live under <strong>Settings &gt; Integrations &gt; Seerr Apps</strong>. Enable Jellyseerr, Overseerr, or both, then add the base URL and API key for each service.

<div class="integration-cards" markdown="1">

<article class="integration-card" id="jellyseerr" markdown="1">

![Jellyseerr](icons/brands/jellyseerr.png){ .integration-card-logo loading=lazy }

### Jellyseerr

Bring request cards, poster metadata, requester context, availability checks, and approval actions into JellyGlance.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → Seerr Apps



[Link to Jellyseerr](#jellyseerr)

</details>

[Setup walkthrough →](integrations/jellyseerr.md){ .integration-guide-link }

</article>

<article class="integration-card" id="overseerr" markdown="1">

![Overseerr](icons/brands/overseerr.png){ .integration-card-logo loading=lazy }

### Overseerr

Handle request triage, source badges, status, and per-request actions without leaving the dashboard.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → Seerr Apps



[Link to Overseerr](#overseerr)

</details>

[Setup walkthrough →](integrations/jellyseerr.md){ .integration-guide-link }

</article>

</div>

<details class="integration-group-notes" markdown="1">
<summary>More about requests</summary>

Connected Seerr apps power the dedicated <strong>Requests</strong> page:

- poster-first request cards with requester, status, source, type, and request age
- fast filters for all, approved, available, failed, and partial requests
- search and newest, oldest, or status sorting
- request detail modal with movie, show, season, and episode context when the source provides it
- availability checks against Jellyfin so requests can show Available, Missing, or Partially available
- approve, decline, retry, mark available, and open-in-Seerr actions where the source supports them
- sidebar badge counts for request items that need attention

</details>

</section>

<section class="directory-section" data-category="arr-apps" markdown="1">

## Automation {#arr-apps}

<p class="directory-caption">Keep your media pipeline in view</p>

Arr apps live under <strong>Settings &gt; Integrations &gt; Arr Apps</strong>. Each service accepts a base URL and API key, and the test action reports the app version when the service responds correctly.

<div class="integration-cards" markdown="1">

<article class="integration-card" id="sonarr" markdown="1">

![Sonarr](icons/selfhst/sonarr.svg){ .integration-card-logo loading=lazy }

### Sonarr

Series automation for TV releases, monitored episodes, health checks, calendar entries, and import events.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → Arr Apps



[Link to Sonarr](#sonarr)

</details>

[Setup walkthrough →](integrations/sonarr.md){ .integration-guide-link }

</article>

<article class="integration-card" id="radarr" markdown="1">

![Radarr](icons/selfhst/radarr.svg){ .integration-card-logo loading=lazy }

### Radarr

Movie automation for release dates, monitored items, health checks, calendar entries, and import events.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → Arr Apps



[Link to Radarr](#radarr)

</details>

[Setup walkthrough →](integrations/radarr.md){ .integration-guide-link }

</article>

<article class="integration-card" id="lidarr" markdown="1">

![Lidarr](icons/selfhst/lidarr.svg){ .integration-card-logo loading=lazy }

### Lidarr

Music automation for release status, monitored artists and albums, calendar context, and health checks.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → Arr Apps



[Link to Lidarr](#lidarr)

</details>

</article>

<article class="integration-card" id="readarr" markdown="1">

![Readarr](icons/selfhst/readarr.svg){ .integration-card-logo loading=lazy }

### Readarr

Book automation on the same Arr calendar as Lidarr. Connect the URL and API key; Glance does not become a second Readarr editor.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → Arr Apps



[Link to Readarr](#readarr)

</details>

</article>

<article class="integration-card" id="bazarr" markdown="1">

![Bazarr](icons/selfhst/bazarr.svg){ .integration-card-logo loading=lazy }

### Bazarr

Subtitle automation status and health checks alongside the rest of the media stack.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → Arr Apps



[Link to Bazarr](#bazarr)

</details>

</article>

<article class="integration-card" id="prowlarr" markdown="1">

![Prowlarr](icons/brands/prowlarr.png){ .integration-card-logo loading=lazy }

### Prowlarr

Indexer health and connected app sync status alongside the rest of the media automation stack.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → Arr Apps



[Link to Prowlarr](#prowlarr)

</details>

</article>

</div>

<details class="integration-group-notes" markdown="1">
<summary>More about automation</summary>

Run <strong>Arr Calendar Sync</strong> from <strong>Settings &gt; Tasks</strong> when you want to force a fresh pull from Sonarr, Radarr, Lidarr, or Readarr.

</details>

</section>

<section class="directory-section" data-category="download-clients" markdown="1">

## Downloads {#download-clients}

<p class="directory-caption">Torrent & Usenet queues</p>

Download clients live under <strong>Settings &gt; Integrations &gt; Download Clients</strong> and feed the dedicated <strong>Downloads</strong> page.

<div class="integration-cards" markdown="1">

<article class="integration-card" id="qbittorrent" markdown="1">

![qBittorrent](icons/selfhst/qbittorrent.svg){ .integration-card-logo loading=lazy }

### qBittorrent

Torrent queue monitoring with URL, username, and password credentials.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → Download Clients



[Link to qBittorrent](#qbittorrent)

</details>

[Setup walkthrough →](integrations/download-clients.md){ .integration-guide-link }

</article>

<article class="integration-card" id="transmission" markdown="1">

![Transmission](icons/selfhst/transmission.svg){ .integration-card-logo loading=lazy }

### Transmission

Torrent queue monitoring with URL, username, and password. Supports add, pause, and remove.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → Download Clients



[Link to Transmission](#transmission)

</details>

[Setup walkthrough →](integrations/download-clients.md){ .integration-guide-link }

</article>

<article class="integration-card" id="deluge" markdown="1">

![Deluge](icons/selfhst/deluge.svg){ .integration-card-logo loading=lazy }

### Deluge

Torrent queue monitoring with URL and password. Supports add, pause, and remove.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → Download Clients



[Link to Deluge](#deluge)

</details>

[Setup walkthrough →](integrations/download-clients.md){ .integration-guide-link }

</article>

<article class="integration-card" id="sabnzbd" markdown="1">

![SABnzbd](icons/selfhst/sabnzbd.svg){ .integration-card-logo loading=lazy }

### SABnzbd

Usenet queue monitoring with URL and API key credentials, including pause and remove.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → Download Clients



[Link to SABnzbd](#sabnzbd)

</details>

[Setup walkthrough →](integrations/download-clients.md){ .integration-guide-link }

</article>

<article class="integration-card" id="nzbget" markdown="1">

![NZBGet](icons/selfhst/nzbget.svg){ .integration-card-logo loading=lazy }

### NZBGet

Usenet queue monitoring with URL and API key. Supports add, pause, and remove.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Integrations → Download Clients



[Link to NZBGet](#nzbget)

</details>

[Setup walkthrough →](integrations/download-clients.md){ .integration-guide-link }

</article>

</div>

<details class="integration-group-notes" markdown="1">
<summary>More about downloads</summary>

The Downloads page supports magnet links, torrent URLs, and torrent file uploads. Queue sync refreshes active, queued, completed, and failed state for qBittorrent, Transmission, Deluge, rTorrent, SABnzbd, and NZBGet.

</details>

</section>

<section class="directory-section" data-category="notifications" markdown="1">

## Notifications {#notifications}

<p class="directory-caption">Send updates where you need them</p>

<div class="integration-cards" markdown="1">

<article class="integration-card" id="discord-compatible" markdown="1">

![Discord-Compatible](icons/selfhst/discord.svg){ .integration-card-logo loading=lazy }

### Discord-Compatible

Send JellyGlance events to Discord-style webhook endpoints for task, sync, media, and health updates.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Webhooks



[Link to Discord-Compatible](#discord-compatible)

</details>

</article>

<article class="integration-card" id="gotify-style" markdown="1">

![Gotify-Style](icons/selfhst/gotify.svg){ .integration-card-logo loading=lazy }

### Gotify-Style

Send operational alerts to Gotify-style webhook targets for self-hosted notification flows.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Webhooks



[Link to Gotify-Style](#gotify-style)

</details>

</article>

<article class="integration-card" id="ntfy" markdown="1">

![ntfy](icons/brands/ntfy.svg){ .integration-card-logo loading=lazy }

### ntfy

Send operational alerts to ntfy topic URLs such as `https://ntfy.sh/your-topic`.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Webhooks



[Link to ntfy](#ntfy)

</details>

</article>

<article class="integration-card" id="telegram" markdown="1">

![Telegram](icons/brands/telegram.svg){ .integration-card-logo loading=lazy }

### Telegram

Send the same event set to a Telegram bot using the Bot API sendMessage URL with `chat_id`.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Webhooks



[Link to Telegram](#telegram)

</details>

</article>

<article class="integration-card" id="pushover" markdown="1">

![Pushover](icons/brands/pushover.png){ .integration-card-logo loading=lazy }

### Pushover

Send the same event set to Pushover using `https://api.pushover.net/1/messages.json?token=APP_TOKEN&user=USER_KEY`.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Webhooks



[Link to Pushover](#pushover)

</details>

</article>

</div>

<details class="integration-group-notes" markdown="1">
<summary>More about notifications</summary>

Common event groups include:

- task started, completed, and failed
- Jellyfin full sync and recently added sync
- playback reporting import completed or failed
- Arr calendar refresh
- download started, completed, or failed
- integration health warning
- library scan completed

</details>

</section>

<section class="directory-section" data-category="imports-and-digest" markdown="1">

## Imports & email {#imports-and-digest}

<p class="directory-caption">Keep your history. Share what’s new.</p>

<div class="integration-cards" markdown="1">

<article class="integration-card" id="tautulli-imports" markdown="1">

![Tautulli Imports](icons/brands/tautulli.png){ .integration-card-logo loading=lazy }

### Tautulli Imports

Upload backups, preview history, skip duplicates, and manually match unmatched watch history to current Jellyfin media.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Imports



[Link to Tautulli Imports](#tautulli-imports)

</details>

</article>

<article class="integration-card" id="newsletter-digest" markdown="1">

![Newsletter Digest](icons/brands/email-outline.svg){ .integration-card-logo loading=lazy }

### Newsletter Digest

Configure SMTP, generate previews, send tests, track send history, and deliver weekly or monthly JellyGlance summaries.

<details class="integration-setup" markdown="1">
<summary>Configuration details</summary>

**Open:** Settings → Newsletter



[Link to Newsletter Digest](#newsletter-digest)

</details>

</article>

</div>

<details class="integration-group-notes" markdown="1">
<summary>More about imports & email</summary>

Imported rows that cannot be matched automatically are surfaced in both <strong>Settings &gt; Imports</strong> and the <strong>Repair Hub</strong>.

Newsletter content includes recently added media, weekly watch stats, active viewers, and repair status.

</details>

</section>


## Access and background jobs {#access-and-jobs}

See the [task reference](reference/tasks.md) for the full job catalog and [notifications guide](operations/notifications.md) for destination setup.


**Jellyfin Quick Connect**
Users approve login from Jellyfin and inherit the JellyGlance role assigned on the Users page.

**Local JellyGlance Users**
Local accounts can be created for admin, manager, viewer, and custom role workflows.

**OIDC Authentication**
OIDC login uses an external identity provider and matches the identity to a Jellyfin user. See [authentication and permissions](guide/authentication.md).

### Background Jobs

| Task | Purpose |
| --- | --- |
| Recently Added Items Sync | Refreshes fresh Jellyfin media shelves |
| Complete Jellyfin Sync | Syncs users, libraries, items, seasons, episodes, and metadata |
| Playback Reporting Import | Imports Jellyfin Playback Reporting Plugin rows |
| Integration Sync | Refreshes connected integration status |
| Arr Calendar Sync | Pulls release calendar data from Sonarr, Radarr, Lidarr, and Readarr |
| Download Queue Sync | Pulls active download queues from connected clients |
| Integration Health Check | Tests connected integration health and updates health history |
| Webhook Health Check | Sends a test event through enabled task webhooks and records delivery status |
| Backup JellyGlance | Creates a JellyGlance backup |
| Refresh Dashboard Stats | Refreshes cached dashboard and statistics views |
| Clear Stale Task Logs | Marks interrupted task logs as stale |

<p class="directory-empty" hidden>No matching integrations. Try a different search or clear the category filter.</p>

</div>
