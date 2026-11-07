<p align="center">
  <picture>
    <source media="(max-width: 600px)" srcset="docs/readme/hero-mobile.webp">
    <img src="docs/readme/hero.webp" alt="Munna Catering Services: the website's home section on a laptop and a phone" width="100%">
  </picture>
</p>

<p align="center">
  <strong>A website for Munna Catering Services, a Delhi caterer for weddings, corporate events and house parties since 2010.</strong><br>
  Services, a filterable menu, an instant cost estimator and a direct path to booking.
</p>

<p align="center">
  <a href="#what-it-looks-like">What it looks like</a> ·
  <a href="#what-the-site-covers">What the site covers</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#run-it-locally">Run it locally</a>
</p>

## The brief

A real business needed to look established online, earn trust before anyone read a word, and make hiring it easy. So the site leads with food and occasions, keeps the services clear, and puts a way to call or enquire on every screen. Its most useful piece is the cost estimator: a visitor picks the event, the guest count and a menu tier and sees a price range before they ever pick up the phone.

The site is no longer hosted. This repository keeps it, and it runs from any static server.


## What it looks like

<picture>
  <source media="(max-width: 600px)" srcset="docs/readme/menu-mobile.webp">
  <img src="docs/readme/menu.webp" alt="Menu by cuisine: the signature menu showcase and the catering services on two laptops" width="100%">
</picture>

**Menu by cuisine.** Signature dishes filtered by cuisine, with the services and set-ups on offer.

<picture>
  <source media="(max-width: 600px)" srcset="docs/readme/estimate-mobile.webp">
  <img src="docs/readme/estimate.webp" alt="An instant estimate: the cost estimator on a laptop and a phone" width="100%">
</picture>

**An instant estimate.** The event, the guest count and the menu tier give a price range before anyone calls.

## What the site covers

- **Services** for weddings, corporate events, private parties and celebrations.
- **A signature menu** filterable by North Indian, Awadhi and Mughlai, Pan-Asian and global, and desserts, each dish marked veg or non-veg.
- **Crockery and event support** beyond the food itself.
- **An interactive cost estimator** that turns event type, guests, menu tier and add-ons into a price range, then carries the choices into the contact form.
- **A downloadable brochure** of the full menu.
- **Testimonials and FAQs** for the questions every client asks.
- **Dark and light themes**, remembered on the device.


## How it works

- **Static pages.** `index.html`, `html/about.html` and `html/contact.html`, one stylesheet, and `js/script.js` for the theme, the menu filter and the estimator.
- **Estimator to enquiry.** The estimate is saved in `localStorage` when the visitor moves to Contact, so the form arrives filled in with their event.
- **Reveal on scroll.** Sections animate in as they enter the viewport.
- **Build.** Babel compiles `js/` into `dist/js/` for older browsers.


## Run it locally

<details>
<summary><strong>Setup and commands</strong></summary>

```bash
git clone https://github.com/TheAlgo7/munna-catering-frontend.git
cd munna-catering-frontend
python -m http.server 8124
```

Open http://localhost:8124. With that server running, `python scripts/readme-shots.py` rebuilds the screenshots in this README.

The pictures on this page come from `scripts/readme-shots.py` (captures in `docs/readme/src/assets`) and `docs/readme/src/readme.js`, drawn by The Algothrim's README Kit.

</details>

## Licence

Copyright © 2026 Gaurav Kumar, [The Algothrim](https://thealgothrim.com), for Munna Catering Services. All rights reserved.
