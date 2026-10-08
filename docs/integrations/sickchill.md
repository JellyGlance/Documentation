# ![SickChill](https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/sickchill.png){ .page-brand } Connect SickChill

Use SickChill as an optional TV automation health check. It does not sync the JellyGlance release calendar. Use [Sonarr](sonarr.md) when you want episode dates on **Calendar**.

## Before you begin

- Finish SickChill's own setup and confirm its web UI loads.
- Sign in to JellyGlance with permission to manage integrations.
- Have the SickChill API key from its general settings.

## Choose the connection URL

=== "Shared Docker network"

    ```text
    http://sickchill:8081
    ```

    `8081` is SickChill's usual web port. Both containers must share a Docker network.

=== "LAN or NAS"

    ```text
    http://192.168.1.50:8081
    ```

    Use the address the JellyGlance container can reach.

=== "Reverse proxy"

    ```text
    https://sickchill.example.com
    ```

    Include a path prefix if SickChill is served under one.

## Configure JellyGlance

1. Open **Settings → Integrations → Arr Apps**.
2. Under **TV alternative**, enable **SickChill**.
3. Enter the base URL and API key.
4. Run the connection test. A successful test reports that SickChill answered.
5. Save the integration.

To prefer SickChill for TV workflows, open **Settings → Integrations → Media Server** and set the TV default media agent to **SickChill**. That choice does not start calendar sync.

## Verify it works

The connection test is the check. SickChill then appears as a connected TV alternative. Upcoming episodes on **Calendar** still come from Sonarr, Radarr, Lidarr, and Readarr.

## Common connection problems

| Symptom | Next check |
| --- | --- |
| Connection refused | Correct host and port; SickChill running; container networking. |
| URL and API key are required | Both fields are filled. The key is the SickChill API key, not a Jellyfin key. |
| Test succeeds but Calendar stays empty | Expected. Connect Sonarr for episode dates. |
