# ![Jellyfin](../icons/selfhst/jellyfin.svg){ .page-brand } Authentication and permissions

Choose how people sign in during first setup. Review authentication settings later under **Settings → Security**, and manage accounts and assigned roles on the **Users** page.

## Choose a login method

| Method | Best fit | What it needs |
| --- | --- | --- |
| Jellyfin Quick Connect | People who already have Jellyfin accounts | A working Jellyfin connection and approval from the user's Jellyfin account |
| Local accounts | An administrator or user who needs a JellyGlance-specific login | A local username, password, and assigned role |
| OIDC | An existing identity provider | Issuer URL, client ID, provider-appropriate client secret, redirect URI, and a matching Jellyfin account |

Keep a tested administrative login available when changing authentication. Check the new method in a separate browser session before ending your existing session.

## Jellyfin Quick Connect

1. Choose **Jellyfin Login / Quick Connect** during setup or in Security settings.
2. Begin login from JellyGlance and use the displayed Quick Connect code.
3. Approve the request from your Jellyfin account.
4. Return to JellyGlance and wait for login to complete.

The initial setup approval requires a Jellyfin administrator. Subsequent logins use the user's assigned JellyGlance role. Without an explicit assignment, Jellyfin administrators default to **Admin** and other Jellyfin users to **Viewer**.

If approval fails, verify Jellyfin is reachable from the app container and that Quick Connect is available on the server.

## Local accounts

Choose **Local login** during setup and create the initial administrator. Manage additional local accounts and password resets from **Users**.

Assign the least access each account needs. A JellyGlance local password is separate from a Jellyfin password. Existing local accounts can coexist with Jellyfin-linked accounts.

For automated initial deployment, see the [local bootstrap variables](../reference/configuration.md#optional-first-run-bootstrap). Those variables are not the normal account-management interface.

## OIDC setup

The application implements an OIDC authorization-code login with PKCE and requests `openid profile email` scopes. Configure your identity provider before selecting OIDC in JellyGlance.

1. Create an OIDC client/application in your identity provider.
2. Register the redirect URI for your public JellyGlance hostname:

    ```text
    https://glance.example.com/auth/oidc/callback
    ```

3. Under **Settings → Security**, select OIDC and enter:

    | Field | Value |
    | --- | --- |
    | Issuer URL | The provider's issuer URL, not the login-page URL |
    | Client ID | The identifier assigned to your OIDC client |
    | Client Secret | The secret if required by that client's configuration |
    | Redirect URI | The exact callback registered at the provider |

4. Save the configuration and test login in a separate browser session.
5. Confirm the signed-in account is associated with the intended Jellyfin user and has the intended JellyGlance role.

The backend must reach the provider's discovery and token endpoints. When behind a proxy, preserve the public host and protocol; see [reverse proxy](../operations/reverse-proxy.md). These callback instructions assume a dedicated hostname without a subpath.

### Match OIDC identities to Jellyfin

OIDC login requires an existing Jellyfin user. The application compares Jellyfin usernames, ignoring case and surrounding whitespace, against these claims:

- `jellyfin_username` or `jellyfin_user`
- `username`, `preferred_username`, `nickname`, or `name`
- `email` or the part of `email` before `@`

Use a deliberate username claim mapping so identity-provider names match the intended Jellyfin account. An unmatched account is rejected with **No Jellyfin user matches this OIDC account**.

OIDC provider groups do not automatically set JellyGlance roles in the inspected login implementation. The application uses the assigned JellyGlance role, otherwise **Admin** for a Jellyfin administrator or **Viewer** for another matched user. A Disabled account cannot sign in.

## Default role permissions

These are the built-in permission defaults. Saved role overrides can change most roles; endpoint-specific checks may impose additional restrictions. Owner and Disabled use fixed defaults.

| Permission | Owner / Admin | Manager | Viewer | Household | Disabled |
| --- | --- | --- | --- | --- | --- |
| Dashboard access | Yes | Yes | Yes | Yes | No |
| Admin Home | Yes | Yes | Yes | No | No |
| My Glance | Yes | Yes | Yes | Yes | No |
| Requests | Yes | Yes | Yes | Yes | No |
| Downloads | Yes | Yes | No | No | No |
| Repair | Yes | No | No | No | No |
| Users | Yes | Yes | No | No | No |
| Settings | Yes | No | No | No | No |
| API keys | Yes | No | No | No | No |

A page permission does not guarantee every action on that page. Integration-dependent pages still require the associated service to be configured. The Household role is suited to personal media views without admin Home access.

## Sessions and API keys

`JWT_SECRET` signs application login tokens. Preserve it across restarts; changing it invalidates existing tokens. A backup of application settings does not replace a backup of this environment value.

Dashboard integrations use a **JellyGlance API key** from **Settings → API Key**, sent in the `x-api-token` header. It is separate from both browser login and your Jellyfin API key. See [widget authentication and scopes](../operations/widgets.md).

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Quick Connect cannot finish first setup | Approve using a Jellyfin administrator. |
| OIDC discovery fails | Correct issuer URL, backend network access, and a trusted HTTPS certificate. |
| OIDC redirect mismatch | Provider and JellyGlance use exactly the same callback URL, scheme, hostname, and path. |
| No Jellyfin user matches | The returned username claims match an actual Jellyfin username. |
| Account is disabled | Assigned role and dashboard permission in JellyGlance. |
| Everyone is logged out after deployment | `JWT_SECRET` did not change. |
| Requests or Downloads are missing | Both role permissions and matching integrations are configured. |
