(() => {
  const bubble = document.querySelector('button.thought-main');
  if (!bubble) return;
  const deform = bubble.querySelector('.thought-shell');
  const container = bubble.querySelector('.thought-images');
  const layers = new Map();
  let fading = false;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const files = ['otter', 'coffee', 'cat', 'question', 'music', 'idea'];
  let available = [], bag = [], current = 'idea', lastChange = -Infinity;
  let timer, frame, previous, fadeTimer, lastFrame = 0;
  let x = 0, y = 0, vx = 0, vy = 0;
  const clamp = (v, limit) => Math.max(-limit, Math.min(limit, v));
  function next() {
    if (fading || available.length < 2 || performance.now() - lastChange < 1550) return;
    if (!bag.length) bag = available.filter(name => name !== current).sort(() => Math.random() - .5);
    const name = bag.pop();
    const outgoing = layers.get(current);
    const incoming = layers.get(name);
    // Keep decoded images mounted: never swap a source during an opacity fade.
    fading = true;
    const finish = event => {
      if (event && (event.target !== incoming || event.propertyName !== 'opacity')) return;
      incoming.removeEventListener('transitionend', finish);
      clearTimeout(fallback);
      fading = false;
    };
    incoming.addEventListener('transitionend', finish);
    const fallback = setTimeout(() => finish(), reduced.matches ? 0 : 1650);
    outgoing?.classList.remove('is-visible');
    incoming.classList.add('is-visible');
    current = name;
    lastChange = performance.now();
  }
  function schedule() {
    clearInterval(timer);
    if (!document.hidden && !reduced.matches) timer = setInterval(next, 5000);
  }
  function tick(now) {
    const dt = Math.min((now - lastFrame) / 16.667 || 1, 2);
    lastFrame = now;
    vx = (vx - x * .018 * dt) * Math.pow(.76, dt);
    vy = (vy - y * .018 * dt) * Math.pow(.76, dt);
    x += vx * dt; y += vy * dt;
    const length = Math.hypot(x, y), angle = Math.atan2(y, x);
    // Rotate into the movement axis, stretch, then rotate back.
    deform.style.transform = `translate(${x}px,${y}px) rotate(${angle}rad) scale(${1 + Math.min(length * .003, .035)},${1 - Math.min(length * .0015, .018)}) rotate(${-angle}rad)`;
    if (Math.abs(x)+Math.abs(y)+Math.abs(vx)+Math.abs(vy) > .04) frame = requestAnimationFrame(tick);
    else { deform.style.transform = ''; frame = null; lastFrame = 0; }
  }
  function impulse(dx, dy) {
    if (reduced.matches) return;
    vx = clamp(vx + dx * .07, 1.5); vy = clamp(vy + dy * .07, 1.5);
    if (!frame) frame = requestAnimationFrame(tick);
  }
  bubble.addEventListener('pointerenter', e => {
    clearTimeout(fadeTimer);
    bubble.classList.add('is-brushed');
    previous = {x:e.clientX,y:e.clientY};
    impulse(e.movementX || 8,e.movementY || -4);
    next(); schedule();
  });
  bubble.addEventListener('pointermove', e => {
    if (previous) impulse(e.clientX-previous.x,e.clientY-previous.y);
    previous = {x:e.clientX,y:e.clientY};
  });
  bubble.addEventListener('pointerleave', () => {
    previous = null;
    // Let even a quick brush finish its fade before restoring the cloud.
    fadeTimer = setTimeout(() => bubble.classList.remove('is-brushed'), 400);
  });
  bubble.addEventListener('click', () => { next(); impulse(10,-8); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => {
    if (reduced.matches) { cancelAnimationFrame(frame); frame=null; x=y=vx=vy=0; deform.style.transform=''; }
    schedule();
  });
  Promise.all(files.map(async name => {
    const img = new Image();
    img.className = 'thought-image';
    img.alt = '';
    img.draggable = false;
    img.src = `assets/${name}.png`;
    try { await img.decode(); } catch { return null; }
    layers.set(name, img);
    return name;
  })).then(names => {
    const ready = names.filter(Boolean);
    if (!ready.length) return;
    if (!layers.has(current)) current = ready[0];
    layers.get(current).classList.add('is-visible');
    container.replaceChildren(...ready.map(name => layers.get(name)));
    // Allow initial opacity styles to paint before enabling any transitions.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      available = ready;
      schedule();
    }));
  });
})();
