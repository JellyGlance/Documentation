# ![PostgreSQL](../icons/brands/postgresql.svg){ .page-brand } Backup and restore

Create a backup before an update, a restore, or a move to another server. Keep a copy outside the JellyGlance host so a disk failure does not remove both the application and its backups.

## What is included?

The built-in backup writes a JSON export of selected application tables:

- Application configuration, including stored settings and authentication configuration
- Jellyfin users, libraries, library items, seasons, and episodes
- Playback activity and Playback Reporting Plugin data
- Item information

It is not a full PostgreSQL dump. Do not assume every table, task log, or external file is included. Your Jellyfin server, media files, Compose file, environment secrets, and host-mounted folders require their own backup plan.

!!! warning "Treat backup files as sensitive"
    JSON exports can contain saved credentials and authentication settings. The built-in export is not an encrypted archive. Store copies privately and encrypt them using your backup storage tooling.

## Create a backup

1. Sign in with an account allowed to manage backups.
2. Open **Settings → Backup** and start a backup, or run **Backup JellyGlance** under **Settings → Tasks**.
3. Wait for completion and check the task log for failures.
4. Download the JSON export, or copy it from the mounted backup folder.
5. Store an independent copy outside that folder and record the application version used to create it.

With the example Compose file, `/app/backups` in the container is `./backups` on the host. Files are named like `backup_YYYY-MM-DD HH-mm-ss.json`.

## Scheduling and retention

Use **Settings → Tasks** to configure the backup task's schedule and confirm its latest run completed successfully.

!!! warning "Local retention is five JSON files"
    The current backup code sorts JSON files in `BACKUP_DIR` by creation time and removes entries after the newest five. This includes uploaded JSON files, not only files created by the backup task. Keep long-term archives and migration copies outside `BACKUP_DIR`.

Check available disk space, directory write permissions, and the date of the latest successful backup. A scheduled task alone does not prove that an export completed.

## Restore an existing installation

!!! danger "Restore replaces existing data"
    The restore route clears existing tables before importing the backup. A failed import can leave the installation incomplete. Create an independent backup first and test recovery on a separate instance when possible.

1. Save a fresh backup outside the application's backup directory.
2. Confirm the selected file is a complete JellyGlance JSON export. Start with the same application version that produced it where possible.
3. Open **Settings → Backup**, upload the file or choose one already in the backup directory, and start the restore.
4. Wait for the restore result and inspect the log for skipped tables, skipped columns, or errors.
5. Sign in using the restored authentication configuration if prompted.
6. Verify users, watch history, libraries, integrations, and dashboard data. Run the appropriate sync tasks if data needs refreshing.

Older backups without `app_config` do not restore the authentication method. The restore log reports that setup or authentication must be completed again.

## Restore during first run

A new, unconfigured installation can accept a backup through the first-run restore flow. Upload the export and wait for the background restore to finish before continuing setup.

After setup is complete, use the authenticated Backup page instead. First-run restore is intentionally unavailable once setup is complete.

## Move to another server

1. Record the running image version and save a verified JSON backup off-host.
2. Copy deployment files, environment secrets, and any required `config` files separately. Preserve `JWT_SECRET` if you want the same signing secret.
3. Start a fresh PostgreSQL instance and the same JellyGlance version on the new host using your saved deployment settings.
4. Restore the application backup during first run.
5. Update service URLs that changed and verify that the new container can reach Jellyfin and all integrations.
6. Check authentication, history, scheduled tasks, and proxy access before changing DNS or stopping the old deployment.
7. Keep the old installation and backup intact until you have verified the new one. Avoid running duplicate scheduled jobs during cutover.

Do not copy a live PostgreSQL data directory as though it were an ordinary folder. Use a PostgreSQL-aware backup process if you need a full database migration instead of the application export.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Backup reports no write permission | `BACKUP_DIR`, the bind mount, and ownership/permissions for the container's runtime user. |
| Export missing from the host | The actual configured backup path and its mount. |
| Upload rejected | The uploader accepts JSON files and has a 512 MiB file-size limit. Your proxy may impose a smaller limit. |
| `413` through the proxy | Adjust the proxy upload limit; see [reverse proxy](reverse-proxy.md). |
| Invalid JSON | Copy/download the export again; confirm it was not truncated. |
| Authentication changed after restore | `app_config` restores saved authentication settings. Use the restored provider or account. |
| Restore reports skipped fields | Inspect schema/version differences and logs before considering the restore complete. |
| Backup fails with a TLS-only database | See the database TLS limitation in [configuration](../reference/configuration.md#postgresql-tls). |
