const entries = [
  ['README.md', 'System Overview', 'Core Index', '⌂', 'README.SYS'],
  ['ARCHITECTURE.md', 'Master Architecture Specification', 'Core Index', '⌘', 'ROOT MAP'],
  ['CHANGELOG.md', 'System Changelog', 'Core Index', '∆', 'RELEASE LOG'],
  ['docs/core/azathoth-cpu-detailed.md', 'Azathoth CPU Technical Specification', 'Core OS', '⟊', 'PID 0'],
  ['docs/core/yog-sothoth-kernel-detailed.md', 'Yog-Sothoth: Unified Kernel & Temporal Database', 'Core OS', '◬', 'PID 1'],
  ['docs/core/boot-sequence.md', 'Boot Sequence & System Initialization', 'Core OS', '⏻', 'INIT'],
  ['docs/core/chaos-engineering.md', 'Chaos Engineering: The Simian Army', 'Core OS', '⚠', 'FAULT LAB'],
  ['docs/core/concurrency-threading.md', 'Concurrency, Threading & Scheduling Architecture', 'Core OS', '⋈', 'SCHED'],
  ['docs/core/consensus-raft.md', 'Raft Consensus: Agreement Among the Great Old Ones', 'Core OS', '♒', 'QUORUM'],
  ['docs/core/cryptography-authentication.md', 'Cryptography & Authentication Mechanisms', 'Core OS', '◇', 'AUTH'],
  ['docs/core/database-internals.md', 'Database Internals: The Yithian Archive', 'Core OS', '◎', 'YITH DB'],
  ['docs/core/filesystem-architecture.md', 'Filesystem Architecture: The Necronomicon', 'Core OS', '▤', 'INODE 666'],
  ['docs/core/memory-management.md', 'Memory Management & Heap Corruption', 'Core OS', '░', 'OOM'],
  ['docs/core/observability-monitoring.md', 'Observability & Monitoring Architecture', 'Core OS', '◉', 'WATCHERS'],
  ['docs/core/ota-updates.md', 'Over-the-Air Update System', 'Core OS', '↯', 'OTA'],
  ['docs/core/power-management.md', 'Power Management & Sleep States', 'Core OS', '☾', 'ACPI S4'],
  ['docs/core/process-management.md', 'Process Management & Signal Handling', 'Core OS', 'Ψ', 'PROC'],
  ['docs/core/scalability-c10k.md', 'The C10K to C10M Problem', 'Core OS', '∞', 'C10M'],
  ['docs/core/security-capabilities.md', 'Linux Capabilities & Security Contexts', 'Core OS', '⬡', 'SECCOMP'],
  ['docs/core/service-mesh.md', 'Service Mesh Architecture', 'Core OS', '⌗', 'ISTIO'],
  ['docs/nodes/cthulhu-rootkit-detailed.md', 'Cthulhu Rootkit: Compressed Malware', 'Entity Nodes', '☍', 'R’LYEH'],
  ['docs/nodes/hastur-virus-detailed.md', 'Hastur / The King in Yellow: Memetic Virus', 'Entity Nodes', '♛', 'HASTUR'],
  ['docs/protocols/aklo-protocol.md', 'The Aklo Protocol', 'Protocols', '⌬', 'LOW LEVEL'],
  ['docs/protocols/dreamlands-network-stack.md', 'The Dreamlands Network Stack', 'Protocols', '≋', 'OSI ∞'],
  ['docs/protocols/non-euclidean-rendering.md', 'Non-Euclidean Geometry Rendering Engine', 'Protocols', '∡', 'R’LYEH.GL'],
  ['docs/protocols/rem-injection.md', 'REM Sleep Packet Injection Protocol', 'Protocols', '⌁', 'THETA'],
  ['data/entities.json', 'Entity Registry', 'Data Vault', '♆', 'ENTITIES.JSON'],
  ['data/os-layers.csv', 'Operating System Layer Matrix', 'Data Vault', '▥', 'LAYERS.CSV'],
  ['data/process-table.json', 'Process & Signal Table', 'Data Vault', '⚙', 'PS.JSON'],
  ['data/coordinates.json', 'Forbidden Coordinate Registry', 'Data Vault', '⌖', 'GEO.JSON'],
  ['data/entity-replication.json', 'Yithian Replication Topology', 'Data Vault', '⑂', 'REPLICA.JSON'],
  ['data/raft-cluster.json', 'Great Old Ones Raft Cluster', 'Data Vault', '⛓', 'RAFT.JSON'],
  ['specs/openapi-nyarlathotep.yaml', 'Nyarlathotep REST API', 'Artifacts', '✣', 'OPENAPI 3'],
  ['specs/compression/cthulhu-compression-spec.md', 'Cthulhu Compression Specification', 'Artifacts', '▣', 'XZ-9'],
  ['specs/shaders/non-euclidean-vertex.glsl', 'Non-Euclidean Vertex Shader', 'Artifacts', '◭', 'GLSL'],
  ['specs/system-calls/necronomicon-api.md', 'The Necronomicon System Call API', 'Artifacts', '☷', 'SYSCALL'],
  ['specs/systemd/azathoth.service', 'Azathoth systemd Service', 'Artifacts', '⏼', 'SYSTEMD'],
  ['specs/systemd/cthulhu-rootkit.timer', 'Cthulhu Rootkit Timer', 'Artifacts', '◴', '9999 YEARS'],
  ['refs/bibliography.md', 'Bibliography & Reading Sequence', 'References', '§', 'SOURCES']
].map(([path, title, category, glyph, tag]) => ({ path, title, category, glyph, tag }));

const categories = ['All Signals', ...new Set(entries.map((entry) => entry.category))];
const state = { active: entries[0], category: categories[0], query: '', paused: false };
const root = document.getElementById('root');

root.innerHTML = `
  <canvas id="underlayer" aria-hidden="true"></canvas>
  <div class="crt" aria-hidden="true"></div>
  <main>
    <nav class="top-bar" aria-label="Archive controls">
      <button class="wordmark" id="home-btn">GHOST_LOVECRAFT_OS // v∞</button>
      <button id="pause-btn">SILENCE THE CHOIR</button>
    </nav>
    <header class="hero">
      <div class="eyebrow">complete field archive / haunted systems theory</div>
      <pre class="sigil" aria-hidden="true">  /\\_∴_/\\
 &lt;  ◉  ◉  &gt;
  \\/⌬_\\\\//
  39 SIGNALS ONLINE</pre>
      <h1>The entire Mythos<br>is now running.</h1>
      <p class="lede">Every document, protocol, dataset, shader, service, and forbidden coordinate from <b>lovecraft_os</b>—preserved whole inside one searchable terminal organism.</p>
      <div class="archive-stats"><span>39 ENTRIES</span><span>156,626 BYTES INGESTED</span><span>0 SANITY CHECKS</span></div>
    </header>
    <section class="archive-shell" aria-labelledby="archive-title">
      <div class="archive-heading">
        <div><p class="kicker">/DEV/UNDERLAYER/INDEX</p><h2 id="archive-title">Signal Archive</h2></div>
        <label class="search-label">SEARCH THE STATIC
          <input id="search" type="search" placeholder="entity, protocol, file..." autocomplete="off">
        </label>
      </div>
      <div class="filters" id="filters" aria-label="Entry categories"></div>
      <p class="result-count" id="result-count" aria-live="polite"></p>
      <div class="entry-grid" id="entry-grid"></div>
    </section>
    <section class="reader" id="reader" aria-labelledby="reader-title">
      <div class="reader-chrome">
        <div>
          <p class="kicker" id="reader-path"></p>
          <h2 id="reader-title">Select a signal</h2>
        </div>
        <a id="source-link" target="_blank" rel="noreferrer">VIEW SOURCE ↗</a>
      </div>
      <div class="reader-status" id="reader-status">AWAITING INVOCATION</div>
      <pre class="source-text" id="source-text" tabindex="0"></pre>
    </section>
    <footer>COMPLETE MIRROR OF <a href="https://github.com/merrypranxter/lovecraft_os" target="_blank" rel="noreferrer">LOVECRAFT_OS</a> AT COMMIT <code>f62f21d</code> // THIS ARCHIVE IS AN ARTIFACT. SANITY NOT GUARANTEED.</footer>
  </main>`;

const grid = document.getElementById('entry-grid');
const filters = document.getElementById('filters');
const sourceText = document.getElementById('source-text');
const reader = document.getElementById('reader');

function visibleEntries() {
  const query = state.query.toLowerCase();
  return entries.filter((entry) => {
    const inCategory = state.category === 'All Signals' || entry.category === state.category;
    const searchable = `${entry.title} ${entry.path} ${entry.tag} ${entry.category}`.toLowerCase();
    return inCategory && searchable.includes(query);
  });
}

function renderFilters() {
  filters.replaceChildren(...categories.map((category) => {
    const button = document.createElement('button');
    button.className = state.category === category ? 'filter active' : 'filter';
    button.textContent = category;
    button.setAttribute('aria-pressed', String(state.category === category));
    button.addEventListener('click', () => {
      state.category = category;
      renderFilters();
      renderGrid();
    });
    return button;
  }));
}

function renderGrid() {
  const visible = visibleEntries();
  document.getElementById('result-count').textContent = `${visible.length} SIGNAL${visible.length === 1 ? '' : 'S'} DETECTED`;
  grid.replaceChildren(...visible.map((entry, index) => {
    const button = document.createElement('button');
    button.className = `entry-card${state.active.path === entry.path ? ' active' : ''}`;
    button.style.setProperty('--tilt', `${(index % 5 - 2) * 0.35}deg`);
    button.innerHTML = `<span class="entry-number">${String(entries.indexOf(entry) + 1).padStart(2, '0')}</span><span class="entry-glyph">${entry.glyph}</span><span class="entry-tag">${entry.tag}</span><strong>${entry.title}</strong><small>${entry.path}</small>`;
    button.addEventListener('click', () => openEntry(entry));
    return button;
  }));
}

async function openEntry(entry, scroll = true) {
  state.active = entry;
  renderGrid();
  document.getElementById('reader-title').textContent = entry.title;
  document.getElementById('reader-path').textContent = `${entry.category} // ${entry.path}`;
  document.getElementById('source-link').href = `https://github.com/merrypranxter/lovecraft_os/blob/f62f21d96800243c4a9889159d738887542ca72b/${entry.path}`;
  document.getElementById('reader-status').textContent = 'DECOMPRESSING SIGNAL…';
  sourceText.textContent = '';
  try {
    const response = await fetch(new URL(`./content/${entry.path}`, import.meta.url));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const content = await response.text();
    sourceText.textContent = content;
    document.getElementById('reader-status').textContent = `${content.length.toLocaleString()} CHARACTERS // COMPLETE TRANSMISSION`;
  } catch {
    document.getElementById('reader-status').textContent = 'SIGNAL LOST // SOURCE UNAVAILABLE';
    sourceText.textContent = 'This archive entry could not be loaded.';
  }
  if (scroll) reader.scrollIntoView({ behavior: state.paused ? 'auto' : 'smooth', block: 'start' });
  triggerSummonEffect();
}

document.getElementById('search').addEventListener('input', (event) => {
  state.query = event.currentTarget.value;
  renderGrid();
});

document.getElementById('home-btn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: state.paused ? 'auto' : 'smooth' });
});

document.getElementById('pause-btn').addEventListener('click', (event) => {
  state.paused = !state.paused;
  event.currentTarget.textContent = state.paused ? 'RESUME THE RITUAL' : 'SILENCE THE CHOIR';
});

const canvas = document.getElementById('underlayer');
const ctx = canvas.getContext('2d');
const particles = Array.from({ length: 110 }, () => ({
  x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0008,
  vy: (Math.random() - 0.5) * 0.0006, size: Math.random() * 2.2 + 0.6,
  hue: 160 + Math.random() * 120, alpha: Math.random() * 0.55 + 0.2
}));
let time = 0;
let flash = 0;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function triggerSummonEffect() {
  flash = 1;
}

function draw() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  ctx.fillStyle = '#05040a';
  ctx.fillRect(0, 0, width, height);
  const gradient = ctx.createRadialGradient(width * 0.5, height * 0.3, 30, width * 0.5, height * 0.4, Math.max(width, height));
  gradient.addColorStop(0, `hsla(${280 + Math.sin(time) * 35}, 95%, 22%, ${0.5 + flash * 0.22})`);
  gradient.addColorStop(0.48, 'rgba(5,4,10,.6)');
  gradient.addColorStop(1, '#05040a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(0,255,204,.14)';
  for (let ring = 0; ring < 5; ring += 1) {
    ctx.beginPath();
    ctx.arc(width * 0.72, height * 0.32, (ring + 1) * 55 + Math.sin(time + ring) * 9, time * (ring % 2 ? -0.08 : 0.08), Math.PI * 1.65);
    ctx.stroke();
  }

  particles.forEach((particle, index) => {
    if (!state.paused) {
      particle.x = (particle.x + particle.vx + 1) % 1;
      particle.y = (particle.y + particle.vy + 1) % 1;
    }
    ctx.fillStyle = `hsla(${particle.hue + Math.sin(time + index) * 20},100%,70%,${particle.alpha})`;
    ctx.beginPath();
    ctx.arc(particle.x * width, particle.y * height, particle.size + flash * 1.5, 0, Math.PI * 2);
    ctx.fill();
  });
  if (!state.paused) time += 0.012;
  flash *= 0.92;
  requestAnimationFrame(draw);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
renderFilters();
renderGrid();
openEntry(entries[0], false);
draw();
