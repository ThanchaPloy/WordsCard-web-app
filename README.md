# 📚 Flashcard Web App

A modern web application for learning English vocabulary with flashcards. Built with React, Firebase, and Tailwind CSS following MVC architecture.

## ✨ Features

- **Google Sign-In** - Login with your Google account
- **Personal & Shared Cards** - Create personal vocabulary cards or learn from shared seed vocabulary
- **Smart Filtering** - Filter cards by category and level (A1-C2)
- **Dictionary Integration** - Auto-fetch word pronunciation and examples
- **Study Mode** - Interactive flashcard study session with progress tracking
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore)
- **Architecture**: MVC (Models, Views, Controllers)
- **API**: Free Dictionary API for word definitions

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project with:
  - Google Authentication enabled
  - Firestore Database configured

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/ThanchaPloy/WordsCard-web-app.git
cd WordsCard-web-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Firebase Configuration

**Create a `.env` file** in the root directory:
```bash
cp .env.example .env
```

**Edit `.env` and add your Firebase credentials:**
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**To get these credentials:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click your project
3. Click **Project Settings** (⚙️ icon)
4. Under **Your apps** section, copy your web config

### 4. Run the Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── context/           # React Context (Auth, Deck state)
├── controllers/       # Business logic
├── models/           # Firebase data operations
├── views/
│   ├── pages/        # Page components
│   └── components/   # Reusable UI components
├── hooks/            # Custom React hooks
├── constants.js      # App constants (categories, levels)
├── firebase.js       # Firebase configuration
└── App.jsx          # Main app component
```

## 🔐 Security Notes

⚠️ **Important:**
- **Never commit `.env` file** - It's in `.gitignore`
- Firebase config files should never be uploaded to GitHub
- The `.env` file will be gitignored by default

## 📚 Usage

### Login
1. Click "Login with Google" button
2. Authorize with your Google account

### Add Cards (Personal)
1. Click "Manage Deck" → "+ Add Card" tab
2. Enter English word → Click "🔍 Auto" to fetch definition
3. Add meaning in Thai, examples, category, and level
4. Click "+ Add Card" to save

### Study
1. Select category and level from filter options
2. Click a card set to start studying
3. Flip cards to see translations and examples

### View All Cards
1. Click "Manage Deck" → "📋 All Cards" tab
2. Search or filter cards
3. Edit or delete your personal cards

## 🐛 Troubleshooting

**Q: "Loading vocabulary…" message won't disappear**
- Check if `.env` file exists and Firebase credentials are correct
- Verify Firebase Firestore Database is initialized

**Q: Can't login with Google**
- Ensure Google Authentication is enabled in Firebase Console
- Check if your Firebase project allows Google Sign-in

**Q: Auto-fetch dictionary not working**
- The Free Dictionary API may be temporarily unavailable
- Try again or enter definitions manually

## 📝 License

This project is for educational purposes.

## 👥 Contributors

- Your Name / KMITL Web Programming Project

---

**Last Updated:** April 4, 2024
