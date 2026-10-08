# ![Jellyfin](../icons/selfhst/jellyfin.svg){ .page-brand } ![Emby](../icons/selfhst/emby.svg){ .page-brand } Connect Jellyfin or Emby

JellyGlance needs one media server. Pick Jellyfin or Emby during first setup, or leave the choice on **Auto-detect** and JellyGlance will read it from the server URL. Change it later under **Settings → Integrations → Media Server**.

## Before you begin

- Finish the server's own setup and confirm it opens in a browser.
- Sign in to JellyGlance with permission to manage integrations.
- Have an API key from that server's dashboard. Create a dedicated key named JellyGlance. On Jellyfin this is **Dashboard → API Keys** (under Advanced on some versions). Emby uses the same kind of API key from its dashboard.

## Choose the connection URL

=== "Jellyfin"

    Default port is `8096`.

    ```text
    http://jellyfin:8096
    ```

    On a LAN, use the host address the JellyGlance container can reach, such as `http://192.168.1.50:8096`. Behind a proxy, use the HTTPS base URL, including any path prefix.

=== "Emby"

    Default port is `8096`.

    ```text
    http://emby:8096
    ```

    On a LAN, use the host address the JellyGlance container can reach, such as `http://192.168.1.50:8096`. Behind a proxy, use the HTTPS base URL, including any path prefix.

Both containers must share a Docker network when you use a service name. `localhost` inside JellyGlance is JellyGlance itself. Do not paste `/web/`, a settings page, or an API path onto the base URL.

## Configure JellyGlance

1. Open **Settings → Integrations → Media Server**, or connect the server during first setup.
2. Choose **Auto-detect**, **Jellyfin**, or **Emby**. Auto-detect asks the server what it is.
3. Enter the base URL and API key.
4. Run the connection test and resolve any error before continuing.
5. Save.
6. Run **Complete Jellyfin Sync** under **Settings → Tasks** if you need a fresh pull. The task name stays Jellyfin even when the server is Emby.

`IS_EMBY_API=true` or `IS_EMBY_API=false` locks the server type, and the setup picker then follows that variable. Without it, the choice saved in setup is used. When seeding setup from the environment, set `JF_SERVER_TYPE=emby` or `jellyfin`, or leave it unset to auto-detect. See the [configuration reference](../reference/configuration.md#optional-first-run-bootstrap).

## Sign-in

Jellyfin can use Quick Connect. Emby has no Quick Connect, so an Emby install signs in with the Emby username and password. The password is sent to Emby and is not stored in JellyGlance. Local accounts and OIDC still work with either server. See [authentication](../guide/authentication.md).

## Verify it works

Open **Libraries** and **Users** after the full sync. Start playback on the media server and check **Home → Active Sessions**.

Watch history can come from three places:

- **Settings → Imports → Jellyfin** reads played and in-progress items from the connected server. No Playback Reporting plugin is required.
- The **Playback Reporting Import** task reads the Playback Reporting plugin on Jellyfin or Emby.
- [Tautulli, Jellystat, and Trakt imports](imports.md) bring in history from those backups or accounts.

## Common connection problems

| Symptom | Next check |
| --- | --- |
| Connection refused | Correct host and port; server running; container networking. |
| Detected as the other server | Set Jellyfin or Emby explicitly, or set `IS_EMBY_API`. |
| `401` or `403` | API key for that server, with no extra spaces. |
| `404` | Base URL only. Remove `/web` and other UI paths. |
| Emby login has no Quick Connect code | Expected. Use the Emby username and password. |

See [troubleshooting](../guide/troubleshooting.md) for log collection and [task reference](../reference/tasks.md) for refresh behaviour.
