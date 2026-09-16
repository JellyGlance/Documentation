# ![docker](../icons/brands/docker.svg){ .page-brand } Docker

Docker Compose is the recommended way to run JellyGlance for everyday self-hosting.

## Start

Download the [example compose file](../downloads/docker-compose.yml) as `docker-compose.yml`, set the secrets below, and run in that directory.

```sh
docker compose up -d
```

Use Docker Compose v2 (`docker compose`, with a space). The legacy Python `docker-compose` v1 log watcher can crash on modern Docker event streams with `KeyError: 'id'`.

The stack starts:

- `jellyglance`, the combined API and web app
- `jellyglance-db`, PostgreSQL 16

Open the app at `http://localhost:3000`.

## Configuration

Set these environment values before using JellyGlance outside a private test environment:

```yaml
JWT_SECRET: "replace-me-with-a-long-random-secret"
POSTGRES_PASSWORD: "replace-me"
TZ: Europe/London
```

The included compose file uses the published GHCR image and mounts simple host folders for portable app data:

| Host path | Container path | Purpose |
| --- | --- | --- |
| `./config` | `/app/config` | Runtime config files and future local app settings |
| `./backups` | `/app/backups` | Backup exports and restore uploads |

PostgreSQL data stays in the `postgres-data` volume. Use JellyGlance backups before deleting that volume.

## HTTPS and reverse proxy

Follow the [reverse-proxy guide](reverse-proxy.md) to configure a hostname, HTTPS, and live updates with Nginx Proxy Manager, Caddy, Nginx, or Traefik.

## Updating

```sh
docker compose pull
docker compose up -d
```

In the JellyGlance application checkout, if you build locally from source, rebuild the JellyGlance image after pulling code:

```sh
docker build -t ghcr.io/nerdy-technician/jellyglance:local .

```

To build the same multi-architecture image manifest published by CI, use Docker Buildx:

```sh
docker buildx build \
  --platform linux/amd64,linux/arm64,linux/arm/v7 \
  -t ghcr.io/nerdy-technician/jellyglance:local \
  .
```

The locally built image also needs PostgreSQL, environment settings, and persistent mounts. Use the compose stack with its image changed to the local tag.

## Resetting Setup Data

For a fresh first-run setup, stop the stack and remove the PostgreSQL data directory used by the repo compose file:

```sh
docker compose down
rm -rf ./postgres-data
docker compose up -d
```

If you started from the README named volume instead, remove `jellyglance_postgres-data` (or whatever compose named it).

This deletes JellyGlance database state. Keep backups before doing this on a real deployment.

Stuck after first-run or a proxy hop? See the [FAQ](../guide/faq.md).

## Published Images

The Docker workflow publishes GHCR images from `main` and release tags for `linux/amd64`, `linux/arm64`, and `linux/arm/v7` (armhf):

```text
ghcr.io/nerdy-technician/jellyglance
```

## Update planning

See [updates and recovery](updates.md) before switching stable/beta channels or attempting a rollback.
