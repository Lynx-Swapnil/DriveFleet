# 🚗 DriveFleet — Premium Car Rental Platform

**DriveFleet** is a modern, full-stack car rental platform built with **Next.js 16**, **React 19**, **MongoDB**, and **Better Auth**. Rent premium vehicles seamlessly with instant booking, secure authentication, and a sleek user interface.

🌐 **Live Site:** [https://drivefleet.vercel.app](https://drivefleet.vercel.app)

---

## ✨ Key Features

- **🔐 Secure Authentication**: JWT-protected email/password authentication and Google OAuth integration with Better Auth
- **🚙 Browse & Filter Cars**: Advanced search and filtering by car type, price, and availability
- **📅 Instant Booking**: Book your dream car in minutes with flexible date selection and special instructions
- **👤 User Dashboard**: Manage your bookings, added cars, and rental history
- **🏗️ Car Listing**: List your own vehicles for rent with detailed information and images
- **🌓 Dark Mode**: Complete dark mode support for a comfortable browsing experience
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **⚡ Real-time Updates**: Live booking status and instant confirmations
- **🛡️ Security First**: Encrypted credentials, secure API routes, and CORS protection

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TailwindCSS 4
- Framer Motion (animations)
- HeroUI (component library)
- React Hot Toast (notifications)

**Backend:**
- Next.js API Routes
- MongoDB
- Better Auth (authentication)
- MongoDB Adapter

**Authentication:**
- JWT Tokens
- Better Auth
- Google OAuth
- Email/Password

---

## 📋 Prerequisites

- Node.js 18.17 or higher
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials (optional, for social login)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/drivefleet.git
cd drivefleet
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/driveFleet

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Public App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📦 Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint

---

## 📂 Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── page.js              # Home page
│   ├── add-car/             # Car listing page
│   ├── explore-cars/        # Browse cars page
│   ├── my-bookings/         # User bookings
│   ├── my-added-cars/       # Manage added cars
│   ├── signIn/              # Login page
│   ├── signUp/              # Registration page
│   └── api/                 # API routes
├── components/              # React components
├── lib/                     # Utilities and libraries
└── public/                  # Static assets
```

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `BETTER_AUTH_SECRET` | Secret key for JWT signing |
| `BETTER_AUTH_URL` | Base URL for Better Auth |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXT_PUBLIC_APP_URL` | Public app URL |

---

## 🎯 Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page |
| `/explore-cars` | Browse all cars |
| `/explore-cars/[id]` | Car details |
| `/add-car` | Add new car listing |
| `/my-bookings` | View user bookings |
| `/my-added-cars` | Manage added cars |
| `/signIn` | User login |
| `/signUp` | User registration |

---

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import the repository
4. Add environment variables in Vercel dashboard
5. Click "Deploy"

### Deploy on Render

1. Connect your GitHub repository
2. Set environment variables
3. Deploy from the Render dashboard

---

## 🧪 Testing

- Test all routes for errors on reload
- Verify logged-in users don't redirect on private route reload
- Test responsive design on mobile/tablet/desktop
- Verify all toast notifications work properly
- Test error handling for failed API requests

---

## 📝 Security Features

- ✅ JWT-based authentication
- ✅ Secure cookie handling
- ✅ MongoDB credentials secured with environment variables
- ✅ CORS protection
- ✅ Input validation
- ✅ Session management

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support

For support, please create an issue on the GitHub repository or contact support@drivefleet.com

---

**Built with ❤️ for car rental enthusiasts**
