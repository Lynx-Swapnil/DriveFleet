# DriveFleet — Car Rental Platform

A modern, full-stack car rental platform built with **Next.js 16**, **React 19**, **MongoDB**, and **Better Auth**.

🌐 **Live Site:** *[Update after deployment]*

---

## ✨ Features

- 🔐 Secure authentication (Email & Google OAuth)
- 🚙 Browse and filter cars by type, price, and availability
- 📅 Instant booking with flexible dates
- 👤 User dashboard for bookings and listings
- 🏗️ List and manage your own vehicles
- 🌓 Dark mode support
- 📱 Fully responsive design
- ⚡ Real-time notifications

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 16, React 19, TailwindCSS, HeroUI, Framer Motion
- **Backend:** Next.js API Routes, MongoDB, Better Auth
- **Authentication:** JWT, Google OAuth 2.0

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17+
- MongoDB Atlas account
- Google OAuth credentials (optional)

### Installation

```bash
git clone https://github.com/your-username/drivefleet.git
cd drivefleet
npm install
```

### Setup Environment Variables

Create `.env.local` in the project root:

```env
MONGODB_URI=mongodb+srv://...
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linter
```

---

## 🎯 Main Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page |
| `/explore-cars` | Browse cars |
| `/add-car` | List your car |
| `/my-bookings` | View bookings |
| `/my-added-cars` | Manage listings |
| `/signIn` | Login |
| `/signUp` | Register |

---

## 📝 License

MIT License — see LICENSE file for details.

---

## 📞 Support

For issues, please create a GitHub issue or contact support@drivefleet.com

---

**Built with ❤️ for car rental enthusiasts**
