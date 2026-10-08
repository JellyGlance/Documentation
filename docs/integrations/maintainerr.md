# ![Maintainerr](../icons/brands/maintainerr.png){ .page-brand } Connect Maintainerr

Watch cleanup collections, scheduled actions, recent activity, and reclaimable space from JellyGlance.

## Before you begin

- Finish Maintainerr's own setup and confirm its UI loads.
- Sign in to JellyGlance with permission to manage integrations.
- Have the Maintainerr API key if you enabled API authentication. The key is optional when Maintainerr allows open access.

## Choose the connection URL

=== "Shared Docker network"

    ```text
    http://maintainerr:6246
    ```

    `6246` is Maintainerr's default port. Both containers must share a Docker network.

=== "LAN or NAS"

    ```text
    http://192.168.1.50:6246
    ```

    Use the address the JellyGlance container can reach.

=== "Reverse proxy"

    ```text
    https://maintainerr.example.com
    ```

    Include a path prefix if Maintainerr is served under one.

## Configure JellyGlance

1. Open **Settings → Integrations → 3rd Party Apps**. Enable **Maintainerr**.
2. Enter the base URL.
3. Paste the API key when Maintainerr requires one. A key that already starts with `Bearer` is sent as-is.
4. Run the connection test. A successful test reports that Maintainerr health is up.
5. Save the integration.

## Verify it works

Open **Maintainerr** in the JellyGlance navigation. Collections and recent actions should match Maintainerr. Rules and media servers stay configured in Maintainerr. Actions you run from JellyGlance are sent to Maintainerr.

## Common connection problems

| Symptom | Next check |
| --- | --- |
| URL is required | The base URL is filled. The API key can stay empty when Maintainerr does not require one. |
| Health reports degraded | Maintainerr's own health page. JellyGlance is repeating that status. |
| `401` or `403` | API key from Maintainerr. |
| Maintainerr page is missing | The integration is saved with a URL. The nav entry stays hidden until then. |
