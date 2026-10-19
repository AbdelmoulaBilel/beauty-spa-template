/* Maison Éclat — interactions. Le contenu est dans data.js. */
(function () {
  'use strict';
  var S = window.SITE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  $('#year').textContent = new Date().getFullYear();

  /* coordonnées depuis data.js */
  $$('[data-site]').forEach(function (el) {
    var k = el.getAttribute('data-site'); el.textContent = S[k];
    var h = el.getAttribute('data-href');
    if (h === 'tel') el.href = 'tel:' + S.telephone.replace(/[^\d+]/g, '');
    if (h === 'mailto') el.href = 'mailto:' + S.email;
  });
  var c = S.carte;
  $('#map').src = 'https://www.openstreetmap.org/export/embed.html?bbox=' + (c.lng - .01) + ',' + (c.lat - .006) + ',' + (c.lng + .01) + ',' + (c.lat + .006) + '&layer=mapnik&marker=' + c.lat + ',' + c.lng;

  /* menu */
  var nav = $('#nav'), burger = $('.burger'), header = $('.header');
  function setMenu(open) {
    nav.classList.toggle('is-open', open); document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  var links = $$('.nav a[href^="#"]:not(.btn)'), top = $('.to-top');
  function onScroll() {
    header.classList.toggle('is-solid', scrollY > 60);
    top.classList.toggle('is-on', scrollY > 900);
    var cur = null;
    links.forEach(function (a) { var s = $(a.getAttribute('href')); if (s && s.getBoundingClientRect().top < 160) cur = a; });
    links.forEach(function (a) { a.classList.toggle('is-active', a === cur); });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* diaporama */
  var slides = $$('.slide'), titles = $$('.ht'), dots = $$('.hero__dots button'), si = 0, timer;
  function show(i) {
    si = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('is-on', k === si); });
    titles.forEach(function (t, k) { t.classList.toggle('is-on', k === si); });
    dots.forEach(function (d, k) { d.setAttribute('aria-selected', String(k === si)); });
    clearTimeout(timer); if (!reduce) timer = setTimeout(function () { show(si + 1); }, 7000);
  }
  dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); }); });
  show(0);

  /* carte des soins (onglets) */
  var tabs = $('#tabs'), panels = $('#panels'), select = $('#soinSelect');
  S.categories.forEach(function (cat, i) {
    var b = document.createElement('button');
    b.className = 'tab'; b.type = 'button'; b.setAttribute('role', 'tab'); b.id = 'tab-' + cat.id;
    b.setAttribute('aria-controls', 'panel'); b.textContent = cat.titre;
    b.addEventListener('click', function () { openTab(i, true); });
    tabs.appendChild(b);
    var g = document.createElement('optgroup'); g.label = cat.titre;
    cat.soins.forEach(function (s) { var o = document.createElement('option'); o.textContent = s.titre; g.appendChild(o); });
    select.appendChild(g);
  });
  function openTab(i, focus) {
    var cat = S.categories[i];
    $$('.tab', tabs).forEach(function (t, k) { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
    panels.innerHTML = '<div class="panel" id="panel" role="tabpanel" aria-labelledby="tab-' + cat.id + '"><p class="panel__intro">' + esc(cat.intro) + '</p><div class="cards">' +
      cat.soins.map(function (s) {
        return '<article class="card"><div class="card__img"><img src="' + esc(s.img) + '" alt="' + esc(s.titre) + '" loading="lazy" width="900" height="620"></div>' +
          '<div class="card__body"><h3>' + esc(s.titre) + '</h3><p>' + esc(s.texte) + '</p><button class="card__book" type="button" data-soin="' + esc(s.titre) + '">Réserver ce soin</button></div></article>';
      }).join('') + '</div></div>';
    if (focus) { var act = $('.tab[aria-selected="true"]', tabs); act.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' }); }
  }
  tabs.addEventListener('keydown', function (e) {
    var cur = $$('.tab', tabs).findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { var n = (cur + (e.key === 'ArrowRight' ? 1 : -1) + S.categories.length) % S.categories.length; openTab(n, true); $$('.tab', tabs)[n].focus(); }
  });
  panels.addEventListener('click', function (e) {
    var b = e.target.closest('[data-soin]'); if (!b) return;
    select.value = b.getAttribute('data-soin');
    var form = $('#form'); form.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    form.classList.remove('flash'); void form.offsetWidth; form.classList.add('flash');
    setTimeout(function () { form.nom.focus({ preventScroll: true }); }, 600);
  });
  openTab(0);

  /* témoignages */
  var q = $('#quotes'), qd = $('#quoteDots'), qi = 0, qt;
  q.innerHTML = S.temoignages.map(function (t) { return '<figure class="quote"><blockquote>' + esc(t.texte) + '</blockquote><figcaption>' + esc(t.nom) + '</figcaption></figure>'; }).join('');
  qd.innerHTML = S.temoignages.map(function (_, i) { return '<button type="button" aria-label="Témoignage ' + (i + 1) + '"></button>'; }).join('');
  function showQ(i) {
    qi = (i + S.temoignages.length) % S.temoignages.length;
    $$('.quote', q).forEach(function (el, k) { el.classList.toggle('is-on', k === qi); });
    $$('button', qd).forEach(function (el, k) { el.setAttribute('aria-selected', String(k === qi)); });
    clearTimeout(qt); if (!reduce) qt = setTimeout(function () { showQ(qi + 1); }, 6000);
  }
  $$('button', qd).forEach(function (b, k) { b.addEventListener('click', function () { showQ(k); }); });
  showQ(0);

  /* révélations au défilement */
  var rv = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('is-in'); io.unobserve(x.target); } }); }, { threshold: .15 });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('is-in'); });

  /* formulaire */
  $('#form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, msg = $('.form__msg', f);
    var bad = $$('[required]', f).filter(function (i) { return !i.checkValidity(); });
    $$('.is-bad', f).forEach(function (i) { i.classList.remove('is-bad'); });
    if (bad.length) { bad.forEach(function (i) { i.classList.add('is-bad'); }); bad[0].focus(); msg.textContent = 'Merci de compléter les champs indiqués.'; return; }
    var data = { nom: f.nom.value, tel: f.tel.value, email: f.email.value, soin: f.soin.value || 'Conseil', message: f.message.value };
    if (!S.formEndpoint) {
      msg.textContent = 'Votre messagerie va s’ouvrir pour envoyer la demande.';
      location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent('Rendez-vous — ' + data.soin) + '&body=' + encodeURIComponent(data.message + '\n\n' + data.nom + ' · ' + data.tel + ' · ' + data.email);
      return;
    }
    fetch(S.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { if (!r.ok) throw 0; msg.textContent = 'Merci ! Nous revenons vers vous très vite.'; f.reset(); })
      .catch(function () { msg.textContent = 'Envoi impossible pour le moment. Appelez-nous ou écrivez-nous directement.'; });
  });
})();
