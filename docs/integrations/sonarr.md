# ![Sonarr](../icons/selfhst/sonarr.svg){ .page-brand } Connect Sonarr

Bring upcoming episode dates, monitored series context, and integration health into JellyGlance.

## Before you begin

- Finish the service's own setup and confirm it works directly.
- Sign in to JellyGlance with permission to manage integrations.
- Have the API key under Sonarr Settings → General → Security. Reveal advanced settings if that section is hidden.

## Choose the connection URL

=== "Shared Docker network"

    Use the service name and its internal port:

    ```text
    http://sonarr:8989
    ```

    Both containers must be on the same Docker network. Replace the service name if yours differs.

=== "LAN or NAS"

    Use the server's LAN IP and the published service port:

    ```text
    http://192.168.1.50:8989
    ```

    Replace the example IP and port with your deployment's values. The JellyGlance container must be able to reach them.

=== "Reverse proxy"

    Use the service's configured HTTPS base URL, including any path prefix:

    ```text
    https://sonarr.example.com
    ```

    A proxy login page can block API calls. Prefer a reachable internal address or a deliberate API access policy; do not disable authentication globally.

Do not paste a browser page such as `/web/`, `/settings`, or a URL fragment. Do not append an API endpoint to the base URL.

## Configure JellyGlance

1. Open **Settings → Integrations → Arr Apps**. Select and enable the matching service.
2. Enter the base URL and API key.
3. Run the connection test and resolve any error before continuing.
4. Save the integration.
5. Run **Arr Calendar Sync** under **Settings → Tasks** if you need a fresh check or sync.

## Verify it works

Open **Calendar** and compare an upcoming episode with Sonarr. A successful connection can still produce an empty calendar if there are no applicable releases. Confirm the title is configured in Sonarr before troubleshooting JellyGlance.

JellyGlance reads service data; configure quality profiles, root folders, indexers, and download clients in Sonarr itself. [Servarr documents API keys under General → Security](https://github.com/Servarr/Wiki/blob/master/sonarr/settings.md).

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
