# CodeBattle 🚀

A competitive programming platform with real-time code execution, comprehensive admin system, and cross-sword themed battles. Features a unified authentication system supporting both regular users and administrators with multi-language code execution support.

## 🎯 Features

### 🏠 User Features
- **Dashboard**: Personalized home page with coding questions, battles, and achievements
- **Coding Problems**: Solve programming challenges with real-time code execution
  - **100 Comprehensive Problems**: C++, Python, and Java starter code with detailed descriptions
  - **Perfect Starter Snippets**: No main functions, minimal includes, ready-to-code templates
  - **Enhanced Problem Descriptions**: Examples, approaches, and complexity analysis for each problem
  - **Comprehensive Test Cases**: Visible and hidden test cases with detailed explanations
- **Enhanced Terminal**: 
  - Color-coded output (red for errors, green for success, yellow for warnings)
  - Error indicators and detailed execution logs
  - Toggle terminal visibility
  - Auto-scroll and clear functionality
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
- **Icon System**: Custom SVG icons including cross-swords for battles
- **Profile Icons**: 12+ predefined icons plus custom image upload
- **Enhanced Terminal**: Professional terminal interface with syntax highlighting

 - **Aptitude Challenge (New)**:
    - Fast MCQ mode with difficulty selection (Easy/Medium/Hard)
    - 3 wrong answers = out; score based leaderboard potential
    - Accessible from Home quick actions and Battles page CTA
    - Friend/matchmaking rooms planned (MVP ships solo + matching animation)
- **Firebase Authentication**: Secure email/password login
 **Multi-language Support**: Python, C++, Java
- **Protected Routes**: Separate access for admin and user areas
- **Session Management**: Persistent login with secure logout
│   │   ├── AptitudeChallenge.tsx # Aptitude MCQ challenge mode

 - **Aptitude Challenge**: New mode with difficulty selector, matching animation, and 3-wrong-out rule
 - **Home/Battles UI**: Added CTA for Aptitude; improved matching overlay and single-active-battle enforcement
 - **Profile**: Recent achievements now show latest unlocked ones reliably
 - **Achievements**: Expanded achievements catalog for user motivation
### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Monaco Editor** - Professional code editor (VS Code-like)
- **Lucide React** - Beautiful icon library
- **React Router DOM v6** - Client-side routing

### Backend & Services
- **Firebase** - Authentication and Firestore database
- **Node.js/Express** - Code execution service
- **Docker** - Containerized backend deployment
- **Render** - Backend hosting platform
- **Vercel** - Frontend hosting platform

### Code Execution System
- **Multi-language Support**: Python, C++, Java
- **Real-time Execution**: Sandboxed code execution with timeouts
- **Test Case Validation**: Automatic validation against expected outputs
- **Error Handling**: Detailed compilation and runtime error reporting
- **Security**: Isolated execution environments with memory limits

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Python (for Python code execution)
- GCC/G++ (for C++ code execution)
- Java JDK (for Java code execution)

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

4. **Start the code execution backend** (in a new terminal)
   ```bash
   # Windows
   start-backend.bat
   
   # Unix/Linux/Mac
   chmod +x start-backend.sh
   ./start-backend.sh
   
   # Or manually:
   cd backend
   npm install
   npm run dev
   ```

5. **Start the frontend development server** (in another terminal)
   ```bash
   npm start
   ```

6. **Access the application**
   - **User Portal**: `http://localhost:3000/dashboard`
   - **Admin Portal**: `http://localhost:3000/admin/dashboard`
   - **Login**: `http://localhost:3000/login`
   - **Code Execution Backend**: `http://localhost:5111`

## 🌐 Live Deployment

### Frontend (Vercel)
- **URL**: `https://code-battle-pup5kg6m3-praveen-kumars-projects-81ba3472.vercel.app`
- **Status**: ✅ Live and fully functional
- **Features**: All user features, enhanced terminal, responsive design

### Backend (Render)
- **URL**: `https://codebattle-backend-bvzj.onrender.com`
- **Status**: ✅ Live and operational
- **Features**: Multi-language code execution, test case validation, error handling

### Backend Status Monitoring
The frontend includes real-time backend status indicators:
- 🟢 **Online**: Backend is running and ready for code execution
- 🔴 **Offline**: Backend is not available
- 🟡 **Checking**: Checking backend status

## 🔧 Configuration

### Code Execution System

The platform includes a production-ready code execution system:

#### Supported Languages
- **Python**: Direct execution with `python` command
- **C++**: Compiled with `g++` and executed

- **Java**: Compiled with `javac` and executed with `java`

#### Features
- **Real-time Execution**: Code runs in isolated Docker environments
- **Test Case Validation**: Automatic validation against expected outputs
- **Problem-specific Handlers**: Custom validation logic for different problem types
- **Security**: Sandboxed execution with timeouts and memory limits
- **Enhanced Error Handling**: Detailed error messages for compilation and runtime errors
- **Terminal Output**: Professional terminal interface with color-coded messages

#### Testing the Backend
```bash
cd backend
npm test
```

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
CodeBattle/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx      # Main navigation
│   │   ├── AdminNavbar.tsx # Admin navigation
│   │   ├── LoadingSpinner.tsx
│   │   ├── CrossSwords.tsx # Custom battle icon
│   │   └── ProfileIcons.tsx # Profile icon system
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx # User authentication
│   │   ├── AdminAuthContext.tsx # Admin authentication
│   │   └── ThemeContext.tsx # Theme management
│   ├── pages/              # Application pages
│   │   ├── Landing.tsx     # Landing page
│   │   ├── Home.tsx        # User dashboard
│   │   ├── Login.tsx       # Unified login
│   │   ├── Profile.tsx     # User/admin profile
│   │   ├── CodingProblem.tsx # Problem solving with enhanced terminal
│   │   ├── Battles.tsx     # Battle interface
│   │   ├── Leaderboard.tsx # Rankings
│   │   ├── Friends.tsx     # Social features
│   │   ├── Problems.tsx    # Problem list
│   │   ├── Achievements.tsx # User achievements
│   │   └── admin/          # Admin pages
│   ├── types/              # TypeScript definitions
│   ├── firebase/           # Firebase configuration
│   ├── data/               # Static data and problem bank
│   ├── utils/              # Utility functions including code execution service
│   └── index.css           # Global styles
├── backend/                # Code execution service
│   ├── server.js           # Express server
│   ├── services/           # Code execution logic
│   ├── Dockerfile          # Docker configuration
│   └── render.yaml         # Render deployment config
├── public/                 # Static assets
│   ├── logo.svg            # App logo
│   ├── manifest.json       # PWA manifest
│   └── index.html          # HTML template
├── vercel.json             # Vercel deployment config
└── package.json            # Dependencies and scripts
```

## 🎮 User Journey

### Visitors (Non-Authenticated)
1. **Land on** `/` (landing page) - showcases platform features
2. **Browse Problems** at `/problems` - view available coding challenges
3. **Login/Signup** at `/login` to access full features

### Regular Users
1. **Register/Login** at `/login`
2. **Redirected** to `/dashboard` (user home)
3. **Access Features**:
   - Solve coding problems with enhanced terminal
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
- **Terminal**: Dark theme with syntax highlighting

### Light Theme
- **Background**: Gradient white
- **Surface**: Light gray
- **Text**: Black with dark yellow emojis
- **Accents**: Blue gradients
- **Terminal**: Light theme with syntax highlighting

## 🔐 Security Features

- **Role-Based Access Control**: Separate admin and user contexts
- **Route Protection**: Automatic redirects based on permissions
- **Superadmin Protection**: Cannot be demoted or deleted
- **Session Management**: Secure authentication state
- **Input Validation**: Form validation and sanitization
- **Code Execution Security**: Sandboxed environments with timeouts

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Environment Variables** (Vercel Dashboard)
   ```env
   REACT_APP_BACKEND_URL=https://codebattle-backend-bvzj.onrender.com
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

### Backend Deployment (Render)

1. **Create Web Service** in Render dashboard
2. **Connect Repository**: Point to your GitHub repo
3. **Root Directory**: `backend/`
4. **Environment**: Docker
5. **Health Check Path**: `/health`
6. **Environment Variables**:
   ```env
   PORT=5111
   NODE_ENV=production
   CORS_ORIGIN=https://your-vercel-frontend-url.vercel.app
   ```

### Alternative Backend Hosting Options

For free hosting without offline issues, consider:

1. **Railway** - Generous free tier with no sleep mode
2. **Fly.io** - Free tier with global deployment
3. **Heroku** - Eco dynos (sleep after 30min inactivity)
4. **Deta** - Free Node.js hosting
5. **Glitch** - Collaborative coding platform

## 🐛 Recent Fixes

### ✅ Fixed Issues
- **Reset Button**: Now properly resets code, terminal, and test results
- **Logo Loading**: Fixed missing PNG references in manifest.json
- **Terminal Enhancement**: Added color-coded output and error indicators
- **Backend Connection**: Stable connection to Render backend
- **Error Handling**: Improved error messages and user feedback

### 🆕 New Features
- **Enhanced Terminal**: Professional terminal interface with syntax highlighting
- **Error Indicators**: Visual indicators for compilation and runtime errors
- **Toggle Terminal**: Show/hide terminal output
- **Color-coded Output**: Red for errors, green for success, yellow for warnings
- **Auto-scroll**: Automatic scrolling to terminal when errors occur

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
- **Monaco Editor** for professional code editing
- **Render** for reliable backend hosting
- **Vercel** for fast frontend deployment

---

**Ready to battle?** 🚀 Start coding, compete, and climb the leaderboards!

*Built with ❤️ for the coding community*

**Live Demo**: [https://code-battle-pup5kg6m3-praveen-kumars-projects-81ba3472.vercel.app](https://code-battle-pup5kg6m3-praveen-kumars-projects-81ba3472.vercel.app) 