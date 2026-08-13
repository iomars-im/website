# IOMARS CMS - Auth0 Setup Guide

This guide will walk you through setting up Auth0 authentication for the IOMARS CMS, allowing committee members to log in with simple username/password credentials.

> **Optional.** The CMS backend is Netlify Identity plus Git Gateway (`backend: git-gateway` in
> `public/admin/config.yml`), set up in `CMS_SETUP.md`. Auth0 is an optional external login
> provider layered on that, for committee members who would rather use an email and password
> than a GitHub account. Start with `CMS_SETUP.md`.

## Step 1: Install Auth0 Extension in Netlify

1. Go to the Auth0 extension page: https://app.netlify.com/extensions/auth0
2. Click **Install** on the Auth0 extension
3. Select your **IOMARS site** from the dropdown
4. Click **Continue to Auth0**

## Step 2: Create Auth0 Account (if needed)

If you don't have an Auth0 account:
1. Sign up at https://auth0.com
2. Create a new tenant (you can name it "iomars" or similar)
3. Complete the basic setup

## Step 3: Configure Auth0 in Netlify

After installing the extension:
1. You'll be redirected to Auth0's configuration page
2. The extension will automatically configure:
   - Application settings
   - Callback URLs
   - Allowed origins
3. Click **Save** to complete the setup

## Step 4: Enable Git Gateway in Netlify

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your IOMARS site
3. Go to **Site settings** → **Identity**
4. Click **Enable Identity** (if not already enabled)
5. Scroll down to **Services** section
6. Click **Enable Git Gateway**

## Step 5: Configure Identity Settings

In Netlify Identity settings:
1. Under **Registration**, select **Invite only**
2. Under **External providers**, enable **Auth0**
3. The Auth0 extension should auto-configure the connection

## Step 6: Add Users

### Option A: Via Netlify Dashboard
1. Go to the **Identity** tab in Netlify
2. Click **Invite users**
3. Enter committee member's email
4. They'll receive an invitation email

### Option B: Via Auth0 Dashboard
1. Go to your Auth0 dashboard: https://manage.auth0.com
2. Go to **User Management** → **Users**
3. Click **Create User**
4. Enter:
   - Email address
   - Password (you can let them change it later)
   - Connection: Username-Password-Authentication
5. Click **Create**

## Step 7: Committee Members Log In

1. Committee members go to: https://www.iomars.im/admin/
2. Click **Login**
3. Enter their email and password
4. They can now add/edit news articles

## Managing Users

### Add a new user:
- Via Netlify: **Identity** tab → **Invite users**
- Via Auth0: **User Management** → **Users** → **Create User**

### Remove a user:
- Via Netlify: **Identity** tab → Find user → **Delete**
- Via Auth0: **User Management** → **Users** → Find user → **Delete**

### Reset password:
- Via Auth0: **User Management** → **Users** → Find user → **Actions** → **Change Password**

## Security Best Practices

1. **Use strong passwords**: Require at least 8 characters with mixed case and numbers
2. **Enable MFA** (optional): In Auth0 settings → Security → Multi-factor Auth
3. **Invite only**: Keep registration set to "Invite only" to prevent unauthorized access
4. **Regular audits**: Periodically review user list and remove inactive members

## Troubleshooting

### "Cannot connect to Git Gateway"
- Make sure Git Gateway is enabled in Netlify (Site settings → Identity → Services)
- Check that Auth0 extension is properly installed

### "Authentication failed"
- Verify user exists in Auth0 dashboard
- Check password is correct
- Ensure user's email is verified

### "Permission denied"
- User needs to be invited via Netlify Identity
- Check Auth0 user has proper permissions

## Cost

Auth0 Free Tier includes:
- Up to 7,000 active users
- Unlimited logins
- Social login providers
- Username/password authentication
- Email/password reset

This is more than enough for a radio club!

## Support

- **Auth0 Documentation**: https://auth0.com/docs
- **Netlify Auth0 Extension**: https://docs.netlify.com/integrations/auth0/
- **Decap CMS**: https://decapcms.org/docs/
- **Site issues**: Contact 2D0PEY@qsl.net
