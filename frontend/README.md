# 🚀 AI-Powered Promo Engine

![Hero Image](frontend/public/hero.png)

An enterprise-grade platform for managing, simulating, and optimizing geographic promotional campaigns. Built with **React**, **TypeScript**, and **Vite**.

## ✨ Key Features
- **Interactive Region Matrix**: Real-time logic for managing promotional weight across global regions.
- **AI-Powered Simulations**: Predictive insights for revenue uplift and conversion rates.
- **Glassmorphism UI**: High-fidelity, premium user experience.
- **Dynamic Campaign Studio**: Create and edit campaigns with instant visual feedback.

## 🌐 Live Demo
Visit the live interactive prototype:
👉 **[https://nazarkoui.github.io/promo-engine/](https://nazarkoui.github.io/promo-engine/)**

## 🛠️ Technical Stack
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS / Vanilla CSS
- **Build Tool**: Vite
- **Deployment**: GitHub Pages (Automated via GitHub Actions), Vercel

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nazarkoui/promo-engine.git
   ```
2. **Install dependencies**:
   ```bash
   cd promo-engine/frontend
   npm install
   ```
3. **Run locally**:
   ```bash
   npm run dev
   ```

## ▲ Deploying on Vercel

This repository includes Vercel configuration for both repository-root and `frontend/` root-directory deployments.

1. Import the repository into Vercel.
2. You can deploy with project root as repository root **or** `frontend/`.
3. Deploy (Vercel uses `vercel.json` automatically).

Notes:
- Root deployment uses `/vercel.json` and `cd frontend` commands.
- `frontend/` root deployment uses `/frontend/vercel.json`.
- Both configs include `/promo-engine/(.*) -> /$1` so old GitHub Pages-style links keep working on Vercel.

---
*Created by [nazarkoui](https://github.com/nazarkoui)*
