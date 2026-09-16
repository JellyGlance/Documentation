# ![Jellyfin](../icons/selfhst/jellyfin.svg){ .page-brand } Connect Jellyfin

Bring libraries, users, artwork, playback activity, and live sessions into JellyGlance.

## Before you begin

- Finish the service's own setup and confirm it works directly.
- Sign in to JellyGlance with permission to manage integrations.
- Have a Jellyfin API key from the administrator Dashboard → API Keys (under Advanced in some versions). Create a dedicated key named JellyGlance.

## Choose the connection URL

=== "Shared Docker network"

    Use the service name and its internal port:

    ```text
    http://jellyfin:8096
    ```

    Both containers must be on the same Docker network. Replace the service name if yours differs.

=== "LAN or NAS"

    Use the server's LAN IP and the published service port:

    ```text
    http://192.168.1.50:8096
    ```

    Replace the example IP and port with your deployment's values. The JellyGlance container must be able to reach them.

=== "Reverse proxy"

    Use the service's configured HTTPS base URL, including any path prefix:

    ```text
    https://jellyfin.example.com
    ```

    A proxy login page can block API calls. Prefer a reachable internal address or a deliberate API access policy; do not disable authentication globally.

Do not paste a browser page such as `/web/`, `/settings`, or a URL fragment. Do not append an API endpoint to the base URL.

## Configure JellyGlance

1. Open **Settings → Integrations → Media Server**. You can also connect Jellyfin during first setup.
2. Enter the base URL and API key.
3. Run the connection test and resolve any error before continuing.
4. Save the integration.
5. Run **Complete Jellyfin Sync** under **Settings → Tasks** if you need a fresh check or sync.

## Verify it works

Open **Libraries** and **Users** after the full sync completes. Start playback in Jellyfin and check **Home → Active Sessions**. Library metadata sync and live playback are different data flows, so check both.

The first sync can take time on large libraries. Watch its task log rather than repeatedly starting another sync. Historical Playback Reporting data requires the appropriate Jellyfin plugin and the separate **Playback Reporting Import** task. See [Jellyfin plugin installation](https://jellyfin.org/docs/general/server/plugins/).

## Common connection problems

| Symptom | Next check |
| --- | --- |
| Connection refused | Correct host and port; service running; container networking. |
| Name cannot be resolved | Service name exists on a shared network; use a reachable LAN address otherwise. |
| `401` or `403` | Correct service API key, no surrounding spaces, and no proxy authentication interception. |
| `404` | Base URL and any configured URL prefix; remove extra UI/API paths. |
| Certificate failure | Correct HTTPS hostname and a certificate trusted by the backend. |
| Test succeeds but data is missing | Saved/enabled integration, completed sync, source data, and your assigned role. |

See [troubleshooting](../guide/troubleshooting.md) for log collection and [task reference](../reference/tasks.md) for refresh behaviour.
