/* Gleis 9 ¾ – Entwurf 2, MAPSOL */
(() => {
  const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Kopf + Menü */
  const kopf = document.getElementById('kopf'), menu = document.getElementById('menu');
  const fest = () => kopf.classList.toggle('fest', scrollY > 30);
  fest(); addEventListener('scroll', fest, { passive: true });
  menu.addEventListener('click', () => {
    const auf = kopf.classList.toggle('offen'); menu.setAttribute('aria-expanded', auf);
    document.body.style.overflow = auf ? 'hidden' : '';
  });
  document.querySelectorAll('#nav a').forEach(a => a.addEventListener('click', () => {
    kopf.classList.remove('offen'); menu.setAttribute('aria-expanded', false); document.body.style.overflow = '';
  }));

  /* Öffnungszeiten + Status */
  const Z = { 0: null, 1: null, 2: ['13.30', '22.30'], 3: ['13.30', '18.00'], 4: ['13.30', '22.30'], 5: ['13.30', '22.30'], 6: ['10.00', '17.00'] };
  const TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const m = t => { const [h, mi] = t.split('.'); return h * 60 + +mi; };
  const d = new Date(), tag = d.getDay(), nun = d.getHours() * 60 + d.getMinutes();
  const st = document.getElementById('status'), stx = st.querySelector('span');
  const z = Z[tag];
  if (z && nun >= m(z[0]) && nun < m(z[1])) { st.classList.add('offen'); stx.textContent = `Jetzt geöffnet bis ${z[1]} Uhr`; }
  else if (z && nun < m(z[0])) stx.textContent = `Heute ab ${z[0]} Uhr geöffnet`;
  else { let n = tag, i = 0; do { n = (n + 1) % 7; i++; } while (!Z[n]); stx.textContent = `Geschlossen · ${i === 1 ? 'morgen' : TAGE[n]} ab ${Z[n][0]} Uhr`; }
  document.querySelector(`#zeiten [data-tag="${tag}"]`)?.classList.add('heute');
  document.getElementById('jahr').textContent = d.getFullYear();

  /* Wochenplan laut Eventplaner boardgamerock.ch/events (Stand Nov. 2026) */
  const WOCHE = [
    { t: 2, name: 'Dienstag', bild: 'assets/img/cafe_05.webp', typ: 'Magic · Lorcana', mana: ['#5B8FD6', '#C9A15A'],
      ev: [['Commander Night', 'Magic'], ['Lorcana Challenge', 'Lorcana']], flair: 'Bring dein Deck. Hundert Karten, ein Kommandant, keine Gnade.' },
    { t: 4, name: 'Donnerstag', bild: 'assets/img/shop_04.webp', typ: 'TCG · Brettspiel', mana: ['#C9502E', '#3E8E5A', '#C9A15A'],
      ev: [['Standard Showdown', 'Magic'], ['Armory · 18.30', 'F&B'], ['Nexus Night', 'Riftbound'], ['Brettspielabend', 'Alle']], flair: 'Der volle Abend. Wer zuerst kommt, sitzt am langen Tisch.' },
    { t: 5, name: 'Freitag', bild: 'assets/img/cafe_03.webp', typ: 'Magic', mana: ['#5B8FD6', '#2B2B2B'],
      ev: [['Commander Night', 'Magic'], ['Magic Limited', 'Magic']], flair: 'Booster auf, Deck bauen, losspielen. Ins Wochenende mit Stil.' },
    { t: 6, name: 'Samstag', bild: 'assets/img/shop_02.webp', typ: 'One Piece', mana: ['#C9502E'],
      ev: [['One Piece Weeklys', 'One Piece']], flair: 'Nicht jede Woche – schau vorher in den Eventplaner.' },
  ];
  const w = document.getElementById('woche');
  WOCHE.forEach(x => {
    const el = document.createElement('article'); el.className = 'mkarte zeige' + (x.t === tag ? ' heute' : '');
    el.innerHTML = `<div class="mk-innen">
      <header class="mk-name"><h3>${x.name}</h3><span class="mana">${x.mana.map(c => `<i style="--m:${c}"></i>`).join('')}</span></header>
      <div class="mk-bild"><img src="${x.bild}" alt="" loading="lazy"></div>
      <p class="mk-typ"><b>Event</b> — ${x.typ}</p>
      <ul class="mk-text">${x.ev.map(e => `<li><span>${e[0]}</span><em>${e[1]}</em></li>`).join('')}<li class="flair">${x.flair}</li></ul>
      <p class="mk-fuss"><span>Gleis 9¾</span><span>Wöchentlich</span></p></div>`;
    w.appendChild(el);
  });

  // Punkte unter der Kartenhand (Handy)
  const wisch = document.getElementById('wisch');
  wisch.innerHTML = WOCHE.map(() => '<i></i>').join('');
  const punkte = () => {
    const k = [...w.children], mitte = w.scrollLeft + w.clientWidth / 2;
    let best = 0; k.forEach((c, i) => { if (Math.abs(c.offsetLeft + c.offsetWidth / 2 - mitte) < Math.abs(k[best].offsetLeft + k[best].offsetWidth / 2 - mitte)) best = i; });
    [...wisch.children].forEach((p, i) => p.classList.toggle('an', i === best));
  };
  w.addEventListener('scroll', punkte, { passive: true }); punkte();

  /* Einblenden */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('da'); io.unobserve(e.target); } }), { threshold: .15 });
  document.querySelectorAll('.zeige').forEach(el => io.observe(el));

  /* Regal mit Maus ziehen */
  const regal = document.getElementById('regal');
  let zieht = false, sx = 0, sl = 0;
  regal.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; zieht = true; sx = e.clientX; sl = regal.scrollLeft; regal.style.scrollSnapType = 'none'; });
  addEventListener('pointermove', e => { if (zieht) regal.scrollLeft = sl - (e.clientX - sx); });
  addEventListener('pointerup', () => { if (zieht) { zieht = false; regal.style.scrollSnapType = ''; } });

  if (ruhig) return;

  /* Parallaxe der Gemini-Elemente: jede Szene bewegt ihre Elemente beim Scrollen
     unterschiedlich schnell (--s), im Hero zusätzlich mit der Maus (--t). */
  const szenen = [...document.querySelectorAll('[data-szene]')].map(s => ({
    s, els: [...s.querySelectorAll('.el')].map(el => ({ el, sp: parseFloat(getComputedStyle(el).getPropertyValue('--s')) || .3, t: parseFloat(getComputedStyle(el).getPropertyValue('--t')) || 1 }))
  }));
  const hero = document.querySelector('.hero');
  let mx = 0, my = 0, zx = 0, zy = 0;
  addEventListener('pointermove', e => { zx = e.clientX / innerWidth - .5; zy = e.clientY / innerHeight - .5; }, { passive: true });

  // Einflug im Hero: per Klasse, damit es nicht mit der Schwebe-Animation kollidiert
  setTimeout(() => hero.classList.add('los'), 120);

  const tick = () => {
    mx += (zx - mx) * .05; my += (zy - my) * .05;
    const vh = innerHeight;
    szenen.forEach(({ s, els }) => {
      const r = s.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const p = (r.top + r.height / 2 - vh / 2); // Abstand der Szenenmitte zur Bildschirmmitte
      els.forEach(({ el, sp, t }) => {
        const pc = Math.max(-900, Math.min(900, p));
        let y = -pc * sp, x = 0, rot = pc * sp * -.02;
        if (s === hero) { x = -mx * 50 * t; y += -my * 36 * t; rot += mx * 6 * t; }
        el.style.setProperty('--py', `${y.toFixed(1)}px`);
        el.style.translate = '';
        el.style.setProperty('--pr', `${rot.toFixed(2)}deg`);
        el.style.marginLeft = `${x.toFixed(1)}px`;
      });
    });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  /* Goldstaub im Hero (2D-Canvas) */
  const c = document.getElementById('staub'), g = c.getContext('2d');
  let W, H, teile = [], sichtbar = true;
  const gr = () => { const dpr = Math.min(devicePixelRatio, 2); W = c.width = hero.offsetWidth * dpr; H = c.height = hero.offsetHeight * dpr; };
  gr(); addEventListener('resize', gr);
  const N = innerWidth < 760 ? 45 : 90;
  for (let i = 0; i < N; i++) teile.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + .4, v: Math.random() * .00035 + .0001, ph: Math.random() * 6.28, dx: (Math.random() - .5) * .0002 });
  new IntersectionObserver(e => { sichtbar = e[0].isIntersecting; }).observe(hero);
  const staub = t => {
    if (sichtbar) {
      g.clearRect(0, 0, W, H);
      const dpr = W / hero.offsetWidth;
      teile.forEach(p => {
        p.y -= p.v; p.x += p.dx; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
        const a = .25 + .55 * (Math.sin(t / 900 + p.ph) * .5 + .5);
        g.beginPath(); g.arc(p.x * W, p.y * H, p.r * dpr, 0, 6.283);
        g.fillStyle = `rgba(245,214,150,${a})`; g.shadowColor = 'rgba(245,200,120,.9)'; g.shadowBlur = 8 * dpr; g.fill();
      });
    }
    requestAnimationFrame(staub);
  };
  requestAnimationFrame(staub);
})();
