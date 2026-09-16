# Screenshots

First-run setup, the daily dashboard, media activity, requests, downloads, transcodes, invites, users, statistics, Jellyfin jobs, and Settings.

## First Run

The first-run wizard walks through Jellyfin connection, authentication, optional integrations, legacy history import, and the first sync. The integrations step is intentionally lighter than the full Settings page: choose an app, add it to setup, then fill in only the services you want ready before JellyGlance builds its first dashboard cache.

![First-run Jellyfin server connection](../screenshots/first-run-jellyfin-server.png)

Connect Jellyfin with URL and API key validation.

![First-run authentication choice](../screenshots/first-run-auth.png)

Choose Quick Connect, OIDC, or local JellyGlance admin access.

![First-run integrations picker](../screenshots/first-run-integrations.png)

Add only the integrations you want ready for the first sync.

![First-run history import](../screenshots/first-run-history-import.png)

Optionally import older Tautulli or Jellystat watch history.

![First-run sync](../screenshots/first-run-sync.png)

Start the initial Jellyfin sync and dashboard build.

## Home Dashboard

![JellyGlance home dashboard](../screenshots/home.png)

Home is the daily command center. It brings together active sessions, recently added media, library health, activity signals, request/download status, automation health, Tdarr transcodes, Wizarr invites, Maintainerr cleanup, Hall of Fame, and operational alerts. The layout can be reordered, resized, hidden, and tuned for kiosk mode.

## Media And Activity

![Recently added media](../screenshots/recently-added.png)

Recently Added highlights fresh Jellyfin content with poster-first browsing.

![Playback activity table](../screenshots/activity.png)

Activity gives searchable playback history with users, clients, methods, durations, and media context.

![Libraries grid view](../screenshots/libraries-grid.png)

Libraries grid view focuses on artwork, counts, and quick scan actions.

![Libraries list view](../screenshots/libraries-list.png)

Libraries list view is denser for admin review and bulk checking.

![Release calendar](../screenshots/calendar.png)

Calendar collects upcoming Sonarr, Radarr, and Lidarr releases.

![Statistics dashboard](../screenshots/statistics.png)

Statistics summarizes watch time, top users, playback methods, libraries, and trends.

## Requests, Downloads, And Transcodes

![Requests page](../screenshots/requests.png)

Requests brings Jellyseerr and Overseerr items into JellyGlance with posters, requester context, status filters, and admin actions.

![Downloads page](../screenshots/downloads.png)

Downloads shows torrent and Usenet queues, progress, stalled items, and integration health.

![Tdarr active transcodes page](../screenshots/active-transcodes.png)

Active Transcodes tracks Tdarr active jobs, queued files, history, conversion details, artwork, and live progress.

![Wizarr invites page](../screenshots/invites.png)

Invites lets you create, copy, open, and manage Wizarr invite links from JellyGlance.

Requests, Downloads, Active Transcodes, Invites, Maintainerr, and Automation Health stay hidden from navigation until their matching integrations are configured, so clean installs do not show empty pages.

## Users And Admin

![Users and access management](../screenshots/users.png)

Users combines Jellyfin role metadata, local JellyGlance accounts, tracking visibility, and profile links.

![Jellyfin jobs page](../screenshots/jellyfin-jobs.png)

Jellyfin Jobs gives admins scheduled task status, categories, last run state, and manual run controls.

User visibility controls can hide selected Jellyfin users from stats and activity when needed. Profile pages continue from here with personal watch history, media rails, favourites, watchlists, and recommendations.

## Settings

Settings is organized into category-based sections with a collapsible sidebar. The full integrations page remains more powerful than the first-run version, with import/export, health history, service testing, and detailed app cards.

![General settings](../screenshots/settings-general.png)

General settings for core app behavior and dashboard defaults.

![Integrations settings](../screenshots/settings-integrations.png)

Integrations groups Media Server, Arr Apps, Seerr Apps, Download Clients, and 3rd party apps.

![Security settings](../screenshots/settings-security.png)

Security covers auth mode, Active Sessions IP privacy, roles, and access behavior.

![Task settings](../screenshots/settings-tasks.png)

Tasks controls manual and scheduled sync jobs for Jellyfin, downloads, health, and backups.

![Kiosk settings](../screenshots/settings-kiosk.png)

Kiosk settings tune title, density, theme, visible widgets, widget sizes, and widget order.

![Library settings](../screenshots/settings-library.png)

Library settings control scan behavior and library display options.

![Newsletter settings](../screenshots/settings-newsletter.png)

Newsletter settings configure SMTP, recipients, previews, test sends, and digest history.

![Webhook settings](../screenshots/settings-webhooks.png)

Webhooks define destinations, event toggles, test delivery, and delivery history.

## Operations Notes

JellyGlance is designed to keep routine checks close together: active sessions, playback history, library changes, requests, downloads, transcodes, invites, cleanup signals, scheduled jobs, imports, webhooks, newsletters, backups, and health checks. Empty navigation stays hidden until an integration is useful.
