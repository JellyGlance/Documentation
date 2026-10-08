# ![Readarr](../icons/selfhst/readarr.svg){ .page-brand } Connect Readarr

Bring book release dates onto the same calendar as Lidarr. JellyGlance does not become a second Readarr editor.

## Before you begin

- Finish Readarr's own setup and confirm it opens in a browser.
- Sign in to JellyGlance with permission to manage integrations.
- Have the API key under Readarr **Settings → General → Security**. Reveal advanced settings if that section is hidden.

## Choose the connection URL

=== "Shared Docker network"

    Use the service name and its internal port:

    ```text
    http://readarr:8787
    ```

    Both containers must be on the same Docker network. Replace the service name if yours differs. `8787` is Readarr's default port.

=== "LAN or NAS"

    Use the server's LAN IP and the published service port:

    ```text
    http://192.168.1.50:8787
    ```

    Replace the example IP and port with your deployment's values. The JellyGlance container must be able to reach them.

=== "Reverse proxy"

    Use the service's configured HTTPS base URL, including any path prefix:

    ```text
    https://readarr.example.com
    ```

    A proxy login page can block API calls. Prefer a reachable internal address or a deliberate API access policy.

Do not paste a browser page such as `/web/` or a URL fragment. Do not append an API endpoint to the base URL.

## Configure JellyGlance

1. Open **Settings → Integrations → Arr Apps**. Enable **Readarr**.
2. Enter the base URL and API key.
3. Run the connection test. A successful test reports the Readarr version.
4. Save the integration.
5. Run **Arr Calendar Sync** under **Settings → Tasks** when you want a fresh pull.

## Verify it works

Open **Calendar** and compare an upcoming book with Readarr. Readarr shares that calendar with [Lidarr](lidarr.md), Sonarr, and Radarr. An empty calendar is valid when nothing is monitored or releasing.

Quality profiles, root folders, and indexers stay in Readarr. [Servarr documents API keys under General → Security](https://wiki.servarr.com/readarr/settings#security).

## Common connection problems

| Symptom | Next check |
| --- | --- |
| Connection refused | Correct host and port; Readarr running; container networking. |
| Name cannot be resolved | Service name exists on a shared network; use a reachable LAN address otherwise. |
| `401` or `403` | Correct API key, no surrounding spaces, and no proxy authentication interception. |
| `404` | Base URL and any configured URL prefix; remove extra UI/API paths. |
| Certificate failure | Correct HTTPS hostname and a certificate trusted by the backend. |
| Test succeeds but the calendar is empty | Saved and enabled integration, completed **Arr Calendar Sync**, and monitored books in Readarr. |

See [troubleshooting](../guide/troubleshooting.md) for log collection and [task reference](../reference/tasks.md) for refresh behaviour.
