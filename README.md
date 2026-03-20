<div align="center">

# 🍽️ Munna Catering Services

### *Premium Catering for Every Occasion*

**Digital Storefront — Munna Catering Services**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub](https://img.shields.io/badge/GitHub-TheAlgo7-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TheAlgo7)

---

*A high-conversion digital storefront for **Munna Catering Services** — a live client project showcasing premium catering, wedding services, corporate events, world cuisines, and crockery rentals. Designed for real-world business conversion.*

</div>

<br>

## 🧬 What This Is

This is the complete frontend implementation for **Munna Catering Services** — a real client project built to modernize their digital presence and drive bookings. No frameworks. No component libraries. Pure HTML, CSS, and JavaScript — optimized for speed, clarity, and client conversion.

The platform presents 8 catering service categories, a crockery rental showcase, downloadable brochure, and direct contact integration — all wrapped in an elegant, food-friendly design with rich imagery and smooth interactions.

<br>

## 🗂️ Site Architecture

```
munna-catering-frontend/
│
├── index.html              → Landing page — hero, catering services, crockery showcase
│
├── html/
│   ├── about.html          → About page — company story & team
│   └── contact.html        → Contact page — booking inquiries
│
├── css/
│   ├── style.css           → Complete design system — responsive layouts, service cards, nav
│   └── reset.min.css       → CSS reset for cross-browser consistency
│
├── js/
│   ├── script.js           → Core interactions — navbar camouflage, scroll logic, debounce
│   └── camouflage.js       → Navbar background transition system
│
├── images/
│   ├── mjc.png             → Favicon / logo (color)
│   ├── mjcw.png            → Logo (white variant)
│   ├── bg.jpg              → Hero background
│   ├── edge-skew.png       → Navbar texture pattern (services section)
│   ├── background-repeat.png → Navbar texture pattern (crockery section)
│   ├── 1-8.jpeg            → Catering service photography (8 images)
│   └── slide1-8.jpeg       → Crockery showcase gallery (8 images)
│
├── package.json            → Project metadata
├── .babelrc                → Babel configuration
├── .eslintrc.json          → ESLint rules
├── .eslintignore           → ESLint ignore patterns
├── .gitignore              → Git ignore patterns
└── README.md
```

<br>

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| **Structure** | HTML5 (semantic) |
| **Styling** | Custom CSS — CSS Grid, Flexbox, responsive breakpoints |
| **Interactions** | Vanilla JavaScript — navbar camouflage, scroll handlers, debounce utility |
| **Typography** | Google Fonts — Cinzel (headings), Poppins (body) |
| **Methodology** | Mobile-First Design, BEM CSS structuring |
| **Build Tools** | Babel (ES6+ transpilation), ESLint (code quality) |
| **Version Control** | Git + GitHub (this repo) |

<br>

## 🎨 Design Philosophy

- **Elegant & food-forward.** Warm green and brown palette (`#00996e`, `#5d4037`) with rich food photography that sells the experience visually.
- **Conversion-focused layout.** Hero section with 4 clear CTAs: Catering Services, Crockery Services, Contact Us, and Download Brochure — no decision paralysis.
- **Navbar camouflage system.** Dynamic navbar background that adapts based on scroll position and section context — transparent on hero, solid green on services, textured on crockery.
- **Responsive grid system.** CSS Grid service cards that reflow gracefully from single-column mobile to multi-column desktop.
- **Interactive service cards.** Image-driven service showcases with hover-state reveals and clear descriptions for each catering category.
- **Crockery gallery.** Grid-based image gallery for rental services: bone china, LED buffet counters, wedding setups, and interior decoration.
- **Performance-first.** No framework overhead — debounced scroll handlers, CSS-only burger menu toggle, minimal JavaScript footprint.

<br>

## 🍴 Services Showcase

| Service | Category |
|---|---|
| **Premium Catering** | Full-service premium culinary experiences | 
| **Elegant Wedding Catering** | Bespoke wedding menu design & execution |
| **Corporate Events Catering** | Professional event catering for business |
| **House Parties Catering** | Intimate gatherings & private events |
| **Sit-Down Dining Experiences** | Formal multi-course dining service |
| **World Cuisines Buffet** | Global culinary journeys |
| **Grazing Tables** | Artisanal display & grazing experiences |
| **Delicacies of the Modern World** | Contemporary fusion cuisine |

<br>

## 🏺 Crockery & Event Services

| Service | Description |
|---|---|
| **Bone China Crockery** | Premium tableware rental |
| **Buffet LED Counter** | Modern illuminated buffet stations |
| **Wedding Budget Set-Up** | Complete wedding staging packages |
| **Interior Decoration** | Event venue decoration services |
| **Restaurant Services** | Full restaurant-grade service staffing |
| **Cuisines and Tablewares** | Cuisine-paired tablescape design |
| **Host with Style** | Premium hosting accessories & setups |
| **Dining Experience** | End-to-end dining environment creation |

<br>

## 📄 Pages Breakdown

| Page | Purpose | Priority |
|---|---|---|
| **Home** (`/`) | Hero landing, catering services grid, crockery showcase, brochure download | 🔴 Core |
| **About** (`/html/about`) | Company story, team, and brand values | 🟡 Trust |
| **Contact** (`/html/contact`) | Booking inquiries and direct contact | 🔴 Core |

<br>

## 🚀 Run Locally

```bash
# Clone the repository
git clone https://github.com/TheAlgo7/munna-catering-frontend.git

# Navigate into the project
cd munna-catering-frontend

# Start a local server (Python)
python -m http.server 8000

# Or use any static file server
npx serve .
```

Then open **http://localhost:8000** in your browser.

<br>

---

<div align="center">

**A live client project — built for business, not demos.**

`v1.0` — Client delivery · 2024

<sub>© 2024 The Algothrim · Munna Catering Services</sub>

</div>
