# ![JellyGlance](../project-logo.png){ .page-brand } Dashboard and kiosk

Arrange Home around the information you use most: playback, recent media, requests, downloads, and operational alerts.

## Find your way around

<div class="annotated-screen" markdown>

![JellyGlance Home: sidebar on the left, edit controls at the top right, active sessions above library totals and operational alerts.](../screenshots/home.png)

<a class="screen-marker marker-navigation" href="#navigation" aria-label="1: Sidebar navigation">1</a>
<a class="screen-marker marker-editor" href="#edit-widgets" aria-label="2: Edit widgets">2</a>
<a class="screen-marker marker-sessions" href="#playback" aria-label="3: Active playback">3</a>
<a class="screen-marker marker-alerts" href="#alerts" aria-label="4: Operational alerts">4</a>

</div>

The numbered markers link to the explanations below. Screenshots show an example installation; counts, widgets, and available pages depend on your configuration.

### 1. Sidebar navigation {#navigation}

The sidebar opens library, activity, user, and operational pages. Integration-specific pages appear when configured, and role permissions affect what each user can access. Household users use My Glance rather than admin Home.

### 2. Edit widgets {#edit-widgets}

Select **Edit widgets** at the top right of Home.

1. Choose a **Preset** as a starting point.
2. Reorder sections with the drag controls and hide sections you do not need.
3. Use **Pin top** to keep one section near the top.
4. Adjust widget sizes and choose **Comfortable** or **Compact** density.
5. Select a theme: Default, Darker, Neon, High contrast, or Wall display.
6. Use **Export** to save a copy of your layout before making substantial changes.

Edits set the preset to Custom and are saved to browser local storage. Do not assume layouts automatically follow you to another browser or survive clearing site data. User and kiosk layouts use separate storage contexts.

### 3. Active playback {#playback}

The sessions area shows what Jellyfin reports as currently playing, including client, device, delivery method, progress, and transcode information. Use it to inspect a live stream; use Activity for past playback.

### 4. Operational alerts {#alerts}

The operations area brings attention to pending requests, health checks, and backup age. The editor exposes alert thresholds such as backup days, pending requests, missing posters, stream cap, and transcode cap. **Restore alerts** clears dismissed-alert preferences.

## Kiosk display

Use `/home/kiosk` on your JellyGlance application hostname, for example:

```text
https://glance.example.com/home/kiosk
```

1. Sign in on the display device with an account allowed to access the intended dashboard.
2. Configure kiosk options under **Settings → Kiosk**, then open the kiosk route.
3. Check the layout at the screen's actual resolution and browser zoom.
4. Show only the widgets and playback details appropriate for people who can see the display.
5. Leave a live session running briefly to confirm the display continues to update.

![Kiosk settings showing display customization options](../screenshots/settings-kiosk.png)

*Kiosk settings control the display experience. Kiosk mode is not a public authentication bypass.*

The Home implementation uses longer refresh intervals in kiosk mode, so some operational data updates less frequently than on normal Home. Browser sleeping, display power saving, and disconnected WebSockets can also delay updates.

## Common adjustments

| Goal | Adjustment |
| --- | --- |
| Less scrolling on a desktop | Compact density, hide unused sections, and pin the most useful section |
| A readable wall display | Wall display or High contrast theme, fewer widgets, and readable browser zoom |
| Keep personal activity private | Review Active Sessions privacy and user visibility options in Settings |
| Recover a changed layout | Reapply a preset; keep an exported copy before experimenting |
| Missing integration widget | Configure the service, check permissions, then review visibility in the editor |

See [screenshots](screenshots.md) for other pages and [troubleshooting](troubleshooting.md) for stale or missing data.
