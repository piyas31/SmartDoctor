
```
smartdoctor
├─ .dist
├─ .eslintrc
├─ actions
│  ├─ admin.js
│  ├─ appointments.js
│  ├─ credits.js
│  ├─ doctor.js
│  ├─ doctors-listing.js
│  ├─ onboarding.js
│  ├─ patient.js
│  └─ payout.js
├─ app
│  ├─ (auth)
│  │  ├─ layout.js
│  │  ├─ sign-in
│  │  │  └─ [[...sign-in]]
│  │  │     └─ page.jsx
│  │  └─ sign-up
│  │     └─ [[...sign-up]]
│  │        └─ page.jsx
│  ├─ (main)
│  │  ├─ admin
│  │  │  ├─ components
│  │  │  │  ├─ pending-doctors.jsx
│  │  │  │  ├─ pending-payouts.jsx
│  │  │  │  └─ verified-doctors.jsx
│  │  │  ├─ layout.js
│  │  │  └─ page.jsx
│  │  ├─ appointments
│  │  │  └─ page.jsx
│  │  ├─ doctor
│  │  │  ├─ layout.js
│  │  │  ├─ page.jsx
│  │  │  ├─ verification
│  │  │  │  └─ page.jsx
│  │  │  └─ _components
│  │  │     ├─ appointments-list.jsx
│  │  │     ├─ availability-settings.jsx
│  │  │     └─ doctor-earnings.jsx
│  │  ├─ doctors
│  │  │  ├─ components
│  │  │  │  └─ doctor-card.jsx
│  │  │  ├─ layout.js
│  │  │  ├─ page.jsx
│  │  │  └─ [specialty]
│  │  │     ├─ page.jsx
│  │  │     └─ [id]
│  │  │        ├─ layout.js
│  │  │        ├─ page.jsx
│  │  │        └─ _components
│  │  │           ├─ appointment-form.jsx
│  │  │           ├─ doctor-profile.jsx
│  │  │           └─ slot-picker.jsx
│  │  ├─ layout.jsx
│  │  ├─ onboarding
│  │  │  ├─ layout.js
│  │  │  └─ page.jsx
│  │  ├─ pricing
│  │  │  └─ page.jsx
│  │  └─ video-call
│  │     ├─ hms-wrapper.jsx
│  │     ├─ page.jsx
│  │     └─ video-call-ui.jsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.js
│  └─ page.js
├─ components
│  ├─ appointment-card.jsx
│  ├─ header.jsx
│  ├─ page-header.jsx
│  ├─ pricing.jsx
│  ├─ providers.jsx
│  ├─ theme-provider.jsx
│  └─ ui
│     ├─ alert.jsx
│     ├─ badge.jsx
│     ├─ button.jsx
│     ├─ card.jsx
│     ├─ dialog.jsx
│     ├─ input.jsx
│     ├─ label.jsx
│     ├─ select.jsx
│     ├─ separator.jsx
│     ├─ sonner.jsx
│     ├─ tabs.jsx
│     └─ textarea.jsx
├─ components.json
├─ eslint.config.mjs
├─ hooks
│  └─ use-fetch.js
├─ jsconfig.json
├─ lib
│  ├─ checkUser.js
│  ├─ data.js
│  ├─ prisma.js
│  ├─ schema.js
│  ├─ specialities.js
│  └─ utils.js
├─ middleware.js
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ prisma
│  ├─ migrations
│  │  ├─ 20250515081608_create_modal
│  │  │  └─ migration.sql
│  │  ├─ 20250517054209_credits
│  │  │  └─ migration.sql
│  │  ├─ 20250517064915_vr
│  │  │  └─ migration.sql
│  │  ├─ 20250520101140_update_appointments
│  │  │  └─ migration.sql
│  │  ├─ 20250527063022_payout
│  │  │  └─ migration.sql
│  │  ├─ 20250527071527_update_payout
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
└─ public
   ├─ banner.png
   ├─ banner2.png
   └─ smrtdr.png

```