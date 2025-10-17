# ClearPath - Job Application Tracker

Never lose track of a job application again. ClearPath automatically tracks your job applications across LinkedIn, Indeed, Glassdoor, and more.

##  Features

- **Multi-platform tracking** - Works on LinkedIn, Indeed, Glassdoor, Lever, Greenhouse, Workday, and more
- **Automatic detection** - Chrome extension automatically detects when you apply for jobs
- **Centralized dashboard** - View all your applications in one place
- **Status tracking** - Track application progress from applied to offer
- **Analytics** - Get insights into your job search progress

##  Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Extension**: Chrome Extension (Manifest V3)
- **Deployment**: Vercel

##  Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
`ash
git clone https://github.com/yourusername/clearpath-production.git
cd clearpath-production
`

2. Install dependencies
`ash
npm install
`

3. Set up environment variables
`ash
cp .env.example .env.local
`

Add your Supabase credentials to .env.local:
`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
`

4. Run the development server
`ash
npm run dev
`

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

##  Deployment

This app is deployed on Vercel. Any push to main branch automatically deploys.

##  Support

For support, open an issue or contact us.

---

**ClearPath** - Never lose track of a job application again. 
