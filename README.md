# Auspify Modern Web Application Dashboard

A high-performance, portfolio-grade SaaS dashboard built with **React.js 19**, **Vite**, **Recharts**, and **modern CSS3**. Designed and developed as part of **Task 6: Modern Web Application Dashboard – Frontend Developer Internship** at Auspify Technologies.

![Auspify Dashboard Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200)

---

## 🌟 Key Features

### 1. Modern SaaS UI / UX Design
- **Dual Themes**: Complete, persistent **Light Theme** (clean white cards, soft slate background, violet/indigo accents) and **Dark Theme** (midnight slate with glowing data highlights).
- **Glassmorphism & Micro-animations**: Elevation shadows, smooth hover transitions, card lift effects, and responsive layout scaling.
- **Custom Design Tokens**: Fluid typography via Google Fonts (*Plus Jakarta Sans*), customizable CSS variables, and cohesive HSL color palettes.

### 2. Comprehensive Navigation & Shell
- **Interactive Collapsible Sidebar**:
  - Logo branding with gradient badges
  - Multi-page navigation: **Overview**, **Analytics**, **Projects**, **Reports**, **Settings**
  - Active route indicator with smooth transitions
  - Cloud storage quota tracker widget
  - Mobile drawer toggle with blurred backdrop overlay
- **Global Top Navigation Bar**:
  - Global search field with `Ctrl+K` / `⌘K` keyboard shortcut and instant clear button
  - Theme toggle switch (Sun / Moon)
  - Functional **Notification Center** with read/unread status, badge count, and mark-as-read/clear-all actions
  - User **Profile Dropdown** with avatar, role, and quick links

### 3. Overview Dashboard & Telemetry
- **4 Real-time Stat Cards**:
  - *Total Projects* (with quarter summary)
  - *Active Projects* (with in-review telemetry)
  - *Completed Tasks* (with weekly velocity)
  - *Overall Progress* (with percentage and milestone status)
- Percentage trend pills (`+14.2% vs last month`) with dynamic direction icons.
- Visual mini progress bars with custom accent colors.
- Live team collaboration activity stream.

### 4. Interactive Analytics & Data Visualization (Recharts)
- **Monthly Activity Chart**: Smooth gradient-filled Area Chart tracking completed tasks and developer hours with responsive tooltips.
- **Sprint Performance Chart**: Dual-series Bar Chart comparing planned stories vs. actual delivered velocity.
- **Task Distribution Donut Chart**: Proportional split across *Completed*, *In Progress*, *In Review*, and *Backlog*.
- **Interactive Timeframe Switcher**: Instant data filtering across `7D`, `30D`, `90D`, and `1Y`.
- Fully responsive across desktop, tablet, and mobile screens using `ResponsiveContainer`.

### 5. Projects Portfolio Management
- **Dual Display Modes**: Seamless switcher between **Responsive Table View** and **Modern Card Grid View**.
- **Real-Time Search & Filtering**: Instant search by project name, category tag, or description.
- **Status Pills**: Filter by *All*, *In Progress*, *Completed*, or *On Hold*.
- **Interactive Controls**: Click to toggle project completion status dynamically.
- **Team Avatar Stacks**: Visual stacked team member indicators.
- **Modal Dialog**: Create new projects with form validation, category selection, budget, priority, and progress sliders.
- **Friendly Empty State**: Helpful reset button when no search criteria match.

### 6. Additional Dedicated Views
- **Analytics View**: Subsystem health matrix, p99 latency stats, test coverage, and security ratings.
- **Reports View**: Ready-to-export intelligence reports (PDF/CSV) with simulated download feedback and compliance audit checklists (SOC2, ISO-27001).
- **Settings View**: Tabbed settings for Profile info, Theme preferences, Notification thresholds, and Two-Factor Authentication (2FA).

---

## 🏗️ Project Architecture

```
modern-web-application-dashboard/
├── index.html                   # HTML5 entry with Plus Jakarta Sans & SEO meta
├── package.json                 # Dependencies & scripts
├── vite.config.js               # Vite bundler configuration
├── src/
│   ├── main.jsx                 # React root DOM initialization
│   ├── App.jsx                  # Main application orchestrator & global state
│   ├── index.css                # Design tokens, variables & responsive styling
│   ├── assets/                  # Brand icons and vector assets
│   ├── components/              # Reusable React components
│   │   ├── Sidebar.jsx          # Collapsible responsive sidebar navigation
│   │   ├── Navbar.jsx           # Top search bar, theme toggle & dropdowns
│   │   ├── StatCard.jsx         # KPI summary card with trend pills
│   │   ├── AnalyticsChart.jsx   # Recharts Area, Bar, and Donut charts
│   │   ├── ProjectList.jsx      # Projects table & grid manager with filters
│   │   ├── ProjectCard.jsx      # Card component for grid view
│   │   ├── ProgressBar.jsx      # Animated percentage progress bar
│   │   ├── ProfileSection.jsx   # Profile trigger button
│   │   ├── ProfileDropdown.jsx  # User account dropdown menu
│   │   ├── NotificationDropdown.jsx # Notifications drawer
│   │   └── NewProjectModal.jsx  # Interactive project creation modal
│   ├── pages/                   # Tabbed application views
│   │   ├── OverviewPage.jsx     # Main executive dashboard
│   │   ├── AnalyticsPage.jsx    # Deep telemetry & velocity analytics
│   │   ├── ProjectsPage.jsx     # Full project portfolio management
│   │   ├── ReportsPage.jsx      # Exportable reports & audit checklists
│   │   └── SettingsPage.jsx     # Profile, theme & notification settings
│   └── data/
│       └── mockData.js          # Realistic mock data for projects & charts
└── README.md                    # Documentation & setup guide
```

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (ES6+)
- **Styling**: Vanilla CSS3 with CSS Custom Properties, Flexbox, CSS Grid & Glassmorphism
- **Charts & Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Google Fonts (*Plus Jakarta Sans*, *JetBrains Mono*)

---

## 🚀 Local Setup & Installation

### Prerequisites
- Node.js (version 18.x or later recommended)
- npm or yarn

### Steps to Run Locally

1. **Navigate to the project directory**:
   ```bash
   cd "f:\internship\Auspify Technologies\Modern Web Application Dashboard"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:5173/](http://localhost:5173/) in your browser.

5. **Production Build**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Deployment to Vercel

You can deploy this dashboard to **Vercel** in just a few minutes:

### Option A: Via Vercel CLI (Fastest)

1. Install Vercel globally:
   ```bash
   npm install -g vercel
   ```
2. Login to your Vercel account:
   ```bash
   vercel login
   ```
3. Deploy directly from the project directory:
   ```bash
   vercel
   ```
4. For production deployment:
   ```bash
   vercel --prod
   ```

### Option B: Via GitHub & Vercel Dashboard

1. Initialize Git in the project directory:
   ```bash
   git init
   git add .
   git commit -m "feat: Task 6 Modern Web Application Dashboard"
   ```
2. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/modern-web-application-dashboard.git
   git branch -M main
   git push -u origin main
   ```
3. Visit [vercel.com](https://vercel.com/) and click **"Add New Project"**.
4. Import your GitHub repository.
5. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Your dashboard will be live with a free SSL certificate!

---

## 📄 License & Credits
Developed as an official internship project submission for **Task 6: Modern Web Application Dashboard** at **Auspify Technologies**.
