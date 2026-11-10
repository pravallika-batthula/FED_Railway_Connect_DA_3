# RailConnect – Railway Reservation Website (DA-3)

**RailConnect** is a clean, responsive, and beginner-friendly Railway Reservation Clone Website built using Angular Standalone Components, Reactive Forms, Route Guards, LocalStorage persistence, and multi-language internationalization (i18n & l10n) supporting English, Telugu, and Hindi.

---

## 🌟 Key Features & Requirements Met

### 1. Technology Stack
- **Angular Standalone Components**: Fully modular standalone component architecture (no legacy NgModules).
- **Angular Reactive Forms**: Validated forms with custom validators (same station check, password confirmation match, 10-digit mobile, 10-digit PNR).
- **Angular Route Guards**: Functional `authGuard` protecting Ticket Booking and My Bookings.
- **LocalStorage Data Persistence**: Persistent users, session, and bookings state across browser refreshes.
- **Angular i18n & Localization (l10n)**:
  - Supports 3 languages: **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)**.
  - Navbar language selector with immediate UI re-rendering.
  - Regional date, time, and currency formatting (`₹`, `రూ.`).
  - Standard Angular translation files in XLIFF format (`src/locale/messages.xlf`, `messages.te.xlf`, `messages.hi.xlf`).

### 2. Design & UI
- White background with Dark Navy navigation bar (`#003366`).
- Standard blue buttons (`#0056b3`) and clean light-gray sections (`#f4f6f9`).
- Simple cards, responsive tables, and forms.
- Fully responsive across desktop, tablet, and mobile devices.

### 3. Application Pages
- **Home (`/home`)**: Welcome banner, quick train search with station dropdowns, search results with class selection, and feature highlights.
- **Train Search (`/search`)**: Dedicated search page with station dropdowns, quick popular routes, station swap button, and date selection.
- **Train Availability (`/availability`)**: Displays available trains with departure/arrival times, journey duration, class availability (SL, 3A, 2A), seat availability badges, and class filters.
- **Ticket Booking (`/booking`)**: Protected by `authGuard`. Dynamic passenger forms (FormArray) for multiple passengers (Name, Age, Gender), live total fare calculation, 10-digit PNR generation, and instant booking confirmation.
- **My Bookings (`/bookings`)**: Protected by `authGuard`. Shows all bookings for the logged-in user, view ticket details modal, and ticket cancellation with status updates in LocalStorage.
- **PNR Status (`/pnr-status`)**: Public 10-digit PNR enquiry with passenger seat details, booking status (CONFIRMED / CANCELLED), and demo sample PNR buttons for quick testing.
- **Login (`/login`)**: Email and password authentication with LocalStorage validation and quick demo login auto-fill.
- **Registration (`/register`)**: New user signup with full validation (duplicate email check, mobile pattern, password match) and LocalStorage persistence.

---

## 🚀 Demo Credentials & Sample PNRs

### Default Demo Accounts
| Email | Password | Role |
|---|---|---|
| `user@railconnect.com` | `user123` | Demo Traveler (has existing bookings) |
| `rahul@example.com` | `password123` | Registered User |

*You can also register any new user account via the Registration page!*

### Pre-seeded Sample PNRs for Testing PNR Status
- **`4821950346`** (Secunderabad ➔ Howrah, Falaknuma Express - CONFIRMED)
- **`6754210983`** (Secunderabad ➔ Visakhapatnam, Vande Bharat Express - CONFIRMED)
- **`1904738265`** (New Delhi ➔ Mumbai Central, Tejas Rajdhani - CANCELLED)

---

## 📁 Project Structure

```
railway-reservation/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── models.ts             # Interfaces for Train, User, Booking, Passenger, Station
│   │   ├── services/
│   │   │   ├── auth.service.ts       # Authentication & user state in LocalStorage
│   │   │   ├── auth.guard.ts         # CanActivateFn route guard for protected pages
│   │   │   ├── train.service.ts      # Station catalog & train search logic
│   │   │   ├── booking.service.ts    # Booking lifecycle, PNR generator, cancellation
│   │   │   └── language.service.ts   # i18n & l10n translations & regional formatters
│   │   ├── pipes/
│   │   │   └── translate.pipe.ts     # translate, localizedCurrency & localizedDate pipes
│   │   ├── home/                     # Home standalone component
│   │   ├── train-search/             # Train search standalone component
│   │   ├── train-availability/       # Train availability standalone component
│   │   ├── ticket-booking/           # Passenger booking standalone component
│   │   ├── bookings/                 # My Bookings standalone component
│   │   ├── pnr-status/               # PNR Status standalone component
│   │   ├── login/                    # Login standalone component
│   │   ├── register/                 # Register standalone component
│   │   ├── app.ts                    # Root component with responsive header & nav
│   │   ├── app.html                  # Root template
│   │   ├── app.css                   # Root styles
│   │   └── app.routes.ts             # Route configuration
│   ├── locale/
│   │   ├── messages.xlf              # XLIFF 1.2 source file (English)
│   │   ├── messages.te.xlf           # XLIFF 1.2 target file (Telugu)
│   │   └── messages.hi.xlf           # XLIFF 1.2 target file (Hindi)
│   ├── styles.css                    # Global railway theme & utilities
│   └── main.ts                       # Application entry point
├── angular.json
└── package.json
```

---

## 🛠️ How to Run & Test

Inside `railway-reservation/`:

### 1. Start the Dev Server
```bash
npm start
```
Navigate to `http://localhost:4200/`.

### 2. Build for Production
```bash
npm run build
```

### 3. Run Unit Tests
```bash
npm test -- --watch=false
```
All unit test suites pass cleanly.
