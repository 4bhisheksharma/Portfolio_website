# Abhishek Sharma - Portfolio

Modern React portfolio built with Vite, TypeScript, Tailwind CSS, and Framer Motion.

**Live:** [abhishek-sharma.com.np](https://www.abhishek-sharma.com.np/)

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React + React Icons
- shadcn/ui components

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

The site deploys automatically to GitHub Pages via GitHub Actions when changes are pushed to the `master` branch.

**Manual setup required once:**
1. Go to repository Settings → Pages
2. Set Source to **GitHub Actions**

## Project Structure

```
src/
  components/
    common/     # Reusable UI (Reveal, Counter, TypedText, etc.)
    layout/     # Navbar, Footer
    sections/   # Hero, About, Projects, Skills, Experience, etc.
    ui/         # shadcn/ui primitives
  data/         # All portfolio content (single source of truth)
  hooks/        # Custom React hooks
  lib/          # Utilities
public/
  assets/       # Images, CV, and static files
  CNAME         # Custom domain
legacy/         # Original static HTML/CSS/JS site (backup)
```

## Legacy Site

The original static portfolio is preserved in the `legacy/` directory for reference.
