# Rohan Nayak — React TypeScript Portfolio

A responsive, one-page personal portfolio built with React, TypeScript, Vite and Material UI. The portfolio focuses on Java full-stack engineering while also presenting React, Node.js, databases, AWS, mobile and production-support experience.

## Main features

- One-page anchor navigation; no browser router
- Resume-driven content loaded from `public/data/portfolio.json`
- Material UI components and MUI `styled()` layouts
- Responsive CSS Grid and Flexbox behavior
- Light/dark theme toggle saved in local storage
- Scroll reveal animation using `IntersectionObserver`
- Interactive project cards and skill chips
- GitHub public API integration for live profile statistics
- Accessible contact form validation
- Static-site-safe email submission through the visitor's email application
- Downloadable PDF resume
- GitHub Pages deployment workflow

## Project structure

```text
rohan-nayak-portfolio/
├── .github/workflows/deploy.yml
├── public/
│   ├── assets/Rohan_Nayak_Resume.pdf
│   └── data/portfolio.json
├── src/
│   ├── components/
│   ├── hooks/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Run locally

Node.js 22.12 or newer is recommended.

```bash
npm install
npm run dev
```

Open the local address printed by Vite, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production output is created in `dist/`.

## Update portfolio content

Edit only:

```text
public/data/portfolio.json
```

You can update the summary, skills, projects, experience, education, contact information and GitHub API URL without changing the React components.

The profile image currently uses:

```text
https://avatars.githubusercontent.com/u/75715641?v=4
```

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Extract this ZIP and push all files to the repository's `main` branch.
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions**.
5. Push a commit or manually run the **Deploy portfolio to GitHub Pages** workflow.
6. GitHub will provide the published URL after deployment succeeds.

The Vite `base` is configured as `./`, so the generated site works for both user pages and repository project pages without editing the repository name.

## Contact form behavior

This is a static GitHub Pages website. After successful validation, the contact form opens the visitor's default email application with the subject and message filled in. No form data is stored by the site.

## Browser testing checklist

- Chrome / Edge
- Firefox
- Safari
- Desktop widths above 1200px
- Tablet widths around 768px
- Mobile widths from 320px
- Keyboard navigation and visible focus states
- Light and dark themes
- Form validation and mail application opening
- GitHub API fallback behavior

## Technology versions

The package file targets current releases of React, Material UI, Vite and TypeScript. Run `npm install` to resolve packages and generate `package-lock.json` in your environment.
