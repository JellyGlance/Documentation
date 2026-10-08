# ![Newsletter](../icons/brands/email-outline.svg){ .page-brand } Newsletter and SMTP

Send a house digest, or a per-user email of continue watching, requests, and recently added titles.

## Before you begin

- Jellyfin is connected and the first sync has finished, so the digest has library data to include.
- You can sign in to JellyGlance with permission to manage settings.
- You have SMTP credentials from your mail provider: host, port, username, and password.

## Configure SMTP

1. Open **Settings → Newsletter**.
2. Open the SMTP tab.
3. Enter the SMTP host, port, username, and password.
4. Set the sender name and sender email.
5. Turn on **Use implicit TLS** when the provider uses SMTPS (often port `465`). Leave it off for STARTTLS on port `587`.
6. Leave **Verify TLS certificates** on unless the provider uses a private certificate you have decided to trust.
7. Save, then send a test message to an address you can read.

## Build a digest

Use the report builder to choose blocks such as recently added media, watch stats, and repair status. Preview the message before a real send. Weekly and monthly schedules, manual sends, and send history are on the same Newsletter page.

Per-user campaigns email each opted-in Jellyfin user their own continue watching, requests, and recently added titles. A house digest goes to the recipient list you configure.

## If mail does not arrive

| Symptom | Next check |
| --- | --- |
| Authentication failed | Username, password, and whether the provider wants an app password. |
| Connection timed out | Host and port reachable from the JellyGlance container, not only from your browser. |
| Certificate error | TLS mode matches the port. Implicit TLS is the `465` style. |
| Test succeeds, scheduled mail does not | The campaign is enabled, recipients are set, and the schedule has passed. Check send history on the Newsletter page. |
