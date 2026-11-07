// Munna Catering Services' README pictures, drawn by the README Kit (Work\Playbooks\README Kit\render.py).
// Every wide picture has a "-mobile" twin that the README swaps in on screens up to 600 px.
// The screens come from scripts/readme-shots.py: the site served locally, desktop at 1080x675 and 2x,
// phones at 393x852 and 2x.
const GOLD = '#c9a466', INK = '#f1ebe1';
const BROWN = (at, glow = '#3a2a16') => `radial-gradient(820px 640px at ${at}, ${glow} 0%, rgba(24,20,16,0) 70%), #181410`;
const P = (src, x, y, w, rot = 0, z = 24) => ({ type: 'phone', src, x, y, w, rot, z, bar: true, barBg: '#181410', barColor: '#f1ebe1' });
const L = (src, x, y, w, z = 20) => ({ type: 'laptop', src, x, y, w, z });
const panel = (head, sub, items) => ({
  w: 1600, h: 760, bg: BROWN('76% 54%'), color: INK, accent: GOLD,
  head: { x: 76, y: 190, size: 140, max: 530, lines: head }, sub: { x: 80, width: 500, size: 27, text: sub }, items,
});
const tall = (head, sub, items) => ({
  w: 1080, h: 1360, bg: BROWN('56% 74%'), color: INK, accent: GOLD,
  head: { x: 64, y: 80, size: 170, max: 950, lines: head }, sub: { x: 70, width: 930, size: 36, text: sub }, items,
});

window.README = {
  name: 'Munna Catering Services', icon: null,
  layouts: {
    hero: {
      w: 1600, h: 820, bg: BROWN('74% 54%'), color: INK, accent: GOLD,
      brand: { x: 80, y: 80, size: 26 },
      head: { x: 76, y: 236, size: 140, max: 600, lines: ['Catering', 'since 2010'] },
      sub: { x: 80, width: 500, size: 27, gap: 34, text: 'A website for a Delhi caterer: services, a filterable menu and an instant cost estimate.' },
      items: [L('desktop-home.png', 720, 110, 700), P('phone.png', 1260, 220, 250, 5)],
    },
    'hero-mobile': {
      w: 1080, h: 1350, bg: BROWN('56% 76%'), color: INK, accent: GOLD,
      brand: { x: 70, y: 70, size: 32 },
      head: { x: 64, y: 190, size: 180, max: 950, lines: ['Catering', 'since 2010'] },
      sub: { x: 70, width: 930, size: 38, text: 'A website for a Delhi caterer: services, a menu and an instant estimate.' },
      items: [L('desktop-home.png', 110, 760, 720), P('phone.png', 770, 740, 240, 5)],
    },
    menu: panel(['Menu', 'by cuisine'], 'Signature dishes filtered by cuisine, alongside the services and the crockery and set-ups on offer.', [
      L('desktop-menu-showcase.png', 700, 70, 640), L('desktop-our-services.png', 930, 320, 560, 22),
    ]),
    'menu-mobile': tall(['Menu', 'by cuisine'], 'Signature dishes filtered by cuisine, alongside the services on offer.', [
      L('desktop-menu-showcase.png', 90, 600, 700), L('desktop-our-services.png', 330, 860, 640, 22),
    ]),
    estimate: panel(['An instant', 'estimate'], 'Pick the event, the guest count and the menu tier, and the site gives a price range before anyone calls.', [
      L('desktop-budget-estimator.png', 700, 110, 680), P('phone-budget.png', 1270, 200, 240, 5),
    ]),
    'estimate-mobile': tall(['An instant', 'estimate'], 'Pick the event, the guest count and the menu tier for a price range.', [
      L('desktop-budget-estimator.png', 110, 640, 720), P('phone-budget.png', 770, 640, 240, 5),
    ]),
  },
};
