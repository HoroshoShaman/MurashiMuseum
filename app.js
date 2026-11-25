'use strict';
/* Музей мурашей — зал кружков. Всё содержимое зашифровано (AES-GCM); ключ живёт в ссылке (#k=…) и в телефоне. */
(() => {
const VER = '5';
const MEDIA = 'mm-media-v1';
const ITER = 600000;
const SILENT = 'data:video/mp4;base64,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cmVmPTAgbWVfcmFuZ2U9MTYgY2hyb21hX21lPTEgdHJlbGxpcz0wIDh4OGRjdD0xIGNxbT0wIGRlYWR6b25lPTIxLDExIGZhc3RfcHNraXA9MSBjaHJvbWFfcXBfb2Zmc2V0PTAgdGhyZWFkcz0xIGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MyBiX3B5cmFtaWQ9MiBiX2FkYXB0PTEgYl9iaWFzPTAgZGlyZWN0PTEgd2VpZ2h0Yj0xIG9wZW5fZ29wPTAgd2VpZ2h0cD0xIGtleWludD0yNTAga2V5aW50X21pbj0xMCBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTEwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjMuMCBxY29tcD0wLjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAABFliIQAP//c/gu5/KMU+y8v/wAAAAhBmiIYhv/+4N4CAExhdmM2MC4zMS4xMDIAAjBADgAAAAgBnkFEN/+6gQEYIAcBGCAHARggBwEYIAcBGCAHARggBwEYIAcBGCAHARggBwEYIAcBGCAHARggBwEYIAc=';
const C = 306.6;                       // длина окружности кольца (r = 48.8)
const MON_N = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
const MON_G = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pad3 = n => String(n).padStart(3, '0');
const pad2 = n => String(n).padStart(2, '0');
const plural = (n, f) => f[(n % 10 === 1 && n % 100 !== 11) ? 0 : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? 1 : 2];
const mmss = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + pad2(s % 60); };
const norm = s => String(s || '').toLowerCase().replace(/ё/g, 'е');
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
const ymd = it => [+it.ts.slice(0, 4), +it.ts.slice(5, 7), +it.ts.slice(8, 10)];
const tsDate = it => new Date(it.ts.slice(0, 4), +it.ts.slice(5, 7) - 1, +it.ts.slice(8, 10), +it.ts.slice(11, 13), +it.ts.slice(14, 16));
const stampOf = it => { const [Y, M, D] = ymd(it); return `${pad2(D)}.${pad2(M)}.${Y} · ${it.ts.slice(11, 16)}`; };
const shortDate = it => it.ts.slice(8, 10) + '.' + it.ts.slice(5, 7);

let KEY = null, KEYSTR = '', ITEMS = [], BYN = new Map(), THUMB = {}, KINDS = '';

/* ------------------------------------------------------------------ шифр */
function b64uDec(s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '=';
  const b = atob(s), u = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i);
  return u;
}
function b64uEnc(u) { let s = ''; for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
async function decrypt(key, bytes) {
  const u = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv: u.subarray(0, 12) }, key, u.subarray(12));
}
async function readAll(res, onp) {
  const total = +res.headers.get('content-length') || 0;
  if (!res.body || !res.body.getReader || !onp) return new Uint8Array(await res.arrayBuffer());
  const rd = res.body.getReader(), parts = []; let got = 0;
  for (;;) {
    const { done, value } = await rd.read(); if (done) break;
    parts.push(value); got += value.length; if (total) onp(Math.min(1, got / total));
  }
  const out = new Uint8Array(got); let o = 0;
  for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
}
async function getBin(url) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const ctl = window.AbortController ? new AbortController() : null;
    const timer = ctl ? setTimeout(() => ctl.abort(), 15000) : 0;
    try {
      const r = await fetch(url, ctl ? { cache: 'no-cache', signal: ctl.signal } : { cache: 'no-cache' });
      if (r.ok) return new Uint8Array(await r.arrayBuffer());
    } catch (e) {} finally { clearTimeout(timer); }
    if (window.caches) { try { const m = await caches.match(url); if (m) return new Uint8Array(await m.arrayBuffer()); } catch (e) {} }
  }
  throw new Error('net');
}
const mediaUrl = n => `v/R${pad3(n)}.bin`;
async function mediaBytes(n, onp, fresh) {
  const url = mediaUrl(n);
  let res = null, cached = false;
  if (window.caches && !fresh) { try { res = await caches.match(url); cached = !!res; } catch (e) {} }
  if (!res) { res = await fetch(url, fresh ? { cache: 'reload' } : undefined); if (!res.ok) throw new Error('http ' + res.status); }
  const bytes = await readAll(res, onp);
  if (!cached && window.caches) {
    try { const c = await caches.open(MEDIA); await c.put(url, new Response(bytes, { headers: { 'Content-Type': 'application/octet-stream' } })); keepCount(); } catch (e) {}
  }
  return { data: bytes, cached };
}
async function dropCached(n) {
  if (!window.caches) return;
  try { const c = await caches.open(MEDIA); await c.delete(mediaUrl(n)); } catch (e) {}
}

/* ------------------------------------------------------------------ вход */
function show(id) {
  for (const s of document.querySelectorAll('.screen')) s.hidden = s.id !== id;
  window.scrollTo(0, 0);
}
async function openWith(raw) {
  const key = await crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['decrypt']);
  const cat = JSON.parse(new TextDecoder().decode(await decrypt(key, await getBin('c.bin'))));
  let th = {};
  try { th = JSON.parse(new TextDecoder().decode(await decrypt(key, await getBin('t.bin')))); } catch (e) {}
  KEY = key; KEYSTR = b64uEnc(raw);
  ITEMS = cat.items.slice().sort((a, b) => a.n - b.n);
  BYN = new Map(ITEMS.map(it => [it.n, it]));
  KINDS = cat.kinds || '';
  for (const k in th) THUMB[k] = 'data:image/jpeg;base64,' + th[k];
  store.set('mm.k', KEYSTR);
  const h = new URLSearchParams(location.hash.slice(1));
  if (h.get('k') !== KEYSTR) history.replaceState(history.state, '', location.pathname + location.search + '#k=' + KEYSTR);
}
async function boot() {
  setTimeout(() => {
    if ($('#boot').hidden) return;
    $('#boot p').textContent = 'Музей открывается дольше обычного. ';
    const b = document.createElement('button'); b.type = 'button'; b.className = 'link'; b.textContent = 'Обновить';
    b.addEventListener('click', () => location.reload()); $('#boot').appendChild(b);
  }, 20000);
  if (!window.crypto || !crypto.subtle) { $('#boot p').textContent = 'Этот браузер не умеет открывать музей. Открой ссылку в Safari или Chrome.'; return; }
  const cand = [];
  const h = new URLSearchParams(location.hash.slice(1)).get('k');
  if (h) cand.push(h);
  const s = store.get('mm.k'); if (s && s !== h) cand.push(s);
  for (const k of cand) {
    try { await openWith(b64uDec(k)); enter(); return; }
    catch (e) { if (e && e.message === 'net') { $('#boot p').textContent = 'Нет связи. Музей откроется, когда появится интернет.'; return; } }
  }
  show('lock');
}
$('#lockForm').addEventListener('submit', async ev => {
  ev.preventDefault();
  const err = $('#lockErr'), btn = ev.target.querySelector('button');
  const p = norm($('#pw').value).replace(/[^a-zа-я0-9]/g, '').replace(/^евгени[йяюе](?=.)/, '');
  if (!p) { err.textContent = 'Введи пароль.'; return; }
  btn.disabled = true; err.textContent = 'Проверяю…';
  try {
    const kw = await getBin('kw.bin');
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(p), 'PBKDF2', false, ['deriveKey']);
    const kek = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: kw.subarray(0, 16), iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    let raw = null;                                  // в kw.bin ключ завёрнут для нескольких форм пароля
    for (let i = 0, cnt = kw[16]; i < cnt && !raw; i++) {
      const o = 17 + i * 44;
      try { raw = new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: kw.subarray(o, o + 12) }, kek, kw.subarray(o + 12, o + 44))); } catch (e) {}
    }
    if (!raw) throw new Error('bad');
    await openWith(raw); err.textContent = ''; enter();
  } catch (e) {
    err.textContent = e && e.message === 'net' ? 'Нет связи. Попробуй, когда появится интернет.' : 'Пароль не подошёл. Подсказка — на конверте №74.';
  } finally { btn.disabled = false; }
});

/* ------------------------------------------------------------------ главная */
function nowDate() {
  const t = new URLSearchParams(location.search).get('today');
  return t && /^\d{4}-\d\d-\d\d$/.test(t) ? new Date(+t.slice(0, 4), +t.slice(5, 7) - 1, +t.slice(8, 10)) : new Date();
}
function tileHTML(it, extra) {
  const th = THUMB[it.n] ? `<img src="${THUMB[it.n]}" alt="" loading="lazy">` : '';
  return `<button type="button" class="tile" data-n="${it.n}" aria-label="Кружок ${pad3(it.n)}, ${esc(it.who)}, ${shortDate(it)}">` +
    `<span class="cw"><span class="c">${th}</span><span class="b">${pad3(it.n)}</span></span>` +
    `<span class="d"><i class="${it.who === 'Аля' ? 'a' : ''}"></i>${extra || shortDate(it)}</span></button>`;
}
function startHome() {
  const first = ITEMS[0], last = ITEMS[ITEMS.length - 1];
  const [y1, m1] = ymd(first), [y2, m2] = ymd(last);
  const span = y1 === y2 ? `с ${MON_G[m1 - 1]} по ${MON_N[m2 - 1]} ${y2}` : `с ${MON_G[m1 - 1]} ${y1} по ${MON_N[m2 - 1]} ${y2}`;
  $('#homeSub').textContent = `${ITEMS.length} ${plural(ITEMS.length, ['кружок', 'кружка', 'кружков'])} ${span} года`;
  const na = ITEMS.filter(i => i.who === 'Аля').length;
  $('#hallSub').textContent = `Аля записала ${na}, Женя — ${ITEMS.length - na}.`;
  renderToday(); keepCount(); installHint();
  show('home');
}
function renderToday() {
  const now = nowDate(), d = now.getDate(), m = now.getMonth() + 1, y = now.getFullYear();
  const list = ITEMS.filter(it => { const [Y, M, D] = ymd(it); return D === d && (Y < y || (Y === y && M < m)); })
    .sort((a, b) => b.ts.localeCompare(a.ts));
  $('#today').hidden = !list.length;
  $('#todayStrip').innerHTML = list.map(it => {
    const [Y, M] = ymd(it), diff = (y - Y) * 12 + (m - M);
    const ago = diff % 12 === 0 ? (diff === 12 ? 'год назад' : `${diff / 12} ${plural(diff / 12, ['год', 'года', 'лет'])} назад`)
      : diff === 1 ? 'месяц назад' : diff < 12 ? `${diff} ${plural(diff, ['месяц', 'месяца', 'месяцев'])} назад` : `${shortDate(it)}.${Y}`;
    return tileHTML(it, `${shortDate(it)}, ${ago}`);
  }).join('');
}

/* клавиатура */
let digits = '', padErr = false, goTimer = 0;
function padRender() { $('#digits').textContent = digits; }
function padMsg(t, bad) { const m = $('#padMsg'); m.textContent = t; m.classList.toggle('bad', !!bad); }
function padPress(k) {
  clearTimeout(goTimer);
  if (padErr) { padErr = false; digits = ''; padMsg('Номер с кружочком — из альбома.'); }
  if (k === 'del') digits = digits.slice(0, -1);
  else if (k === 'go') { padGo(); return; }
  else if (digits.length < 3) digits += k;
  padRender();
  if (digits.length === 3) {
    if (BYN.has(parseInt(digits, 10))) bless();   // ещё внутри нажатия: iOS разрешит звук
    goTimer = setTimeout(padGo, 260);
  }
}
function padGo() {
  const n = parseInt(digits || '0', 10);
  if (!n) { padMsg('Набери номер из альбома: он стоит рядом с кружочком ○.'); return; }
  if (BYN.has(n)) { digits = ''; padRender(); padMsg('Номер с кружочком — из альбома.'); openPlayer(n, ITEMS.map(i => i.n)); return; }
  const kd = KINDS[n - 1];
  const msg = kd === 'v' ? `♪${pad3(n)} — голосовое. Оно живёт на аудиогиде.`
    : kd === 'a' ? `♪${pad3(n)} — аудиозапись. Она на аудиогиде.`
    : kd === 's' ? `♪${pad3(n)} — сборная. Она на аудиогиде.`
    : `Экспоната ${pad3(n)} нет. Номера — от 001 до ${pad3(KINDS.length || 391)}.`;
  padErr = true; padMsg(msg, true);
  const env = $('#pad'); env.classList.remove('shake'); void env.offsetWidth; env.classList.add('shake');
}
$('#keys').addEventListener('click', e => { const b = e.target.closest('button'); if (b) padPress(b.dataset.k); });
document.addEventListener('keydown', e => {
  if (!$('#player').hidden) return playerKey(e);
  if ($('#home').hidden || e.target.tagName === 'INPUT') return;
  if (/^\d$/.test(e.key)) padPress(e.key);
  else if (e.key === 'Backspace') padPress('del');
  else if (e.key === 'Enter') padPress('go');
});
$('#btnRandom').addEventListener('click', () => {
  const pool = ITEMS.filter(i => i.n !== P.n);
  openPlayer(pool[Math.floor(Math.random() * pool.length)].n, ITEMS.map(i => i.n));
});
$('#btnHall').addEventListener('click', () => { history.pushState({ v: 'hall' }, '', location.href); openHall(); });
document.addEventListener('click', e => {
  const t = e.target.closest('.tile,.row'); if (!t || !t.dataset.n) return;
  const inHall = !!t.closest('#grid');
  openPlayer(+t.dataset.n, inHall ? HALL.list : ITEMS.map(i => i.n));
});

/* сохранение в телефон */
const KEEP = { busy: false, stop: false };
async function cachedSet() {
  if (!window.caches) return new Set();
  try { const c = await caches.open(MEDIA); return new Set((await c.keys()).map(r => new URL(r.url).pathname.split('/').pop())); }
  catch (e) { return new Set(); }
}
async function keepCount() {
  if (KEEP.busy) return;
  const have = await cachedSet();
  const n = ITEMS.filter(it => have.has(`R${pad3(it.n)}.bin`)).length, total = ITEMS.length;
  const mb = Math.round(ITEMS.filter(it => !have.has(`R${pad3(it.n)}.bin`)).reduce((s, it) => s + (it.sz || 0), 0) / 1e6);
  const btn = $('#btnKeep'), txt = $('#keepText');
  if (!window.caches) { txt.textContent = 'Этот браузер не умеет хранить кружки без интернета.'; btn.hidden = true; return; }
  if (n >= total) { txt.textContent = `Все ${total} кружков сохранены в телефоне — музей работает и без интернета.`; btn.hidden = true; return; }
  btn.hidden = false; btn.textContent = n ? 'Сохранить остальные' : 'Сохранить музей в телефон';
  txt.textContent = n ? `В телефоне сохранено ${n} из ${total}. Остальные откроются из интернета (ещё ≈ ${mb} МБ).`
    : `Кружки открываются из интернета. Если сохранить их в телефон (≈ ${mb} МБ), музей будет работать без связи.`;
}
$('#btnKeep').addEventListener('click', async () => {
  if (KEEP.busy) { KEEP.stop = true; return; }
  KEEP.busy = true; KEEP.stop = false;
  const btn = $('#btnKeep'), txt = $('#keepText'), bar = $('#keepBar');
  btn.textContent = 'Остановить'; bar.hidden = false;
  try { if (navigator.storage && navigator.storage.persist) await navigator.storage.persist(); } catch (e) {}
  const c = await caches.open(MEDIA), have = await cachedSet();
  const todo = ITEMS.filter(it => !have.has(`R${pad3(it.n)}.bin`));
  let done = ITEMS.length - todo.length, fail = 0;
  const step = () => { txt.textContent = `Сохраняю: ${done} из ${ITEMS.length}…`; bar.firstChild.style.width = (100 * done / ITEMS.length) + '%'; };
  step();
  const q = todo.slice();
  async function worker() {
    while (q.length && !KEEP.stop) {
      const it = q.shift();
      try { const r = await fetch(mediaUrl(it.n)); if (!r.ok) throw 0; await c.put(mediaUrl(it.n), r); done++; } catch (e) { fail++; }
      step();
    }
  }
  await Promise.all([worker(), worker(), worker()]);
  KEEP.busy = false; bar.hidden = true;
  await keepCount();
  if (fail && !KEEP.stop) $('#keepText').textContent += ` Не сохранилось: ${fail} — нажми ещё раз, когда связь будет лучше.`;
});
const isIOS = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isStandalone = () => navigator.standalone === true || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);
function installHint() { $('#install').hidden = !(isIOS() && !isStandalone()); }
function enter() {
  if (isIOS() && !isStandalone() && store.get('mm.welcomed') !== '1') { show('welcome'); return; }
  startHome();
}
$('#welcomeGo').addEventListener('click', () => { store.set('mm.welcomed', '1'); startHome(); });

/* ------------------------------------------------------------------ зал */
const HALL = { f: 'all', q: '', list: [] };
function openHall() { show('hall'); renderHall(); }
$('#hallBack').addEventListener('click', () => history.back());
$('#seg').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  HALL.f = b.dataset.f;
  for (const x of $('#seg').children) x.setAttribute('aria-pressed', String(x === b));
  renderHall();
});
let qTimer = 0;
$('#q').addEventListener('input', e => { clearTimeout(qTimer); qTimer = setTimeout(() => { HALL.q = e.target.value.trim(); renderHall(); }, 160); });
function hay(it) {
  if (!it._h) {
    const [Y, M, D] = ymd(it);
    it._h = norm([pad3(it.n), String(it.n), it.who, `${pad2(D)}.${pad2(M)}`, `${pad2(D)}.${pad2(M)}.${Y}`, `${D} ${MON_G[M - 1]}`,
      it.rub, it.title, it.quote, it.guide, (it.segs || []).map(s => s[2]).join(' ')].join(' \u0001 '));
  }
  return it._h;
}
function snippet(it, q) {
  const fields = [it.title, it.quote, it.guide, (it.segs || []).map(s => s[2]).join(' ')];
  for (const f of fields) {
    const i = norm(f).indexOf(q); if (i < 0) continue;
    const a = Math.max(0, i - 40), b = Math.min(f.length, i + q.length + 60);
    return (a ? '…' : '') + esc(f.slice(a, i)) + '<mark>' + esc(f.slice(i, i + q.length)) + '</mark>' + esc(f.slice(i + q.length, b)) + (b < f.length ? '…' : '');
  }
  return esc(it.title || it.quote || '');
}
function renderHall() {
  const q = norm(HALL.q);
  let list = ITEMS.filter(it => HALL.f === 'all' || it.who === HALL.f);
  if (q) list = list.filter(it => hay(it).includes(q));
  HALL.list = list.map(i => i.n);
  const g = $('#grid');
  if (!list.length) { g.innerHTML = `<p class="empty">${q ? 'Ничего не нашлось. Попробуй другое слово или дату в виде 25.08.' : 'Здесь пусто.'}</p>`; return; }
  if (q) {
    g.innerHTML = '<div class="rows">' + list.map(it =>
      `<button type="button" class="row" data-n="${it.n}"><span class="c">${THUMB[it.n] ? `<img src="${THUMB[it.n]}" alt="">` : ''}</span>` +
      `<span class="t"><b>${pad3(it.n)}</b>${esc(it.who)}, ${stampOf(it)}<span>${snippet(it, q)}</span></span></button>`).join('') + '</div>';
    return;
  }
  const groups = new Map();
  for (const it of list) { const k = it.ts.slice(0, 7); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(it); }
  let h = '';
  for (const [k, arr] of groups) {
    h += `<h3 class="month">${MON_N[+k.slice(5, 7) - 1]} ${k.slice(0, 4)}<small>${arr.length}</small></h3><div class="tiles">` + arr.map(it => tileHTML(it)).join('') + '</div>';
  }
  g.innerHTML = h;
}

/* ------------------------------------------------------------------ плеер */
const vid = $('#vid'), circle = $('#circle'), ring = $('#ring'), ringLoad = $('#ringLoad');
const P = { list: [], i: -1, n: 0, token: 0, url: null, raf: 0, blessed: false, ended: false, subs: store.get('mm.subs') === '1', lastFocus: null };
$('#plSubs').setAttribute('aria-pressed', String(P.subs));
function bless() {
  if (P.blessed) return; P.blessed = true;
  try {
    vid.dataset.real = '0'; vid.src = SILENT;
    const p = vid.play(); if (p) p.then(() => { if (vid.dataset.real !== '1') vid.pause(); }).catch(() => {});
  } catch (e) {}
}

const qmarks = s => esc(s || '').replace(/[«»„“]/g, m => `<span class="qm">${m}</span>`);
function whereText(it) {
  const ps = it.places || [], out = [];
  for (const p of ps) {
    const pg = p.p ? `, стр. ${p.p}` : '';
    if (p.k === 'l') out.push(ps.some(q => q.k === 'f' && q.env === p.env) ? `письмо в конверте №${p.env} и подпись на нём${pg}` : `письмо в конверте №${p.env}${pg}`);
    else if (p.k === 'f') { if (!ps.some(q => q.k === 'l' && q.env === p.env)) out.push(`подпись на конверте №${p.env}${pg}`); }
    else if (p.k === 'n') out.push(`записка в конверте №${p.env}${pg}`);
    else if (p.k === 'p') out.push(`подпись на стр. ${p.p}`);
  }
  return out.length ? 'В альбоме: ' + out.join('; ') + '.' : '';
}
function fillCaption(it) {
  $('#plBadge').textContent = pad3(it.n);
  const who = $('#plWho'); who.textContent = it.who; who.className = 'who' + (it.who === 'Аля' ? ' a' : '');
  $('#plStamp').textContent = stampOf(it);
  $('#plRub').innerHTML = qmarks(it.rub);
  $('#plTitle').innerHTML = qmarks(it.title);
  $('#plQuote').textContent = it.quote ? `«${it.quote.replace(/^[«"]|[»"]$/g, '')}»` : '';
  $('#plQuote').classList.toggle('main', !it.title);
  $('#plGuide').textContent = it.guide || '';
  $('#plWhere').textContent = whereText(it);
  const prev = P.list[P.i - 1], next = P.list[P.i + 1];
  $('#plPrev').hidden = !prev; $('#plNext').hidden = !next;
  $('#plPrev').textContent = prev ? `‹ ${pad3(prev)}` : '';
  $('#plNext').textContent = next ? `${pad3(next)} ›` : '';
  const ol = $('#plTrList');
  ol.innerHTML = (it.segs || []).map((s, i) => `<li data-i="${i}"><button type="button" data-t="${s[0]}"><span>${mmss(s[0])}</span>${esc(s[2])}</button></li>`).join('');
  $('#plTr').hidden = !(it.segs && it.segs.length);
  $('#plTime').textContent = mmss(it.dur);
  $('#plSubsText').textContent = '';
  $('#plSubsText').hidden = !P.subs;
}
function setRing(p) { ring.style.strokeDashoffset = String(C * (1 - Math.max(0, Math.min(1, p)))); }
function setLoad(p) { ringLoad.style.strokeDashoffset = String(C * (1 - p)); }
function openPlayer(n, list) {
  bless();
  P.list = list && list.length ? list : ITEMS.map(i => i.n);
  P.i = P.list.indexOf(n); if (P.i < 0) { P.list = ITEMS.map(i => i.n); P.i = P.list.indexOf(n); }
  const pl = $('#player');
  if (pl.hidden) {
    P.lastFocus = document.activeElement;
    pl.hidden = false; pl.classList.remove('open'); void pl.offsetWidth; pl.classList.add('open');
    document.body.style.overflow = 'hidden';
    history.pushState({ v: 'player' }, '', location.href);
  }
  playItem(n);
  $('#plClose').focus({ preventScroll: true });
}
function closePlayer(fromPop) {
  const pl = $('#player'); if (pl.hidden) return;
  P.token++; cancelAnimationFrame(P.raf);
  try { vid.pause(); } catch (e) {}
  vid.dataset.real = '0'; vid.removeAttribute('src'); try { vid.load(); } catch (e) {}
  if (P.url) { URL.revokeObjectURL(P.url); P.url = null; }
  pl.hidden = true; document.body.style.overflow = '';
  P.n = 0;
  if (!fromPop && history.state && history.state.v === 'player') history.back();
  if (P.lastFocus && P.lastFocus.focus) P.lastFocus.focus({ preventScroll: true });
  keepCount();
}
async function playItem(n) {
  const it = BYN.get(n); if (!it) return;
  bless();
  P.n = n; P.i = P.list.indexOf(n); P.ended = false;
  const tok = ++P.token;
  cancelAnimationFrame(P.raf);
  try { vid.pause(); } catch (e) {}
  circle.classList.remove('ready', 'paused'); circle.classList.add('loading');
  $('#plPoster').src = THUMB[n] || '';
  setRing(0); setLoad(0.04);
  fillCaption(it);
  $('.pl-scroll').scrollTop = 0;
  try {
    const onp = p => { if (tok === P.token) setLoad(Math.max(0.04, p)); };
    let got = await mediaBytes(n, onp), plain;
    if (tok !== P.token) return;
    try { plain = await decrypt(KEY, got.data); }
    catch (e) {
      if (!got.cached) throw e;                 // сохранённая копия испорчена — выбрасываем и качаем заново
      await dropCached(n);
      got = await mediaBytes(n, onp, true);
      if (tok !== P.token) return;
      plain = await decrypt(KEY, got.data);
    }
    if (tok !== P.token) return;
    const url = URL.createObjectURL(new Blob([plain], { type: 'video/mp4' }));
    if (P.url) URL.revokeObjectURL(P.url);
    P.url = url;
    vid.dataset.real = '1'; vid.muted = false; vid.src = url;
    setLoad(0);
    try { await vid.play(); } catch (e) { if (tok === P.token) { circle.classList.remove('loading'); circle.classList.add('paused'); } }
  } catch (e) {
    if (tok !== P.token) return;
    circle.classList.remove('loading'); circle.classList.add('paused'); setLoad(0);
    $('#plSubsText').hidden = false;
    $('#plSubsText').textContent = navigator.onLine === false ? 'Нет связи, а этот кружок ещё не сохранён в телефоне.' : 'Кружок не загрузился. Нажми на него, чтобы попробовать ещё раз.';
    circle.dataset.retry = '1';
  }
}
function tick() {
  if (vid.duration) setRing(vid.currentTime / vid.duration);
  P.raf = requestAnimationFrame(tick);
}
vid.addEventListener('playing', () => {
  if (vid.dataset.real !== '1') return;
  circle.classList.add('ready'); circle.classList.remove('loading', 'paused');
  cancelAnimationFrame(P.raf); P.raf = requestAnimationFrame(tick);
});
vid.addEventListener('pause', () => {
  if (vid.dataset.real !== '1') return;
  cancelAnimationFrame(P.raf);
  if (!P.ended) circle.classList.add('paused');
});
vid.addEventListener('timeupdate', () => {
  if (vid.dataset.real !== '1') return;
  const it = BYN.get(P.n); if (!it) return;
  const t = vid.currentTime;
  $('#plTime').textContent = mmss((vid.duration || it.dur) - t);
  const segs = it.segs || [];
  let cur = -1;
  for (let i = 0; i < segs.length; i++) { if (t >= segs[i][0] - 0.15 && t <= segs[i][1] + 0.6) { cur = i; break; } }
  if (P.subs) $('#plSubsText').textContent = cur >= 0 ? segs[cur][2] : '';
  const on = $('#plTrList li.on'), want = cur >= 0 ? $(`#plTrList li[data-i="${cur}"]`) : null;
  if (on !== want) { if (on) on.classList.remove('on'); if (want) want.classList.add('on'); }
});
vid.addEventListener('ended', () => {
  if (vid.dataset.real !== '1') return;
  P.ended = true; cancelAnimationFrame(P.raf); setRing(1);
  circle.classList.add('paused');
  const cur = BYN.get(P.n), nx = BYN.get(P.list[P.i + 1]);
  if (cur && nx && (tsDate(nx) - tsDate(cur)) <= 30 * 60000 && (tsDate(nx) - tsDate(cur)) >= 0) {
    const tok = P.token; setTimeout(() => { if (tok === P.token && !$('#player').hidden) playItem(nx.n); }, 700);
  }
});
$('#plTap').addEventListener('click', () => {
  if (circle.dataset.retry === '1') { circle.dataset.retry = ''; playItem(P.n); return; }
  if (vid.dataset.real !== '1') return;
  if (P.ended) { P.ended = false; vid.currentTime = 0; vid.play().catch(() => {}); return; }
  if (vid.paused) vid.play().catch(() => {}); else vid.pause();
});
$('#plPrev').addEventListener('click', () => { const n = P.list[P.i - 1]; if (n) playItem(n); });
$('#plNext').addEventListener('click', () => { const n = P.list[P.i + 1]; if (n) playItem(n); });
$('#plClose').addEventListener('click', () => closePlayer(false));
$('#plSubs').addEventListener('click', () => {
  P.subs = !P.subs; store.set('mm.subs', P.subs ? '1' : '0');
  $('#plSubs').setAttribute('aria-pressed', String(P.subs));
  $('#plSubsText').hidden = !P.subs; if (!P.subs) $('#plSubsText').textContent = '';
});
$('#plTrList').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || vid.dataset.real !== '1') return;
  vid.currentTime = +b.dataset.t; P.ended = false; vid.play().catch(() => {});
});
function playerKey(e) {
  if (e.key === 'Escape') closePlayer(false);
  else if (e.key === 'ArrowRight') $('#plNext').click();
  else if (e.key === 'ArrowLeft') $('#plPrev').click();
  else if (e.key === ' ' && e.target.tagName !== 'BUTTON') { e.preventDefault(); $('#plTap').click(); }
}
(() => {
  let x0 = 0, y0 = 0, t0 = 0;
  const st = $('#stage');
  st.addEventListener('touchstart', e => { const t = e.changedTouches[0]; x0 = t.clientX; y0 = t.clientY; t0 = Date.now(); }, { passive: true });
  st.addEventListener('touchend', e => {
    const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
    if (Date.now() - t0 < 700 && Math.abs(dx) > 60 && Math.abs(dx) > 1.6 * Math.abs(dy)) (dx < 0 ? $('#plNext') : $('#plPrev')).click();
  }, { passive: true });
})();

/* ------------------------------------------------------------------ история (кнопка «назад») */
window.addEventListener('popstate', () => {
  const v = history.state && history.state.v;
  if (!$('#player').hidden) closePlayer(true);
  if (v === 'hall') { if ($('#hall').hidden) show('hall'); }
  else if (!$('#hall').hidden) show('home');
});

/* ------------------------------------------------------------------ офлайн-оболочка */
if ('serviceWorker' in navigator && (location.protocol === 'https:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname))) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js', { scope: './' }).catch(() => {}));
}
window.addEventListener('online', () => { if (!$('#home').hidden) keepCount(); });

boot();
})();
