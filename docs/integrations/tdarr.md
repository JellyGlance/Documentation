# ![Tdarr](../icons/brands/tdarr.png){ .page-brand } Connect Tdarr

Track active transcodes, the queue, history, artwork, and live progress.

## Before you begin

- Finish Tdarr's own setup and confirm the server is processing or idle as expected.
- Sign in to JellyGlance with permission to manage integrations.
- Use the Tdarr **server** URL, the one that serves `/api/v2/status`. That is usually port `8266`. The web UI on `8265` is a different port.

## Choose the connection URL

=== "Shared Docker network"

    ```text
    http://tdarr:8266
    ```

    Both containers must share a Docker network. Replace the service name if yours differs.

=== "LAN or NAS"

    ```text
    http://192.168.1.50:8266
    ```

    Use the address the JellyGlance container can reach.

=== "Reverse proxy"

    ```text
    https://tdarr.example.com
    ```

    Point this at the server API, not only the web UI, if those are published separately.

## Configure JellyGlance

1. Open **Settings → Integrations → 3rd Party Apps**. Enable **Tdarr**.
2. Enter the server URL.
3. If Tdarr has an API key enabled, paste it. The field is optional when Tdarr allows unauthenticated API access.
4. Run the connection test. A successful test reports queued, processed, and errored counts.
5. Save the integration.

## Verify it works

Open **Active Transcodes**. Compare a job's name and progress with Tdarr. An empty queue is valid. Actions you take here are sent to Tdarr.

Libraries, flows, and nodes stay configured in Tdarr.

## Common connection problems

| Symptom | Next check |
| --- | --- |
| URL is required | The server URL is filled. The API key can stay empty when Tdarr does not require one. |
| Connection refused or `404` | Port `8266` (server API), not the `8265` web UI, unless your server publishes the API elsewhere. |
| `401` or `403` | Paste the Tdarr API key. |
| Active Transcodes is missing | Tdarr is saved and enabled. The page stays hidden until then. |
