# ![nginxproxymanager](../icons/brands/nginxproxymanager.svg){ .page-brand } Reverse proxy

Use a reverse proxy to access JellyGlance at an HTTPS address such as `https://glance.example.com`. The proxy forwards the web interface, API, and live updates to JellyGlance on port `3000`.

These examples use a dedicated hostname and serve JellyGlance at `/`. They assume the application already works using the [Docker installation](docker.md).

## Before you begin

- Replace `glance.example.com` with your own hostname and point its DNS record to the proxy server.
- Confirm the proxy can reach JellyGlance on port `3000`.
- For the public certificate setup below, allow inbound ports `80` and `443` to the proxy. Keep PostgreSQL private.
- Set a strong, stable `JWT_SECRET` and database password in the JellyGlance Compose file.

For LAN-only access, use local DNS and a certificate trusted by your devices, or configure DNS-based certificate validation with your proxy. Public inbound ports are not required for DNS-based validation.

## Choose the upstream address

The address must be reachable **from the proxy**, which may run in a different container or on another machine.

| Proxy location | Upstream address | Application networking |
| --- | --- | --- |
| Installed directly on the JellyGlance Docker host | `127.0.0.1:3000` | Publish the app as `127.0.0.1:3000:3000` |
| Container on the same Docker network | `jellyglance:3000` | Join both containers to a shared network; the app needs no published port for proxy access |
| Another machine on your LAN | `192.168.1.50:3000` (example) | Publish port `3000` on the app host and restrict access to the proxy where possible |

Inside a proxy container, `127.0.0.1` refers to that container, not the JellyGlance container or Docker host.

For a proxy installed directly on the host, replace the app's existing `ports` entry with:

```yaml
services:
  jellyglance:
    ports:
      - "127.0.0.1:3000:3000"
```

This is a fragment to merge into your existing Compose file. Apply changes with `docker compose up -d`.

## ![Nginx Proxy Manager](../icons/brands/nginxproxymanager.svg){ .heading-brand } Nginx Proxy Manager {#nginx-proxy-manager}

With Nginx Proxy Manager installed, open **Hosts → Proxy Hosts → Add Proxy Host**.

1. Under **Details**, enter:

    | Field | Value |
    | --- | --- |
    | Domain Names | `glance.example.com` |
    | Scheme | `http` |
    | Forward Hostname / IP | `jellyglance` on a shared Docker network, or the app host's LAN IP |
    | Forward Port | `3000` |
    | Cache Assets | Off |
    | Websockets Support | On |

2. Under **SSL**, request a new certificate for your hostname, provide the requested details, and accept the certificate authority's terms. Alternatively, select an existing certificate.
3. Enable **Force SSL** once the certificate is available and save the host.
4. Open `https://glance.example.com` and sign in.

Proxy the entire site; no separate custom locations are needed for `/api` or `/socket.io/`. Nginx Proxy Manager supplies the proxy headers. If large restore uploads return `413`, set a suitable limit under the host's **Advanced** configuration, for example `client_max_body_size 100m;`.

For proxy installation and certificate management, see the [Nginx Proxy Manager guide](https://nginxproxymanager.com/guide/).

## ![Caddy](../icons/brands/caddy.svg){ .heading-brand } Caddy {#caddy}

For Caddy installed directly on the application host, add this to your `Caddyfile`:

```caddyfile
glance.example.com {
    reverse_proxy 127.0.0.1:3000
}
```

If Caddy is containerized on the same Docker network, replace `127.0.0.1:3000` with `jellyglance:3000`.

For a host installation using `/etc/caddy/Caddyfile`, validate and reload:

```sh
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Caddy handles WebSocket upgrades and forwarded headers for this HTTP upstream automatically. A hostname enables automatic HTTPS; DNS and certificate validation must be working. See [Caddy reverse proxy](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy) and [automatic HTTPS](https://caddyserver.com/docs/automatic-https).

## ![Nginx](../icons/brands/nginx.svg){ .heading-brand } Nginx {#nginx}

This example assumes Nginx runs directly on the application host and you already have a certificate and private key for `glance.example.com`. Replace the certificate paths with your actual files before loading it. Certificate issuance and renewal must be configured separately.

Place the configuration in a file included by Nginx's `http` context, such as `/etc/nginx/conf.d/jellyglance.conf` on installations that include that directory. The `map` belongs outside the `server` blocks.

```nginx
map $http_upgrade $jellyglance_connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 80;
    server_name glance.example.com;
    return 301 https://glance.example.com$request_uri;
}

server {
    listen 443 ssl;
    server_name glance.example.com;

    ssl_certificate /etc/letsencrypt/live/glance.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/glance.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Example upload limit; adjust for your backup/import file sizes.
    client_max_body_size 100m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Real-IP $remote_addr;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $jellyglance_connection_upgrade;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }
}
```

Validate and reload a host installation:

```sh
sudo nginx -t
sudo systemctl reload nginx
```

For containerized Nginx, use `jellyglance:3000` only when the two containers share a Docker network, and validate/reload inside the Nginx container instead. This example assumes Nginx is the single public-facing proxy. Additional proxy hops need their own trusted-client-IP configuration.

The explicit upgrade headers allow live Socket.IO connections through Nginx. See [Nginx WebSocket proxying](https://nginx.org/en/docs/http/websocket.html) and the [proxy module reference](https://nginx.org/en/docs/http/ngx_http_proxy_module.html).

## ![Traefik](../icons/brands/traefikproxy.svg){ .heading-brand } Traefik {#traefik}

Use these Docker-provider labels with an existing Traefik installation. Traefik terminates HTTPS and forwards the entire site, including API and Socket.IO traffic, to JellyGlance over HTTP on port `3000`.

### Prerequisites

- Traefik's Docker provider is enabled and can discover the JellyGlance container.
- Traefik has a `websecure` entry point on port `443` and a certificate resolver named `letsencrypt`, or you substitute your existing names.
- Both Traefik and JellyGlance join the same external Docker network, named `proxy` below.
- DNS for `glance.example.com` points to Traefik. Certificate-validation traffic can reach the configured challenge entry point.

Create the shared network once if it does not already exist:

```sh
docker network create proxy
```

Declare and attach that external network in **both** Compose projects. Attach it to the Traefik service through its own Compose configuration so it persists after recreation. JellyGlance also remains on its `default` network to reach PostgreSQL. Do not add PostgreSQL to the proxy network.

### JellyGlance Docker labels

Merge this fragment into the existing JellyGlance Compose file. Keep its image, environment, volumes, database service, and `depends_on`. Remove the app's `ports: ["3000:3000"]` mapping if all client access should go through Traefik; no published application port is needed between containers.

```yaml
services:
  jellyglance:
    networks:
      - default
      - proxy
    labels:
      traefik.enable: "true"
      traefik.docker.network: proxy
      traefik.http.routers.jellyglance.rule: Host(`glance.example.com`)
      traefik.http.routers.jellyglance.entrypoints: websecure
      traefik.http.routers.jellyglance.tls: "true"
      traefik.http.routers.jellyglance.tls.certresolver: letsencrypt
      traefik.http.routers.jellyglance.service: jellyglance
      traefik.http.services.jellyglance.loadbalancer.server.port: "3000"
      traefik.http.services.jellyglance.loadbalancer.server.scheme: http

networks:
  default: {}
  proxy:
    external: true
    name: proxy
```

[Download the labels fragment](../downloads/traefik-labels.yml). It is not a standalone deployment file. If your database uses a custom network instead of `default`, retain that network on the app too.

| Replace | With |
| --- | --- |
| `glance.example.com` | Your public JellyGlance hostname |
| `proxy` | The actual Docker network name shared with Traefik, in both the network definition and label |
| `websecure` | Your HTTPS entry-point name |
| `letsencrypt` | Your configured certificate-resolver name |
| `3000` | The app's internal listening port if you changed it |

### Traefik entry points and certificates

If those names are not configured yet, the following is a **static Traefik configuration fragment** using an HTTP challenge and a global HTTP-to-HTTPS redirect. Merge it with your existing static configuration; do not duplicate entry points or resolvers already defined through command-line arguments.

```yaml
entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  websecure:
    address: ":443"

providers:
  docker:
    exposedByDefault: false

certificatesResolvers:
  letsencrypt:
    acme:
      email: admin@example.com
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: web
```

Replace the email, publish Traefik's ports `80` and `443`, and persist `/letsencrypt` in its container. The ACME storage file must be writable by Traefik with file mode `600`; it contains private certificate material. Traefik must have its existing Docker API access configured. Restart Traefik after changing static configuration.

This HTTP challenge needs inbound port `80`. If you already use a DNS challenge or manage certificates another way, keep that working configuration. With manually loaded certificates, remove the `tls.certresolver` label and retain `tls: "true"`.

### Apply and verify

After merging the application labels:

```sh
docker compose config --quiet
docker compose up -d jellyglance
```

Open your HTTPS hostname and check login and live updates. Traefik handles WebSocket upgrades automatically; do not add a strip-prefix middleware or manually override upgrade headers for this dedicated-hostname setup. The default host forwarding should remain enabled.

| Symptom | Check |
| --- | --- |
| Traefik `404` | Host rule, entry-point name, Docker discovery, and `traefik.enable` label |
| `502` / `504` | Shared network, actual network name in `traefik.docker.network`, and internal port `3000` |
| Certificate resolver does not exist | Label name matches a resolver in Traefik's static configuration |
| Default/untrusted certificate | ACME logs, DNS, port `80` reachability, and persistent storage permissions |
| App loses database access | App still joins the database's network as well as `proxy` |
| Widget calls redirect to a login page | An added forward-auth middleware may require a deliberate API access policy |

References: [Traefik Docker routing](https://doc.traefik.io/traefik/reference/routing-configuration/other-providers/docker/), [ACME certificate configuration](https://doc.traefik.io/traefik/https/acme/), and [WebSocket support](https://doc.traefik.io/traefik/user-guides/websocket/).

## Application settings

For a dedicated hostname, the UI and API use the same origin. Correctly forwarded host and protocol headers let JellyGlance recognize it; a separate CORS override is normally unnecessary.

| Setting | When to use it |
| --- | --- |
| `JWT_SECRET` | Required application secret. Keep it unchanged across container restarts to preserve login sessions. |
| `CORS_ORIGINS` | Optional comma-separated browser origins when intentionally using a different origin. Use full origins, such as `https://dashboard.example.com`, without a path or trailing slash. |
| `JS_CORS_ORIGINS` | Alternative to `CORS_ORIGINS`; the application uses `CORS_ORIGINS` first when set. |
| `JS_BASE_URL` | Leave unset for the dedicated-hostname examples above. It is a path prefix, not the public HTTPS URL. |

Apply environment changes by recreating the app with `docker compose up -d`. Do not enable `CORS_ALLOW_ALL` to work around missing proxy headers.

These are application settings in the JellyGlance deployment, not GitHub Actions variables for this documentation site. A subpath such as `/jellyglance/` requires coordinating application routes, frontend assets, and Socket.IO paths; these examples do not configure a subpath deployment.

## Verify the connection

1. Open `https://glance.example.com` and confirm the certificate is valid.
2. Sign in and navigate between the dashboard and Settings. API requests should use the same HTTPS hostname.
3. In browser developer tools, open **Network**, filter for `socket.io`, and check that the WebSocket connection upgrades with status `101`. Polling requests may appear before the upgrade.
4. Confirm live updates continue without refreshing the page.
5. If you use restores or imports, check that the proxy's upload limit accommodates your files.

For a proxy installed on the host, check upstream and public HTTP responses with:

```sh
curl -I http://127.0.0.1:3000/
curl -I https://glance.example.com/
```

A successful response or expected login redirect confirms HTTP reachability; it does not test authentication or WebSockets. For a containerized proxy, test the appropriate upstream from that container's network.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| `502 Bad Gateway` | App is running, upstream scheme is `http`, and the proxy can reach port `3000`. In Docker, check the shared network and service name. |
| Certificate request fails | DNS points to the proxy, required validation ports are reachable, and no other service owns them. Check the certificate issuer's error log. |
| Redirect loop or origin errors | Preserve the public host and `X-Forwarded-Proto: https`. Avoid multiple layers redirecting between HTTP and HTTPS. |
| Page loads but live updates stop | Enable WebSockets, forward upgrade headers, and check idle timeouts. Do not cache `/socket.io/` or API responses. |
| Login stops working after a restart | Confirm `JWT_SECRET` stayed the same and that the browser is using the same hostname. |
| Restore or import returns `413` | Increase the proxy upload limit. Application-side limits may also apply; a proxy change alone does not override them. |
| API widgets return `403` | Use a JellyGlance API key in `x-api-token`; an external proxy login/access policy may also block server-to-server requests. See [widget setup](widgets.md). |

Use `docker logs jellyglance` and the proxy's access/error logs to identify which service rejected the request. For connection and first-sync problems, see the [FAQ](../guide/faq.md).
