# ![Wizarr](../icons/brands/wizarr.png){ .page-brand } Connect Wizarr

Create, copy, open, and remove Jellyfin invite links from JellyGlance.

## Before you begin

- Finish Wizarr's own setup and confirm it can reach Jellyfin.
- Sign in to JellyGlance with permission to manage integrations.
- Have a Wizarr API key.

## Choose the connection URL

=== "Shared Docker network"

    ```text
    http://wizarr:5690
    ```

    `5690` is Wizarr's usual container port. Both containers must share a Docker network.

=== "LAN or NAS"

    ```text
    http://192.168.1.50:5690
    ```

    Use the address the JellyGlance container can reach.

=== "Reverse proxy"

    ```text
    https://wizarr.example.com
    ```

    Include a path prefix if Wizarr is served under one.

## Configure JellyGlance

1. Open **Settings → Integrations → 3rd Party Apps**. Enable **Wizarr**.
2. Enter the base URL and API key. Both are required.
3. Run the connection test. A successful test reports invite and user counts from Wizarr.
4. Save the integration.

## Verify it works

Open **Invites**. Existing Wizarr links should list there. Create, copy, open, and remove actions run against Wizarr, so use them on a link you mean to change.

Invite events can also be sent through [webhooks](../operations/notifications.md) once Wizarr is connected.

## Common connection problems

| Symptom | Next check |
| --- | --- |
| URL and API key are required | Both fields are filled and saved. |
| Connection refused | Correct host and port; Wizarr running; container networking. |
| `401` or `403` | Wizarr API key, with no extra spaces. |
| Invites page is missing | Wizarr is saved and enabled. The page stays hidden until then. |
