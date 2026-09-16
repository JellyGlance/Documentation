# ![qBittorrent](../icons/selfhst/qbittorrent.svg){ .page-brand } Connect download clients

Connect a torrent or Usenet client to display its queue on **Downloads**. Keep download paths, categories, seeding rules, and retention settings in the client itself.

## Credentials

Use the connection fields shown for the selected client in **Settings → Integrations → Download Clients**.

| Client | Credentials used by this integration |
| --- | --- |
| qBittorrent | Web UI URL, username, and password |
| Transmission | Service URL, username, and password |
| Deluge | Web UI URL and password |
| SABnzbd | Service URL and API key |
| NZBGet | Service URL and the credentials exposed by its integration form |

Obtain credentials from the client's Web UI or API configuration. Use the actual configured port; container ports and NAS-published ports can differ. Check client-specific access restrictions if JellyGlance is on another host.

## Connect and verify

1. Confirm the client's own interface loads and has the expected queue.
2. Enable the matching client in JellyGlance, enter its URL and credentials, and test the connection.
3. Save, then run **Download Queue Sync** in **Settings → Tasks**.
4. Open **Downloads** and compare a known queue item's title, state, and progress with the client.
5. Check your role if the Downloads page is still unavailable.

An empty queue is valid; do not start a download solely to populate this view. Add, pause, and remove operations affect the source client and should only be used intentionally.

## Network examples

=== "Shared Docker network"

    Use `http://qbittorrent:8080` only if the service is named `qbittorrent` and its Web UI actually listens on port `8080`.

=== "NAS or separate host"

    Use the host's LAN address and mapped Web UI port. `localhost` inside JellyGlance points to JellyGlance itself.

## Troubleshooting

- **Authentication fails:** confirm Web UI/API credentials, not an account for a tracker or indexer.
- **Connection test passes, queue is stale:** run Download Queue Sync and inspect its task log.
- **Requests appear but downloads do not:** Seerr requests and download-client queues are separate integrations.
- **Missing controls:** check client support and role permissions; not every client has identical actions.

See [integration directory](../integrations.md#download-clients) for supported capabilities and [troubleshooting](../guide/troubleshooting.md) for diagnostics.
