# ![Homarr](../icons/brands/homarr.svg){ .page-brand } API cookbook

Use compact JSON endpoints for server-side dashboards and status checks. Examples below are read-only and use a JellyGlance API key, not a Jellyfin key.

## Create a key

Open **Settings → API Key** and create a widgets-only key for read-only widgets. Send it as the `x-api-token` header. Use a widgets-write key only when you intentionally need supported write actions; full keys have broader access.

Keep tokens out of browser-visible URLs and public repositories. The in-app API explorer and `/swagger-ui` show the API exposed by your running version.

## Set up a local shell

These examples use Bash and `curl`. The password-style prompt keeps the token out of your shell history:

```bash
JELLYGLANCE_URL='https://glance.example.com'
read -r -s -p 'JellyGlance API key: ' JELLYGLANCE_TOKEN
printf '\n'
```

Subsequent commands use those variables in the same shell. Substitute your own application hostname.

## List available widgets

```bash
curl --fail-with-body --silent --show-error \
  -H "x-api-token: ${JELLYGLANCE_TOKEN}" \
  "${JELLYGLANCE_URL}/api/widgets"
```

Use this catalog and Swagger to discover supported routes rather than assuming every `/api` route accepts a widgets-only token.

## Playback counts

```bash
curl --fail-with-body --silent --show-error \
  -H "x-api-token: ${JELLYGLANCE_TOKEN}" \
  "${JELLYGLANCE_URL}/api/widgets/sessions"
```

Illustrative response; values and timestamp are examples:

```json
{
  "jellyglance": true,
  "recent": 18,
  "today": 5,
  "last24h": 9,
  "viewersToday": 3,
  "users": 8,
  "updatedAt": "2026-09-16T12:00:00.000Z"
}
```

This is a playback-count summary, not the current live-session list. Use `/api/widgets/nowplaying` for live playback.

## Homepage summary

```bash
curl --fail-with-body --silent --show-error \
  -H "x-api-token: ${JELLYGLANCE_TOKEN}" \
  "${JELLYGLANCE_URL}/api/widgets/homepage"
```

The response combines catalog, playback, download, storage, and operational fields. Selected example fields:

```json
{
  "jellyglance": true,
  "movies": 1200,
  "shows": 160,
  "downloads": 2,
  "stalled": 0,
  "digest": 1,
  "digestOk": false,
  "storage": "4.2 TB"
}
```

This example is a subset, not the complete schema. `jellyglance: true` identifies the payload; it does not mean every integration is healthy. The homepage snapshot uses cached data; use `/api/widgets/health` when investigating operational health and `/api/widgets/requests` for live Seerr request data.

## Download queue

```bash
curl --fail-with-body --silent --show-error \
  -H "x-api-token: ${JELLYGLANCE_TOKEN}" \
  "${JELLYGLANCE_URL}/api/widgets/downloads"
```

Expect `active`, `stalled`, `total`, an `items` list, and other metadata supplied by your version. The compact list is limited to a small number of active items; do not treat it as a full export of every client queue.

## Add the data to a dashboard

=== "Homepage"

    Use the [downloadable Homepage YAML](../widgets/jellyglance-homepage.yaml), set the application URL, and configure `x-api-token` in the widget headers. Run requests from the Homepage server, not a public browser iframe.

=== "Homarr"

    Import the [Homarr overview widget](../widgets/jellyglance-homarr.json), replace the example host, and add your token after import. The exported JSON intentionally does not carry your secret.

=== "Custom script"

    Parse JSON rather than matching text. Handle failed HTTP responses, missing/empty data, and temporary upstream failures. Start with a moderate polling interval such as 60 seconds and avoid overlapping requests.

After testing, clear the shell variable:

```bash
unset JELLYGLANCE_TOKEN
```

## Troubleshooting responses

| Result | Check |
| --- | --- |
| `401` / `403` | Token, correct `x-api-token` header, key scope, and proxy access policy |
| `404` | Correct application host, route, and any base path |
| HTML instead of JSON | Proxy login page, wrong URL, or redirected request |
| Empty arrays or zeros | Source integrations, permissions, and latest sync |
| `5xx` | Application logs and source-service health |

See [widget reference](../operations/widgets.md) for the full endpoint list and [troubleshooting](../guide/troubleshooting.md) for logs.
