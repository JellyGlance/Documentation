# ![History imports](../icons/brands/tautulli.png){ .page-brand } Import watch history

Bring older watch history in from a Tautulli or Jellystat backup, a Trakt account, or the connected media server's play state. File imports leave existing JellyGlance rows in place, and rows that already match are skipped.

Open **Settings → Imports** after Jellyfin is connected. The same step is available during first-run setup.

## Tautulli {#tautulli}

1. In Tautulli, export a backup.
2. In JellyGlance, open **Settings → Imports → Tautulli**.
3. Upload the backup and wait for the preview.
4. Import when the preview matches the history you expect.
5. Match any leftover users to current Jellyfin users.
6. On unmatched titles, search Jellyfin media and link the row by hand.

Unmatched rows also appear in **Repair**.

## Jellystat {#jellystat}

1. Export a Jellystat backup.
2. In JellyGlance, open **Settings → Imports → Jellystat**.
3. Upload the backup and review the preview.
4. Import, then match leftover Jellystat users to current Jellyfin users.

## After the import

History shows on user profiles and statistics once rows are linked to Jellyfin items. A title that no longer exists in Jellyfin stays unmatched until you link it or leave it.

Unmatched titles stay in **Settings → Imports** and in **Repair** until you link them. If the dashboard is still empty after a successful import, finish the media-server sync described in the [task reference](../reference/tasks.md).

## Media server play state {#jellyfin-history}

**Settings → Imports → Jellyfin** reads played and in-progress items from the connected server. A Playback Reporting plugin is not required. Rows that already have history are skipped.

Pick the users to include, preview, then sync. **Keep in sync automatically** can repeat that on a 6-hour, 12-hour, daily, or weekly interval. In-progress items use the resume position when that option is on.

The tab is labeled Jellyfin. It uses whichever media server JellyGlance is connected to.

## Trakt {#trakt}

1. Create a Trakt application at [trakt.tv/oauth/applications](https://trakt.tv/oauth/applications/new) with redirect URI `urn:ietf:wg:oauth:2.0:oob`.
2. In JellyGlance, open **Settings → Imports → Trakt** and save the client ID and client secret.
3. Link each Trakt account to one Jellyfin or Emby user. Sign-in is a short code entered on trakt.tv.
4. Import that account, or upload a Trakt export and preview it first.

Automatic sync and whether to keep unmatched rows are switches on the same page.
