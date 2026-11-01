# ![JellyGlance](../project-logo.png){ .page-brand } Server tools

Admin tools under **Server** for library gaps, job scheduling and plain-language troubleshooting.

!!! info "Beta feature"
    Available on the **1.4.2-beta** line. Behaviour may still change before the stable release.

## Incomplete season hunter {#incomplete-seasons}

**Open:** Server → Incomplete Seasons

Lists every series with a season that is short on episodes.

- With [Sonarr](../integrations/sonarr.md) connected, episodes on disk are compared with Sonarr's aired episode count.
- Without Sonarr, gaps in numbering (for example E01, E02, E04) are flagged.
- Each row shows the short seasons and missing episode numbers, with buttons to open the series in Sonarr (or add it if Sonarr does not have it) and on TVDB.

## Subtitle and audio gaps {#subtitle-gaps}

**Open:** Server → Subtitle Gaps

Lists movies and series missing your household's preferred subtitle or audio languages, using the tracks Jellyfin already knows about.

1. Set the languages once. Codes or names both work, for example `en`, `fr` or `German`.
2. Filter by missing subtitles or missing audio.
3. With [Bazarr](../integrations/bazarr.md) connected, use **Search in Bazarr** on a row, or tick several rows and search them together.

## Quiet hours {#quiet-hours}

**Open:** Server → Server Jobs → Quiet hours

Hold Jellyfin library scans and intro / credits detection during a window so evening or overnight playback is not slowed down.

1. Pick a start and end time.
2. Optionally set a time zone.
3. Choose the days it applies to.
4. Choose what happens to held jobs: run once as soon as the window ends, or wait for their next schedule.

Held jobs show an **In quiet hours** tag. Pressing **Run** still starts a job straight away.

## Ops Copilot {#ops-copilot}

**Open:** Server → Ops Copilot (admins only)

!!! warning "Preview"
    Ops Copilot is a preview. Some actions are proposals only and are never carried out.

Ask plain questions such as:

- "why is Dune buffering for Mum?"
- "free 500 GB without touching favourites"
- "anything stuck in downloads?"

It explains transcodes, library space and download health from your own data. Anything that would change something is shown as a **dry-run plan**. Nothing runs until you press **Approve**, and you can cancel instead.

| Action | After Approve |
| --- | --- |
| Pause a stalled download | Runs. **Undo** resumes it. |
| Send a session a message suggesting lower quality | Runs |
| Delete titles via Sonarr or Radarr (with favourites check) | Proposal only, not executed |
| Raise a bitrate limit | Proposal only, not executed |
| Blocklist and re-grab a download | Proposal only, not executed |
| Clear failed downloads | Proposal only, not executed |

Every question and decision is kept in an audit log. Ops Copilot is separate from [Blobbo](blobbo.md): Blobbo answers questions for everyone, while Ops Copilot is the admin tool for planned changes.

## Smart request routing {#smart-routing}

**Open:** Requests → Rules → Smart routing

Rules decide what happens to new requests.

1. Add a rule that matches on who is asking, genre, and movie or TV show.
2. Choose **Approve** to send it straight to Sonarr or Radarr, or **Hold** to keep it for an admin.
3. Order the rules. They run top to bottom and the **first match wins**.

Requests that match no rule keep your existing settings, which hold requests unless auto-approve is on. The routing log shows each request, the rule that caught it and whether it was sent on or held.
