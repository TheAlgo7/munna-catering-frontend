"""README screenshots.

The site is no longer hosted, so serve the repository first:

  python -m http.server 8124
  python scripts/readme-shots.py

Needs Python with Playwright and Chrome. Sections reveal on scroll, so each is
scrolled into view before its picture. Writes docs/readme/src/assets/*.png; the README Kit
(Work/Playbooks/README Kit/render.py) draws docs/readme/*.webp from them.
"""
import base64, os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get('BASE', 'http://localhost:8124')
OUT = Path('docs/readme/src/assets')
OUT.mkdir(parents=True, exist_ok=True)
UA = 'Mozilla/5.0 (Linux; Android 16; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Mobile Safari/537.36'
SECTIONS = ['our-services', 'menu-showcase', 'other-services', 'budget-estimator', 'testimonials', 'faqs']


def reveal(page, sid):
    page.evaluate('id => document.getElementById(id).scrollIntoView({block: "start"})', sid)
    page.mouse.wheel(0, -80)
    page.wait_for_timeout(1600)


with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')

    desk = b.new_context(viewport={'width': 1440, 'height': 900}, device_scale_factor=1.5)
    d = desk.new_page()
    d.goto(BASE + '/', wait_until='networkidle'); d.wait_for_timeout(2500)
    d.screenshot(path=str(OUT / 'desktop-home.png'))
    for sid in SECTIONS:
        reveal(d, sid)
        d.screenshot(path=str(OUT / f'desktop-{sid}.png'))
    desk.close()

    mob = b.new_context(viewport={'width': 393, 'height': 852}, device_scale_factor=2, user_agent=UA, is_mobile=True, has_touch=True)
    m = mob.new_page()
    m.goto(BASE + '/', wait_until='networkidle'); m.wait_for_timeout(2500)
    m.screenshot(path=str(OUT / 'phone.png'))
    reveal(m, 'menu-showcase')
    m.screenshot(path=str(OUT / 'phone-menu.png'))
    reveal(m, 'budget-estimator')
    m.screenshot(path=str(OUT / 'phone-budget.png'))
    mob.close()

    b.close()
print('written:', sorted(x.name for x in OUT.iterdir()))
