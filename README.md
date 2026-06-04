# QR Nexus

Static Firebase web app for traffic document management. Users store their vehicle docs as an encrypted QR code; officers scan and verify on the spot.

## Quick start (local)

1. Double-click **`start.bat`** — it starts a local HTTP server on port 8000 and opens your browser to `http://localhost:8000`.
2. The login page is the entry point. Sign up with any email, verify it, then log in.

> Firebase Auth and Storage do **not** work over `file://`. You must open the app through a local web server.

## Project structure

```
index.html                 <- Login / Register
admin/                     <- Officer-only pages (requires admin email)
  adminhome.html
  qr_code_scanner.html     <- Camera-based QR scanner
  scan_history.html
  docuverification.html    <- Search user by email
  settings.html
user/                      <- Citizen pages
  userhome.html
  getqr.html               <- Fill form + generate encrypted QR
  qrcode.html              <- Display + download QR
  share.html
  profile.html
  aboutus.html
  contactus.html
```

## How the encryption works

- The user's traffic data (DL, RC, Pollution, Phone, document URL) is **AES-encrypted** with a fixed project key before being placed inside the QR code.
- The officer's scanner **decrypts** the same key to read it.
- The encrypted blob is also stored at `users/{uid}/lastQrCodeData` so the user can re-display their QR.
- A clear-text copy of every entry is stored at `users/{uid}/trafficdata/{id}` so admins can search by email.

## Admin accounts

The following two emails are treated as officers (set in code, in the `adminEmails` array in every page):

- `chintuvenkatreddy13@gmail.com`
- `gcharanyadav23@gmail.com`

To add a new admin, add the email to the `adminEmails` array in **every** HTML file (or refactor to a shared config file — see TODOs).

## Firebase config

Firebase config is duplicated in every HTML file (no build step, no bundler). If you want to point at a different Firebase project, search-and-replace the `firebaseConfig` object in all 11 files. A `firebase.json` + `database.rules.json` + `storage.rules` are included for `firebase deploy`.

## Deployment to Firebase Hosting

```sh
npm install -g firebase-tools
firebase login
firebase deploy
```

This deploys hosting, database rules, and storage rules in one go.
