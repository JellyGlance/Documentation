# ![JellyGlance](../project-logo.png){ .page-brand } Statistics and insights

Statistics and Insights show how your household watches: when, what and on which devices.

!!! info "Beta feature"
    Available on the **1.4.2-beta** line. Behaviour may still change before the stable release.

## Watching heat map {#heat-map}

**Open:** Statistics → Play Count or Watch Duration

The page opens with a heat map of plays by day of the week and hour of the day, in your server's time zone.

- Hover or tap a square for plays and watch time in that hour.
- The busiest slot, day and hour are shown at a glance.
- Filter by library. Admins can pick a single user; everyone else sees only their own viewing.

## Taste map {#taste-map}

**Open:** Statistics → Taste map

Shows what each person watches by genre and decade, with their most watched titles.

- Admins also get a household view: a match grid showing how closely tastes line up, shared genres, and titles more than one person has watched.
- Everyone else sees their own map.

## Wrapped recaps {#wrapped}

**Open:** Statistics → Recap

Schedule a weekly or monthly Wrapped for any user, with top shows, hours watched and the busiest day.

1. Pick the user and choose **Weekly** or **Monthly**.
2. Choose delivery by email or to one of your webhooks. The recap card is attached.
3. Save. Recaps go out as soon as each week or month finishes.

Users can set up email delivery of their own recap. **Send now** resends the last finished period.

## Device profiles {#device-profiles}

**Open:** Insights → Devices (admins only)

Every TV, phone, browser and cast device gets its own card:

- direct play versus transcode rate and typical bitrate
- apps and versions it runs, who uses it and when it was last seen
- for devices that transcode, the top reasons with a fix hint for that device
