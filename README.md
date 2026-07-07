# 🌿 The Wild Oasis — Guest Website

<div align="center">

### *Book your dream cabin getaway.*

A customer-facing booking website for The Wild Oasis resort, built with **Next.js 14 App Router**, **Supabase**, and **NextAuth** with Google OAuth.

<br />

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#-docker)

</div>

---

## ✨ Features

- **🏡 Browse Cabins** — View available cabins with capacity, pricing, and images from Supabase Storage
- **📅 Book a Stay** — Select dates, choose a cabin, and make a reservation
- **🔐 Google OAuth** — Sign in with Google via NextAuth for a seamless login experience
- **👤 Guest Dashboard** — View and manage your bookings from your account page
- **⚡ Server Components** — Leverages Next.js App Router with React Server Components for fast page loads
- **🖼️ Static Generation** — Cabin detail pages pre-rendered at build time via `generateStaticParams`
- **📱 Responsive Design** — Tailwind CSS styling that works across all devices

## 🛠️ Technology Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **UI** | React 18 + Tailwind CSS 3 |
| **Auth** | NextAuth v5 (beta) + Google OAuth |
| **Backend** | Supabase (PostgreSQL, Auth, Storage) |
| **Date Picker** | react-day-picker |
| **Utilities** | date-fns, @heroicons/react |
| **Containerization** | Docker (standalone output + multi-stage build) |

## 💻 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Supabase** project — [supabase.com](https://supabase.com/)
- **Google OAuth** credentials — [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/the-wild-oasis-website.git
cd the-wild-oasis-website

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

### Running Locally

```bash
# Development mode
npm run dev

# Production build + start
npm run prod
```

The app will be running at **`http://localhost:3000`**

### 🐳 Docker

You can also run the app using Docker — no Node.js installation required.

#### Quick Start (Docker Run)

```bash
# Build the image
# Supabase creds are needed at build time (generateStaticParams fetches cabin data)
docker build -t wild-oasis-website:1.0 \
  --build-arg SUPABASE_URL=your_supabase_url \
  --build-arg SUPABASE_KEY=your_supabase_anon_key \
  .

# Run the container (auth vars are injected at runtime)
docker run -d --name wild-oasis-website -p 3000:3000 --env-file .env.local wild-oasis-website:1.0
```

#### Using Docker Compose

```bash
# Build and start
docker compose up -d --build

# View logs
docker compose logs -f

# Stop
docker compose down
```

#### Pull from Docker Hub

No need to clone the repo — just pull the pre-built image:

```bash
docker pull adityapratap07/wild-oasis-website:latest

docker run -d --name wild-oasis-website -p 3000:3000 \
  -e SUPABASE_URL=your_supabase_url \
  -e SUPABASE_KEY=your_supabase_anon_key \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e NEXTAUTH_SECRET=your_nextauth_secret \
  -e AUTH_GOOGLE_ID=your_google_client_id \
  -e AUTH_GOOGLE_SECRET=your_google_client_secret \
  adityapratap07/wild-oasis-website:latest
```

The app will be running at **`http://localhost:3000`**

> **Note:** This project uses a hybrid env var strategy — Supabase credentials are needed at **build time** (for `generateStaticParams`), while auth credentials are injected at **runtime**. The Docker Hub image comes with pre-rendered cabin pages.

## 📜 License

This project is licensed under the MIT License.

---

<div align="center">

**Built with ❤️ by [Aditya Pratap](https://github.com/Ad1ty4C0des)**

<sub>If you found this project helpful, consider giving it a ⭐</sub>

</div>
