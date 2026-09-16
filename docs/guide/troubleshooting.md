# Troubleshooting

Start with the symptom below. Check one layer at a time: application → database → integration → reverse proxy.

## Collect useful diagnostics

From your application's Compose folder:

```sh
docker compose ps
docker compose logs --tail=150 jellyglance
docker compose logs --tail=100 jellyglance-db
```

Use the task's log under **Settings → Tasks / Logs** for sync errors. Record the application version, affected service, approximate timestamp, and exact error. Remove passwords, tokens, API keys, webhook URLs containing secrets, and personal data before sharing logs.

=== "Docker"

    Use the commands above. Look for restart loops, database connection failures, and the first error preceding a failed task.

=== "Unraid / TrueNAS"

    Open the application's container logs and the PostgreSQL container logs in the platform UI. Confirm environment values, dataset/bind mounts, and published ports match your deployment.

## Cannot open JellyGlance

1. Confirm the application container is running and its published port is correct.
2. Test the direct LAN address from a trusted machine.
3. If direct access works but HTTPS does not, follow [reverse-proxy troubleshooting](../operations/reverse-proxy.md#troubleshooting).
4. If it exits repeatedly, inspect startup logs for `JWT_SECRET` or PostgreSQL configuration errors.

A healthy database container does not prove the app has the correct credentials. Compare database name, hostname, port, and username with the [configuration reference](../reference/configuration.md).

## Cannot sign in

- **Local account:** confirm the account is enabled and use a local JellyGlance password.
- **Quick Connect:** verify Jellyfin connectivity and approve first-run setup with a Jellyfin administrator.
- **OIDC:** check the issuer, exact callback URL, and matching Jellyfin username claim.
- **Everyone logged out after an update:** check whether `JWT_SECRET` changed.

Use the [authentication guide](authentication.md) for role defaults and identity matching. Do not delete the database to fix an ordinary login failure.

## First sync is stuck or the dashboard is empty

1. Open the log for **Complete Jellyfin Sync**, not just Recently Added Items Sync.
2. Confirm Jellyfin is reachable from the app's network and the API key remains valid.
3. Check PostgreSQL connectivity and available disk space.
4. Let the existing task finish or investigate its failure before starting another.
5. After a successful full sync, run **Refresh Dashboard Stats** if summary values are still stale.

**Clear Stale Task Logs** marks orphaned log entries as failed; it does not fix connectivity or complete an interrupted sync.

## Playback history or live sessions are missing

Live sessions, synced library data, and historical playback imports are separate features. Check a current stream directly in Jellyfin before troubleshooting the live dashboard. For historic plugin data, confirm the Jellyfin Playback Reporting Plugin is configured and run **Playback Reporting Import**.

A metadata sync cannot recreate playback history that was never recorded. See [Jellyfin setup](../integrations/jellyfin.md) and the [task reference](../reference/tasks.md).

## An integration is offline

| Error | Likely layer | Check next |
| --- | --- | --- |
| DNS / hostname failure | Network | Shared Docker network or reachable LAN hostname |
| Connection refused | Service | Listening port, container health, and HTTP/HTTPS scheme |
| `401` / `403` | Authentication | Correct service key and any proxy access policy |
| `404` | URL | Base URL and configured path prefix |
| Certificate error | TLS | Hostname, certificate chain, and backend trust |
| Test passes but no data | Application | Integration saved/enabled, source has data, sync complete, correct role |

## A page is missing

Requests, Downloads, Active Transcodes, and Invites require their corresponding integrations. The user's role must also allow the relevant access. A configured integration does not override role restrictions.

## Notifications or widgets fail

Use the webhook's test action and inspect delivery history. For API widgets, check the `x-api-token` header and key scope; the Jellyfin key is not the JellyGlance widget key.

- [Notifications and webhooks](../operations/notifications.md)
- [API cookbook](../reference/api-cookbook.md)
- [Homepage and Homarr](../operations/widgets.md)

## Ask for help

Include a short reproduction, expected and actual results, deployment type, version, and sanitized log excerpt. Report application problems in the [application issue tracker](https://github.com/Nerdy-Technician/JellyGlance/issues), or documentation problems in [JellyGlance/Documentation](https://github.com/JellyGlance/Documentation/issues/new/choose).
