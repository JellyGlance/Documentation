# ![Docker](../icons/brands/docker.svg){ .page-brand } Configuration reference

Set container environment values in your JellyGlance `docker-compose.yml`. Configure integrations, users, tasks, and notifications inside the application after installation.

This reference covers the deployment and first-run settings verified in the application source. The **application default** column describes behaviour when a value is omitted, not the values supplied by the example Compose file.

## Database and application

| Variable | Application default | Purpose / example |
| --- | --- | --- |
| `POSTGRES_USER` | Server startup supplies `postgres` | Database username; match the database container. |
| `POSTGRES_PASSWORD` | None; required | Database password; match the database container. |
| `POSTGRES_IP` | None; required | Database hostname, for example `jellyglance-db`. |
| `POSTGRES_PORT` | None; required | Database port, normally `5432`. |
| `POSTGRES_DB` | `jellyglance` | Database name. |
| `JWT_SECRET` | None; required | Long random secret used to sign authentication tokens. Keep it stable. |
| `PORT` | `JS_PORT`, then `3000` | Application listening port inside the container. |
| `JS_PORT` | `3000` | Alternative port setting when `PORT` is unset. |
| `JS_LISTEN_IP` | `0.0.0.0` | Interface the application listens on. Keep this value in a normal Docker deployment. |
| `TZ` | Runtime/container timezone | Set explicitly, for example `Europe/London`, for consistent local times. |
| `JSON_BODY_LIMIT` | `1mb` | Express JSON request-body limit. Separate from backup file-upload limits. |

Generate a random signing secret locally:

```sh
openssl rand -hex 32
```

Keep the generated value private. Changing it invalidates existing logins.

## Persistent storage

| Variable | Application fallback | Example Docker value |
| --- | --- | --- |
| `CONFIG_DIR` | `config-data` under the API directory | `/app/config` |
| `BACKUP_DIR` | `backup-data` under the API directory | `/app/backups` |

Relative values resolve against the application's working directory. Use absolute container paths and matching mounts:

```yaml
services:
  jellyglance:
    environment:
      CONFIG_DIR: /app/config
      BACKUP_DIR: /app/backups
    volumes:
      - ./config:/app/config
      - ./backups:/app/backups
```

This is a fragment to merge into the existing Compose file. PostgreSQL storage is separate. See [backup and restore](../operations/backup-restore.md) for what an application backup contains.

## Reverse proxy and public URLs

| Variable | Default | Purpose |
| --- | --- | --- |
| `JS_BASE_URL` | Empty | Application path prefix. Leave unset when using a dedicated hostname. |
| `CORS_ORIGINS` | No extra origins | Comma-separated full browser origins, without paths, when cross-origin access is intentional. |
| `JS_CORS_ORIGINS` | No extra origins | Alternative to `CORS_ORIGINS`; the latter takes precedence. |
| `CORS_ALLOW_ALL` | Off | A value of `true` allows all origins. Leave off for normal deployments. |
| `JS_PUBLIC_URL` | Unset | Public application URL used when constructing webhook card-image URLs. |
| `JS_EXTERNAL_URL` | Unset | Fallback to `JS_PUBLIC_URL` for webhook card-image URLs. |

A same-origin proxy setup normally needs no extra CORS values. Follow the [reverse-proxy guide](../operations/reverse-proxy.md) for headers, HTTPS, and WebSockets. Public URL settings do not configure DNS or certificates.

## PostgreSQL TLS

| Variable | Default | Purpose |
| --- | --- | --- |
| `POSTGRES_SSL_ENABLED` | Off | Set to `true` to enable TLS on the main database pool. |
| `POSTGRES_SSL_REJECT_UNAUTHORIZED` | `true` | Validate the database certificate when TLS is enabled. |

The source backup path constructs a separate database pool without applying these TLS options. Do not assume that enabling TLS for the main connection also configures backup and restore connections; verify those operations before relying on a remote database that requires TLS.

## Optional first-run bootstrap

The environment bootstrap seeds incomplete setup. It is not a general mechanism for overwriting existing database-backed settings.

| Variable | Default | Purpose |
| --- | --- | --- |
| `JF_HOST` | Unset | Jellyfin base URL reachable from the app container. |
| `JF_API_KEY` | Unset | Jellyfin API key; required together with `JF_HOST` to seed the connection. |
| `JS_AUTH_MODE` | Empty / local bootstrap | Use `local`. Environment bootstrap does not support Quick Connect or OIDC modes. |
| `JS_USER` | Unset | Initial local administrator username. |
| `JS_PASSWORD` | Unset | Initial local administrator password. |
| `JS_SKIP_FIRST_RUN` | Off | `true` marks the remaining setup steps complete once the connection and account exist. |
| `JS_AUTO_START_SYNC` | Off | `true`, together with skipped first-run setup, queues the initial sync tasks. |

Add these values to the app service's existing `environment` block only if you want automatic setup:

```yaml
JF_HOST: "http://jellyfin:8096"
JF_API_KEY: "replace-with-your-jellyfin-api-key"
JS_AUTH_MODE: "local"
JS_USER: "admin"
JS_PASSWORD: "replace-with-a-strong-password"
JS_SKIP_FIRST_RUN: "true"
JS_AUTO_START_SYNC: "true"
```

The `jellyfin` hostname works only when the containers share a network with that service name. Once setup succeeds, remove unneeded bootstrap credentials from the deployment and recreate the app. Manage subsequent account changes in the application.

## Apply changes

1. Back up your deployment files and record existing values securely.
2. Edit the app service's environment block. Keep database credentials consistent with PostgreSQL.
3. Recreate the container:

    ```sh
    docker compose up -d
    docker compose logs --tail=100 jellyglance
    ```

4. Verify login, database connectivity, and integration health.

Changing PostgreSQL initialization variables does not change the password of an already initialized database. Update the actual database account and application credentials together when rotating a database password.

Do not commit secrets. These runtime values belong to the application deployment; the documentation site's GitHub configuration is described in [Documentation setup](../maintainers/github-pages.md).
