# ![Companion apps](../icons/brands/application-cog-outline.svg){ .page-brand } Companion apps

Unpackerr, Kometa, Notifiarr, Recyclarr, and autobrr connect from **Settings → Integrations → 3rd Party Apps**. JellyGlance health-checks them and, for autobrr, shows recent filter hits. It does not edit their rules.

## Unpackerr {#unpackerr}

Enter the URL where Unpackerr answers HTTP. An API key is optional. There is no second Unpackerr console inside JellyGlance: a successful test means the URL responded. Extract paths and *arr connections stay in Unpackerr.

## Kometa {#kometa}

Enter the URL where Kometa answers HTTP. An API key is optional. When the URL responds, Kometa shows as connected on item glance. Overlay and collection config stays in Kometa.

## Notifiarr {#notifiarr}

Paste the Notifiarr API key. The URL can stay at `https://notifiarr.com` when you use the hosted service. The key is required. A successful test means the Notifiarr API accepted it. Discord routing and notification rules stay in Notifiarr.

## Recyclarr {#recyclarr}

Enter a URL that Recyclarr answers on. An API key is optional and is sent as a bearer token when you provide one. JellyGlance only pings that URL. It does not edit quality profiles. A Recyclarr install with no HTTP endpoint cannot pass this check.

## autobrr {#autobrr}

autobrr needs both a URL and an API token.

=== "Shared Docker network"

    ```text
    http://autobrr:7474
    ```

    `7474` is autobrr's default port.

=== "LAN or reverse proxy"

    ```text
    http://192.168.1.50:7474
    ```

    Use the address the JellyGlance container can reach, or the HTTPS base URL if autobrr is proxied.

Create the token in autobrr. JellyGlance sends it as an API token, not as a password. A successful test reports that autobrr is live.

Open **Downloads**. Recent filter hits appear beside the client queue after sync. Filters themselves stay in autobrr.

## If the test fails

| Symptom | Next check |
| --- | --- |
| URL required | Unpackerr, Kometa, Recyclarr, and autobrr need a URL. Notifiarr can use `https://notifiarr.com`. |
| API key or token required | Notifiarr needs an API key. autobrr needs an API token. The other three keys are optional. |
| HTTP 401 or 403 | The key matches that app. Notifiarr and autobrr reject a missing or wrong secret. |
| Connection refused | Host, port, and Docker network. `localhost` inside JellyGlance is JellyGlance itself. |
