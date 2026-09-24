(() => {
  const $ = (id) => document.getElementById(id);
  const els = {
    beach: $("beach"), frame: $("frame"), postcard: $("postcard"), wipeout: $("wipeout"),
    now: $("now"), nowTitle: $("now-title"), nowDomain: $("now-domain"), nowBlurb: $("now-blurb"),
    next: $("next"), start: $("start"), back: $("back"), stoke: $("stoke"), open: $("open"), home: $("home"),
    countN: $("count-n"), chips: $("chips"),
    quiver: $("quiver"), quiverBtn: $("quiver-btn"), quiverClose: $("quiver-close"),
    quiverList: $("quiver-list"), quiverEmpty: $("quiver-empty"), quiverN: $("quiver-n"),
    pcTitle: $("pc-title"), pcDomain: $("pc-domain"), pcBlurb: $("pc-blurb"), pcOpen: $("pc-open"),
    wave: $("wave"), rig: $("rig"), rider: $("rider"), rigLabel: $("rig-label"), toast: $("toast"),
  };

  const SITES = window.SITES;
  const byUrl = new Map(SITES.map((s) => [s.url, s]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  // ── persisted bits (localStorage can be unavailable; never let that break surfing) ──
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem("surf:" + key); return v === null ? fallback : JSON.parse(v); }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("surf:" + key, JSON.stringify(value)); } catch {}
    },
  };

  const state = {
    category: store.get("category", "all"),
    quiver: store.get("quiver", []),
    wipeouts: new Set(store.get("wipeouts", [])),
    count: store.get("count", 0),
    history: [],
    pos: -1,
    deck: [],
    busy: false,
  };

  // ── helpers ──────────────────────────────────────────────
  const domain = (url) => new URL(url).hostname.replace(/^www\./, "");
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const current = () => state.history[state.pos] || null;
  const ridesInFrame = (site) => site.frame !== false && !state.wipeouts.has(site.url);

  let toastTimer;
  function toast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2200);
  }

  function pool() {
    return state.category === "all" ? SITES : SITES.filter((s) => s.tags.includes(state.category));
  }

  // Shuffle the current break into a deck so every site comes up once before any repeats.
  function draw() {
    if (!state.deck.length) {
      const recent = current()?.url;
      state.deck = pool().map((s) => s.url).sort(() => Math.random() - 0.5);
      if (state.deck.length > 1 && state.deck[state.deck.length - 1] === recent) state.deck.unshift(state.deck.pop());
    }
    return byUrl.get(state.deck.pop());
  }

  // ── the wave ─────────────────────────────────────────────
  const EASE = "cubic-bezier(.5, 0, .25, 1)";

  function measure() {
    const vw = innerWidth;
    const back = els.rig.querySelector(".rig-back").getBoundingClientRect().width;
    const rigW = els.rig.getBoundingClientRect().width;
    const riderW = els.rider.getBoundingClientRect().width;
    return { vw, back, rigW, riderW };
  }

  // Wave rolls in from the left until it covers the whole screen, surfer riding behind its lip.
  async function waveIn(label) {
    els.rigLabel.innerHTML = label;
    els.wave.classList.add("active");
    document.body.classList.add("riding");
    const { vw, back, rigW, riderW } = measure();
    const surferX = vw * 0.42 - riderW / 2;
    const opts = { duration: 850, easing: EASE, fill: "forwards" };
    await Promise.all([
      els.rig.animate([{ transform: `translateX(${-rigW}px)` }, { transform: `translateX(${-back}px)` }], opts).finished,
      els.rider.animate([
        { transform: `translate(${-riderW - 40}px, 60px) rotate(-18deg)` },
        { transform: `translate(${surferX}px, 0) rotate(0)` },
      ], opts).finished,
    ]);
  }

  // Wave carries on off to the right, revealing the new page behind it.
  async function waveOut() {
    const { vw, back, riderW } = measure();
    const surferX = vw * 0.42 - riderW / 2;
    const opts = { duration: 850, easing: EASE, fill: "forwards" };
    await Promise.all([
      els.rig.animate([{ transform: `translateX(${-back}px)` }, { transform: `translateX(${vw}px)` }], opts).finished,
      els.rider.animate([
        { transform: `translate(${surferX}px, 0) rotate(0)` },
        { transform: `translate(${vw + back + 20}px, -40px) rotate(14deg)` },
      ], opts).finished,
    ]);
    els.wave.classList.remove("active");
    document.body.classList.remove("riding");
    els.rig.getAnimations().forEach((a) => a.cancel());
    els.rider.getAnimations().forEach((a) => a.cancel());
  }

  // ── rendering a spot ─────────────────────────────────────
  let loadToken = 0;
  let wipeoutTimer;

  // Swap the stage to `site` (or the beach when null). Resolves once the frame loads or we give up waiting.
  function show(site) {
    const token = ++loadToken;
    clearTimeout(wipeoutTimer);
    els.wipeout.hidden = true;
    document.body.classList.toggle("surfing", !!site);

    els.beach.hidden = !!site;
    els.now.hidden = !site;
    els.open.hidden = !site;
    els.back.disabled = state.pos <= 0 || !site;
    els.stoke.disabled = !site;

    if (!site) {
      els.frame.hidden = true;
      els.postcard.hidden = true;
      els.frame.removeAttribute("src");
      history.replaceState(null, "", location.pathname + location.search);
      return Promise.resolve();
    }

    els.nowTitle.textContent = site.title;
    els.nowDomain.textContent = domain(site.url);
    els.nowBlurb.textContent = site.blurb;
    els.open.href = site.url;
    els.stoke.classList.toggle("on", state.quiver.includes(site.url));
    history.replaceState(null, "", "#" + encodeURIComponent(site.url));

    if (!ridesInFrame(site)) {
      els.frame.hidden = true;
      els.frame.removeAttribute("src");
      els.postcard.hidden = false;
      els.pcTitle.textContent = site.title;
      els.pcDomain.textContent = domain(site.url);
      els.pcBlurb.textContent = site.blurb;
      els.pcOpen.href = site.url;
      return Promise.resolve();
    }

    els.postcard.hidden = true;
    els.frame.hidden = false;
    wipeoutTimer = setTimeout(() => { if (token === loadToken) els.wipeout.hidden = false; }, 2500);
    return new Promise((resolve) => {
      const done = () => { if (token === loadToken) resolve(); };
      els.frame.addEventListener("load", done, { once: true });
      setTimeout(done, 2600); // don't hold the wave forever on a slow break
      els.frame.src = site.url;
    });
  }

  async function go(site, { count = false } = {}) {
    if (state.busy) return;
    state.busy = true;
    closeQuiver();
    try {
      if (reduceMotion.matches) {
        await show(site);
      } else {
        const label = site
          ? `catching a wave to…<small>${esc(domain(site.url))}</small>`
          : `paddling back to the beach…`;
        await waveIn(label);
        await Promise.all([show(site), wait(350)]);
        await waveOut();
      }
      if (count) {
        state.count += 1;
        store.set("count", state.count);
        els.countN.textContent = state.count;
      }
    } finally {
      state.busy = false;
    }
  }

  // ── navigation ───────────────────────────────────────────
  function surfNext() {
    const site = draw();
    if (!site) return;
    state.history = state.history.slice(0, state.pos + 1);
    state.history.push(site);
    state.pos = state.history.length - 1;
    go(site, { count: true });
  }

  function surfTo(site) {
    state.history = state.history.slice(0, state.pos + 1);
    state.history.push(site);
    state.pos = state.history.length - 1;
    go(site);
  }

  function surfBack() {
    if (state.pos <= 0 || state.busy) return;
    state.pos -= 1;
    go(current());
  }

  function goHome() {
    if (!current() || state.busy) return;
    state.pos = -1;
    state.history = [];
    go(null);
  }

  // ── categories ───────────────────────────────────────────
  function renderChips() {
    els.chips.innerHTML = window.CATEGORIES.map((c) =>
      `<button class="chip" data-cat="${c.id}" aria-pressed="${c.id === state.category}">${c.icon} ${esc(c.label)}</button>`
    ).join("");
  }

  els.chips.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn || btn.dataset.cat === state.category) return;
    state.category = btn.dataset.cat;
    state.deck = [];
    store.set("category", state.category);
    renderChips();
    const n = pool().length;
    toast(`${n} wave${n === 1 ? "" : "s"} at this break`);
  });

  // ── quiver (saved sites) ─────────────────────────────────
  function renderQuiver() {
    const saved = state.quiver.map((u) => byUrl.get(u)).filter(Boolean);
    els.quiverN.hidden = !saved.length;
    els.quiverN.textContent = saved.length;
    els.quiverEmpty.hidden = !!saved.length;
    els.quiverList.innerHTML = saved.map((s) => `
      <li>
        <button class="ride" data-url="${esc(s.url)}"><b>${esc(s.title)}</b><small>${esc(domain(s.url))}</small></button>
        <a class="icon-btn" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="Open ${esc(s.title)} in new tab">↗</a>
        <button class="drop" data-url="${esc(s.url)}" aria-label="Remove ${esc(s.title)}">✕</button>
      </li>`).join("");
  }

  function toggleStoke() {
    const site = current();
    if (!site) return;
    const i = state.quiver.indexOf(site.url);
    if (i === -1) { state.quiver.push(site.url); toast("Stoked! Added to your quiver 🤙"); }
    else { state.quiver.splice(i, 1); toast("Removed from your quiver"); }
    store.set("quiver", state.quiver);
    els.stoke.classList.toggle("on", i === -1);
    els.stoke.classList.remove("pop");
    void els.stoke.offsetWidth;
    els.stoke.classList.add("pop");
    renderQuiver();
  }

  function closeQuiver() { els.quiver.hidden = true; }

  els.quiverBtn.addEventListener("click", () => { els.quiver.hidden = !els.quiver.hidden; });
  els.quiverClose.addEventListener("click", closeQuiver);
  els.quiverList.addEventListener("click", (e) => {
    const ride = e.target.closest(".ride");
    const drop = e.target.closest(".drop");
    if (ride) surfTo(byUrl.get(ride.dataset.url));
    if (drop) {
      state.quiver = state.quiver.filter((u) => u !== drop.dataset.url);
      store.set("quiver", state.quiver);
      if (current()?.url === drop.dataset.url) els.stoke.classList.remove("on");
      renderQuiver();
    }
  });

  // ── wipeouts (sites that won't load in a frame) ──────────
  els.wipeout.addEventListener("click", () => {
    const site = current();
    if (!site) return;
    state.wipeouts.add(site.url);
    store.set("wipeouts", [...state.wipeouts]);
    show(site);
    toast("Wiped out! This one opens in a new tab from now on");
  });

  // ── wiring ───────────────────────────────────────────────
  els.next.addEventListener("click", surfNext);
  els.start.addEventListener("click", surfNext);
  els.back.addEventListener("click", surfBack);
  els.stoke.addEventListener("click", toggleStoke);
  els.home.addEventListener("click", goHome);

  addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest("input, textarea, select")) return;
    if (e.key === " " || e.key === "ArrowRight") { e.preventDefault(); surfNext(); }
    else if (e.key === "ArrowLeft") surfBack();
    else if (e.key === "s" || e.key === "S") toggleStoke();
    else if (e.key === "Escape") closeQuiver();
  });

  renderChips();
  renderQuiver();
  els.countN.textContent = state.count;
  if (!pool().length) state.category = "all";

  // A shared link (#https://…) drops you straight onto that wave.
  const shared = byUrl.get(decodeURIComponent(location.hash.slice(1)));
  if (shared) {
    state.history = [shared];
    state.pos = 0;
    show(shared);
  }
})();
