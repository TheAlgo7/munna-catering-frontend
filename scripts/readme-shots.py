"""README screenshots and hero banner.

The site is no longer hosted, so serve the repository first:

  python -m http.server 8124
  python scripts/readme-shots.py

Needs Python with Playwright and Chrome. Sections reveal on scroll, so each is
scrolled into view before its picture. Writes docs/readme/*.png.
"""
import base64, os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get('BASE', 'http://localhost:8124')
OUT = Path('docs/readme')
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

    # Hero: the name, the line, the site on a laptop and a phone.
    img = lambda n: 'data:image/png;base64,' + base64.b64encode((OUT / n).read_bytes()).decode()
    hero = f'''<html><head>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Playfair+Display:ital,wght@1,500&family=Outfit:wght@400&display=block" rel="stylesheet">
<style>
body {{ margin: 0; width: 1600px; height: 820px; background: #120F0D; font-family: Outfit; color: #F3ECE3; overflow: hidden; position: relative; }}
.glow {{ position: absolute; right: -200px; top: -240px; width: 1100px; height: 1100px; border-radius: 50%;
  background: radial-gradient(closest-side, rgba(201,150,82,0.16), rgba(201,150,82,0)); }}
.copy {{ position: absolute; left: 100px; top: 220px; width: 520px; }}
.wm {{ font-family: Cinzel; font-weight: 700; font-size: 30px; letter-spacing: 0.06em; }}
h1 {{ margin: 40px 0 0; font-family: Cinzel; font-size: 58px; line-height: 1.1; font-weight: 700; }}
h1 em {{ display: block; font-family: 'Playfair Display'; font-style: italic; font-weight: 500; color: #C99652; }}
p {{ margin: 28px 0 0; font-size: 22px; line-height: 1.55; color: #B0A596; max-width: 32ch; }}
.laptop {{ position: absolute; left: 640px; top: 110px; width: 860px; border-radius: 10px; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.10); box-shadow: 0 50px 110px -40px rgba(0,0,0,0.95); background: #000; }}
.laptop img {{ display: block; width: 100%; }}
.phone {{ position: absolute; left: 1300px; top: 250px; width: 250px; border-radius: 32px; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 40px 90px -30px rgba(0,0,0,0.95); background: #000; }}
.phone img {{ display: block; width: 100%; }}
</style></head><body><div class="glow"></div>
<div class="copy"><div class="wm">MUNNA CATERING</div>
<h1>Good food, <em>memorable occasions.</em></h1>
<p>A client website for a Delhi caterer: services, menus, a budget estimator and a direct line to book.</p></div>
<div class="laptop"><img src="{img('desktop-home.png')}"></div>
<div class="phone"><img src="{img('phone-menu.png')}"></div>
</body></html>'''
    pg = b.new_page(viewport={'width': 1600, 'height': 820})
    pg.set_content(hero, wait_until='networkidle')
    pg.evaluate('document.fonts.ready')
    pg.wait_for_timeout(800)
    pg.screenshot(path=str(OUT / 'hero.png'))
    b.close()
print('written:', sorted(x.name for x in OUT.iterdir()))
