# ![Docker](../icons/brands/docker.svg){ .page-brand } Updates and recovery

Update the application while keeping the database and persistent folders intact. Treat a change of PostgreSQL major version as a separate migration.

## Choose a release

| Image reference | Behaviour |
| --- | --- |
| `ghcr.io/nerdy-technician/jellyglance:latest` | Moving stable-channel tag |
| `ghcr.io/nerdy-technician/jellyglance:beta` | Moving beta-channel tag |
| Published version tag or digest | A specific image you select from the package's published versions |

Read the [application release notes](https://github.com/Nerdy-Technician/JellyGlance/releases) before selecting an image. Verify a version tag exists rather than guessing its spelling. Test beta on a separate deployment with its own database and storage.

## Before updating

1. Record the running application version and image reference.
2. Create a [backup](backup-restore.md), copy it outside the app's backup directory, and save deployment files and secrets separately.
3. Check release notes for migration or breaking-change instructions.
4. Wait for active restores, imports, and other important jobs to finish.

## Apply the update

=== "Docker Compose"

    Run from the folder containing your Compose file:

    ```sh
    docker compose pull jellyglance
    docker compose up -d jellyglance
    docker compose ps
    docker compose logs --tail=100 jellyglance
    ```

    These commands target the application service and preserve existing volumes. If pinning a version, change the image reference in Compose first.

=== "Unraid"

    Record the current image/tag and volume mappings. Select the desired published application image in your container configuration and use the platform's update/recreate action. Preserve config, backup, and database storage. Check the container log after startup.

=== "TrueNAS"

    Record the configured image/tag, datasets, and application environment. Update the application image using the deployment mechanism you originally used. Preserve mounted datasets and PostgreSQL data; inspect startup logs before reopening the service.

## Verify the update

- Confirm the expected version is running and the container is not restarting.
- Sign in and inspect Libraries, Users, and recent activity.
- Check an integration and live playback, if available.
- Review task failures, webhook delivery, and backup availability.
- Test the public URL if using a reverse proxy.

## Recover from a failed update

First inspect the application and database logs. Connection errors or missing environment values may be configuration problems rather than a broken image.

If you need to return to an older version:

1. Stop the failing app with `docker compose stop jellyglance`.
2. Preserve its logs and current data for diagnosis.
3. Restore your previous deployment configuration and select the recorded image version/digest.
4. If the new version migrated the schema, restore a compatible pre-update backup into a separate recovery database/deployment. Do not assume an older image can use the migrated database.
5. Follow the [restore procedure](backup-restore.md), verify the recovered instance, then switch traffic back.

Never use `docker compose down -v` as an update or recovery step: it removes named volumes. The application JSON export is not a full database snapshot; choose a PostgreSQL-aware backup when full database recovery is required.
