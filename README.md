# Sahil Singh — Portfolio Website

A fast, modern, single-page portfolio website built with **HTML, Tailwind CSS, and vanilla JavaScript**. Fully data-driven — update one JSON file to change all content.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Features

- **Dark theme** with electric blue accent — modern developer aesthetic
- **Fully responsive** — mobile, tablet, and desktop
- **Data-driven** — all content loaded from `data.json`
- **Download CV** — direct PDF download link in navbar and hero
- **Print-friendly** — CSS print styles for clean printout (`Ctrl+P`)
- **Project cards** — each with source code (GitHub) and live demo links
- **Smooth scroll** navigation with active section highlighting
- **Fade-in animations** on scroll using IntersectionObserver
- **No build step** — just open `index.html` or deploy to any static host
- **SEO-ready** — meta tags, Open Graph, semantic HTML

---

## File Structure

```
portfolio/
├── index.html                        # Main HTML page
├── app.js                            # JS — renders data.json into the DOM
├── style.css                         # Custom styles (animations, print, etc.)
├── data.json                         # All portfolio content (easy to update!)
├── Sahil-Singh-FSDD-20250420.pdf     # Resume PDF
└── README.md                         # This file
```

---

## How to Update Content

**All your content lives in `data.json`.** Edit this single file to update:

| Section | JSON Field |
|---------|-----------|
| Name, title, tagline | `name`, `title`, `tagline` |
| Contact info | `email`, `phone`, `location` |
| Social links | `linkedin`, `github` |
| About text | `about` |
| Skills | `skills` (categorized object) |
| Work experience | `experience` array |
| Education | `education` array |
| Projects | `projects` array (with `repoUrl` and `liveUrl`) |
| Certificates | `certificates` array |

### Adding a New Project

Add an entry to the `projects` array in `data.json`:

```json
{
  "name": "My New Project",
  "description": "A brief description of what it does.",
  "techStack": ["React", "Node.js", "MongoDB"],
  "highlights": [
    "Key feature or achievement #1",
    "Key feature or achievement #2"
  ],
  "repoUrl": "https://github.com/yourusername/project-name",
  "liveUrl": "https://your-live-demo-url.com"
}
```

---

## How to Run Locally

Since this is a plain HTML site that fetches `data.json`, you need a local server (browsers block `fetch()` on `file://`):

### Option 1 — Python (recommended)
```bash
cd portfolio
python -m http.server 8000
# Open http://localhost:8000
```

### Option 2 — Node.js
```bash
npx serve .
```

### Option 3 — VS Code
Install the **Live Server** extension and click "Go Live".

---

## How to Deploy

### GitHub Pages (Free)

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your site will be live at `https://yourusername.github.io/portfolio/`

### Netlify / Vercel

Just drag-and-drop the folder, or connect to the GitHub repo.  
No build command needed — it's all static.

---

## Technologies Used

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic page structure |
| **Tailwind CSS** (CDN) | Utility-first styling, responsive design |
| **Vanilla JavaScript** | Data loading, DOM rendering, animations |
| **CSS3** | Custom animations, print styles, transitions |

---

## Print / Download Resume

- Click the **"Download CV"** button (navbar or hero section) to download the PDF resume
- Press `Ctrl+P` (or `Cmd+P` on Mac) to print a clean version of the portfolio — non-essential elements (navbar, buttons) are hidden in print view

---

## License

This project is open source and available for personal use.

---

Built with focus on **speed, simplicity, and easy maintenance**.
