# ![Prowlarr](../icons/brands/prowlarr.png){ .page-brand } Connect Prowlarr

Show indexer health and app-sync status alongside the rest of the automation stack. Prowlarr does not fill the JellyGlance release calendar.

## Before you begin

- Finish Prowlarr's own setup and confirm indexers respond there.
- Sign in to JellyGlance with permission to manage integrations.
- Have the API key under Prowlarr **Settings → General → Security**.

## Choose the connection URL

=== "Shared Docker network"

    ```text
    http://prowlarr:9696
    ```

    `9696` is Prowlarr's default port. Both containers must share a Docker network.

=== "LAN or NAS"

    ```text
    http://192.168.1.50:9696
    ```

    Use the address the JellyGlance container can reach.

=== "Reverse proxy"

    ```text
    https://prowlarr.example.com
    ```

    Include a path prefix if Prowlarr is served under one. A proxy login page can block the API.

## Configure JellyGlance

1. Open **Settings → Integrations → Arr Apps**. Enable **Prowlarr**.
2. Enter the base URL and API key.
3. Run the connection test. A successful test reports the Prowlarr version.
4. Save the integration.
5. Open **Automation Health** and confirm Prowlarr is listed.

Indexer definitions, app sync, and proxy settings stay in Prowlarr. [Servarr documents API keys under General → Security](https://wiki.servarr.com/prowlarr/settings#security).

## Common connection problems

| Symptom | Next check |
| --- | --- |
| Connection refused | Correct host and port; Prowlarr running; container networking. |
| `401` or `403` | API key from Prowlarr Security settings, with no extra spaces. |
| `404` | Base URL only. Remove extra UI paths. |
| Test succeeds but Automation Health is empty | Integration is saved and enabled, then open **Automation Health** again. |

See [Bazarr](bazarr.md) for subtitle health on the same page, and [troubleshooting](../guide/troubleshooting.md) for log collection.
