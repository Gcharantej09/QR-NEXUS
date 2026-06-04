# QR Nexus - Project Handoff Summary

> **Use this file to resume work in a fresh AI session.** Just paste the contents into the first message.

---

## Project Location
`d:\project reveiw\qr-nexus-FINAL\qr-nexus-final\`

## Firebase Project
- **Project ID:** `qr-nexus-81938`
- **Auth Domain:** `qr-nexus-81938.firebaseapp.com`
- **RTDB URL:** `https://qr-nexus-81938-default-rtdb.asia-southeast1.firebasedatabase.app`
- **Storage Bucket:** `qr-nexus-81938.firebasestorage.app`

## Admin Emails
Hard-coded in the `adminEmails` array in every page:
- `chintuvenkatreddy13@gmail.com`
- `gcharanyadav23@gmail.com`

## AES Encryption Key
`66MXNJUNXTH` - used to encrypt/decrypt QR data (must match between generator and scanner)

## Project Structure (18 pages)
```
qr-nexus-final/
|-- index.html                   <- Login (User/Officer tabs) - REDESIGNED with Digital Bharat
|-- design-system.css            <- "Digital Bharat" shared styles
|-- firebase.json, storage.rules, database.rules.json
|-- README.md, start.bat
|-- HANDOFF.md                   <- this file
|-- admin/
|   |-- adminhome.html           <- Dashboard + station selector + watchlist badge
|   |-- qr_code_scanner.html     <- Camera + upload + GPS + flag button
|   |-- scan_history.html        <- Per-user expandable + flag + map links
|   |-- watchlist.html           <- Track suspects, auto-challan
|   |-- docuverification.html    <- Email search
|   |-- settings.html
|-- user/
    |-- userhome.html            <- Dashboard with challan badge
    |-- getqr.html               <- Form + GPS + async file upload
    |-- qrcode.html              <- Display + download QR
    |-- share.html
    |-- schemes.html             <- 18 govt schemes
    |-- twowheeler_license.html  <- License application
    |-- my_vehicles.html         <- Multi-vehicle manager
    |-- challans.html            <- View/pay/dispute
    |-- profile.html
    |-- aboutus.html
    |-- contactus.html
```

## Firebase Database Schema
```
users/{uid}                    -> { email, isAdmin, createdAt, trafficdata/{id}, lastQrCodeData, lastQrId }
vehicles/{uid}/{vid}           -> Vehicle details
challans/{uid}/{cid}           -> { violationType, amount, status, issuedBy, ... }
watchlist/{officerUid}/{userUid} -> Flag info
licenseApplications/{uid}/{id}   -> License app data
applications/{uid}/{id}         -> Govt scheme applications
scanHistory/{officerUid}/{userUid}/{scanId} -> GPS-tagged scans
officers/{uid}                  -> { station }
```

## Design System ("Digital Bharat")
- **Colors:** Saffron (#FF6B00), Green (#138808), Ashoka Navy (#000080)
- **Fonts:** Space Grotesk (display), Inter (body), Mukta (Hindi), JetBrains Mono (numbers)
- **Animations:** fadeIn, scaleIn, shake, pulse, glow, ripple effect on buttons
- **Accessibility:** 16px min font, 48px touch targets, focus-visible outlines, reduced-motion support
- **Features:** toasts, ripple effects, animated tab slider, glass morphism
- **Import:** `<link rel="stylesheet" href="design-system.css">` in `<head>`

## How to Run Locally
```bash
cd "d:\project reveiw\qr-nexus-FINAL\qr-nexus-final"
npx http-server -p 8000 -c-1
```
Open **http://localhost:8000**

## What is Working
- Citizen + Officer dual login (User tab = citizen, Officer tab = admin-only)
- GPS capture (citizen's location embedded in QR; officer's location at scan)
- Watchlist with flag/unflag + auto-challan for implied >100 km/h speed
- 18 govt schemes with apply form
- 2W license application form (LL with gear/without gear, permanent DL)
- Multi-vehicle management (add/edit/delete, insurance/PUC/fitness tracking)
- Challan system (view / pay via UPI/Card/NetBanking demo / dispute)
- Camera + image upload fallback for QR scanning
- Officer station/division selector (saved to DB)
- 18 pages, all serving HTTP 200

## Pending Visual Updates
The login page (index.html) and the shared `design-system.css` are using the new "Digital Bharat" system. The following pages still use older styles and would benefit from being redesigned:
- [ ] `user/userhome.html` - Dashboard
- [ ] `admin/adminhome.html` - Officer Dashboard
- [ ] `user/getqr.html` - Form
- [ ] `user/qrcode.html` - QR display
- [ ] `user/schemes.html` - Schemes
- [ ] `user/twowheeler_license.html` - License form
- [ ] `user/my_vehicles.html` - Vehicles
- [ ] `user/challans.html` - Challans
- [ ] `admin/qr_code_scanner.html` - Scanner
- [ ] `admin/scan_history.html` - History
- [ ] `admin/watchlist.html` - Watchlist
- [ ] `admin/docuverification.html` - Verify
- [ ] `admin/settings.html` - Settings
- [ ] `user/profile.html` - Profile
- [ ] `user/share.html` - Share
- [ ] `user/aboutus.html` - About
- [ ] `user/contactus.html` - Contact

To update a page: add `<link rel="stylesheet" href="design-system.css">` to `<head>` and start using the design tokens (`--primary`, `btn btn-primary`, `card`, `input-group`, etc.).

## Known Issues
- Old `fileUrl` records in Firebase point to dead domain `https://qr-nexus.za.com/...` - old documents won't display. The scanner shows a fallback message with the original link.
- New scans upload to the correct Firebase Storage bucket (`firebasestorage.app`).

## Future Enhancements (not started)
1. Hindi/regional language toggle
2. Dark mode toggle
3. Voice input for low-literacy users
4. Admin can issue challans with photo evidence
5. Multi-language support
6. Offline mode (Service Worker)
7. PWA install (Add to Home Screen)

## Quick-Resume Prompt
To resume work in a new session, paste this:

> "I'm continuing work on the QR Nexus project at `d:\project reveiw\qr-nexus-FINAL\qr-nexus-final\`. Please read `HANDOFF.md` first to understand the current state, then ask me what to do next."

## Last session status
Right before the break, we had:
- Built the "Digital Bharat" design system (saffron/green/navy, modern animations, glass morphism)
- Redesigned `index.html` (login) with the new system
- Designed `design-system.css` as a shared stylesheet
- 17 other pages still need to be ported to the new design

**Next step on resume:** Apply the Digital Bharat design system to `user/userhome.html` (citizen dashboard) and `admin/adminhome.html` (officer dashboard) first, as those are the two main entry points after login.
