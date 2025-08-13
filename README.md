# CodeBattle 🚀

A competitive programming platform with a comprehensive admin system, where developers compete in coding battles, solve problems, and climb leaderboards. Features a unified authentication system supporting both regular users and administrators.

## 🎯 Features

### 🏠 User Features
- **Dashboard**: Personalized home page with coding questions, battles, and achievements
- **Coding Problems**: Solve programming challenges with real-time code execution
- **Battles**: Compete in 1v1 coding matches with cross-sword themed interface
- **Leaderboard**: Global rankings with seasonal rewards and achievements
- **Friends**: Add friends and see who's online
- **Profile Management**: 
  - Customize display name and profile icons
  - Upload custom profile images
  - View detailed statistics and achievements
  - Track XP progress and battle history

### 👑 Admin System
- **Unified Login**: Single login system for both users and admins
- **Role-Based Access**: Automatic redirection based on user role
- **Admin Dashboard**: Comprehensive user management interface
- **User Management**: 
  - View all registered users
  - Promote users to admin roles
  - Delete users and handle duplicates
  - Superadmin protection (cannot be demoted)
- **Content Management**:
  - Questions: Manage coding problems and test cases
  - Events: Create and edit tournaments and competitions
  - Rewards: Configure season rewards and achievements
  - Seasons: Manage competitive seasons with dates
- **Analytics**: Platform statistics and user insights
- **Settings**: Admin configuration and preferences
- **Profile Editing**: Admins can modify their own profiles

### 🎨 UI/UX Features
- **Dark/Light Theme**: Pure black dark theme with customizable light theme
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean, professional design with smooth animations
- **Icon System**: Custom SVG icons including cross-swords for battles
- **Profile Icons**: 12+ predefined icons plus custom image upload

### 🔐 Authentication & Security
- **Firebase Authentication**: Secure email/password login
- **Role-Based Routing**: Automatic redirection based on user permissions
- **Protected Routes**: Separate access for admin and user areas
- **Session Management**: Persistent login with secure logout

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Icons**: Lucide React + Custom SVG components
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with custom color schemes

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CodeBattle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config to `src/firebase/config.ts`

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Access the application**
   - **User Portal**: `http://localhost:3000/dashboard`
   - **Admin Portal**: `http://localhost:3000/admin/dashboard`
   - **Login**: `http://localhost:3000/login`

## 🔧 Configuration

### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create a Firestore database
5. Update `src/firebase/config.ts` with your project credentials

### Admin Setup
1. Navigate to `http://localhost:3000/admin/setup`
2. Create the initial superadmin account
3. Default credentials: `praveenraj786420@gmail.com` / `Praveen@88`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Main navigation
│   ├── AdminNavbar.tsx # Admin navigation
│   ├── LoadingSpinner.tsx
│   ├── CrossSwords.tsx # Custom battle icon
│   └── ProfileIcons.tsx # Profile icon system
├── contexts/           # React contexts
│   ├── AuthContext.tsx # User authentication
│   ├── AdminAuthContext.tsx # Admin authentication
│   └── ThemeContext.tsx # Theme management
├── pages/              # Application pages
│   ├── Home.tsx        # User dashboard
│   ├── Login.tsx       # Unified login
│   ├── Profile.tsx     # User/admin profile
│   ├── CodingProblem.tsx # Problem solving
│   ├── Battles.tsx     # Battle interface
│   ├── Leaderboard.tsx # Rankings
│   ├── Friends.tsx     # Social features
│   ├── Problems.tsx    # Problem list
│   ├── Achievements.tsx # User achievements
│   └── admin/          # Admin pages
│       ├── AdminDashboard.tsx
│       ├── AdminQuestions.tsx
│       ├── AdminEvents.tsx
│       ├── AdminRewards.tsx
│       ├── AdminSeasons.tsx
│       ├── AdminAnalytics.tsx
│       ├── AdminSettings.tsx
│       └── AdminSetup.tsx
├── types/              # TypeScript definitions
├── firebase/           # Firebase configuration
└── index.css           # Global styles
```

## 🎮 User Journey

### Regular Users
1. **Register/Login** at `/login`
2. **Redirected** to `/dashboard` (user home)
3. **Access Features**:
   - Solve coding problems
   - Participate in battles
   - View leaderboards
   - Manage profile
   - Add friends

### Administrators
1. **Login** at `/login` with admin credentials
2. **Automatically redirected** to `/admin/dashboard`
3. **Access Admin Features**:
   - Manage users and roles
   - Create/edit questions
   - Configure events and seasons
   - View analytics
   - Edit own profile

## 🎨 Theme System

### Dark Theme (Default)
- **Background**: Pure black (`#000000`)
- **Surface**: Dark slate (`#1a1a1a`)
- **Text**: White with yellow emojis
- **Accents**: Slate gradients

### Light Theme
- **Background**: Gradient white
- **Surface**: Light gray
- **Text**: Black with dark yellow emojis
- **Accents**: Blue gradients

## 🔐 Security Features

- **Role-Based Access Control**: Separate admin and user contexts
- **Route Protection**: Automatic redirects based on permissions
- **Superadmin Protection**: Cannot be demoted or deleted
- **Session Management**: Secure authentication state
- **Input Validation**: Form validation and sanitization

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Create a `.env` file:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Firebase** for scalable backend infrastructure
- **React & TypeScript** for robust frontend development
- **Tailwind CSS** for beautiful, responsive design
- **Lucide React** for comprehensive icon library
- **Framer Motion** for smooth animations

---

**Ready to battle?** 🚀 Start coding, compete, and climb the leaderboards!

*Built with ❤️ for the coding community* 