# ![Audiobookshelf](https://cdn.jsdelivr.net/gh/selfhst/icons/svg/audiobookshelf.svg){ .page-brand } Connect Audiobookshelf

Show who is listening, recent sessions, and newly added audiobooks.

## Before you begin

- Finish Audiobookshelf's own setup and confirm libraries are visible there.
- Sign in to JellyGlance with permission to manage integrations.
- Create an API token in Audiobookshelf under **Settings → Users**, on the user JellyGlance should use. An admin token also unlocks listener names and recent sessions.

## Choose the connection URL

=== "Shared Docker network"

    ```text
    http://audiobookshelf:13378
    ```

    `13378` is Audiobookshelf's default port. Both containers must share a Docker network.

=== "LAN or NAS"

    ```text
    http://192.168.1.50:13378
    ```

    Use the address the JellyGlance container can reach.

=== "Reverse proxy"

    ```text
    https://audiobooks.example.com
    ```

    Include a path prefix if Audiobookshelf is served under one.

## Configure JellyGlance

1. Open **Settings → Integrations → 3rd Party Apps**. Enable **Audiobookshelf**.
2. Enter the base URL.
3. Paste the API token into the API token field. Do not include the word `Bearer`.
4. Run the connection test. A successful test reports the server version and library count.
5. Save the integration.

## Verify it works

Open **Server → Audiobooks**. Library totals and recently added titles should match Audiobookshelf. Listening-now and recent sessions require a token from a user who can see that activity.

## Common connection problems

| Symptom | Next check |
| --- | --- |
| URL is required / API token is required | Both fields are filled. |
| `401` or `403` | Token from Audiobookshelf **Settings → Users**, not a Jellyfin API key. |
| Libraries are empty | The token's user can see those libraries in Audiobookshelf. |
| Audiobooks tab is missing | Audiobookshelf is saved, enabled, and has a URL. |
