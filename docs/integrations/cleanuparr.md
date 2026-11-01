# ![Cleanuparr](../icons/brands/cleanuparr.webp){ .page-brand } Connect Cleanuparr

See Cleanuparr's strikes, removals, cleaned downloads, and download client and arr health on the Downloads page, and stop duplicate stuck-download alerts for items Cleanuparr is already handling.

!!! info "Beta feature"
    Available on the **1.4.2-beta** line.

## Before you begin

- Finish Cleanuparr's own setup and confirm its UI loads.
- Sign in to JellyGlance with permission to manage integrations.
- Copy the Cleanuparr API key.

## Choose the connection URL

=== "Shared Docker network"

    ```text
    http://cleanuparr:11011
    ```

    Cleanuparr listens on port `11011` by default. Both containers must share a Docker network.

=== "LAN or NAS"

    ```text
    http://192.168.1.50:11011
    ```

    Use the address the JellyGlance container can reach.

=== "Reverse proxy"

    ```text
    https://cleanuparr.example.com
    ```

    Include Cleanuparr's `BASE_PATH` in the URL if you set one.

## Configure JellyGlance

1. Open **Settings → Integrations → 3rd Party Apps**. Enable **Cleanuparr**.
2. Enter the base URL.
3. Paste the API key. It is sent as `X-Api-Key`.
4. Run the connection test. It reads Cleanuparr's stats API at `/api/v2/stats`.
5. Save the integration.

## Send Cleanuparr notifications to JellyGlance {#notifications}

The Cleanuparr card shows a **Notifications from Cleanuparr** panel with a receiver URL and token.

1. In Cleanuparr, add a **Gotify** notification provider.
2. Paste the receiver URL and token from the JellyGlance card.
3. Enable **Failed Import**, **Stalled**, **Slow**, **Errored Strike**, **Queue Item Deleted**, **Download Cleaned** and **Download Stopped**.

| Cleanuparr event | In JellyGlance |
| --- | --- |
| Failed import, errored download, repeated stalls | Raised as alerts, because they need a look |
| Everything else | Shown on the Downloads page |
| Downloads Cleanuparr is handling | Tagged, and skipped by stuck-download alerts |

!!! warning "Treat the token as a secret"
    Anyone with the token can post events to the receiver. Rotate it from the card if it leaks, then update Cleanuparr.

## Verify it works

Open **Downloads**. The Cleanuparr panel should show strike and cleanup counts matching Cleanuparr. Cleanuparr can also be used as a trigger for [outbound webhook rules](../operations/notifications.md#webhook-rules).

## Common connection problems

| Symptom | Next check |
| --- | --- |
| `401` or `403` | API key from Cleanuparr settings. |
| `404` on test | `BASE_PATH` is missing from the URL. |
| No alerts arrive | Gotify provider URL and token, and that the listed events are enabled. |
