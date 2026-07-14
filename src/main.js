import './styles.css';

const sections = [
  { id:'boot', title:'Boot Sequence', glyph:'⟊', tag:'PID 0', text:'Reality wakes like a machine that never meant to become a world: a blind processor, a clock pulse, and user-space minds mistaking uptime for meaning.', note:'Inspired by the source repo’s Azathoth-as-CPU mapping: horror emerges from indifferent execution, not evil intent.', cmd:'exec --reality --no-semantic-awareness' },
  { id:'kernel', title:'Ghost Kernel', glyph:'◬', tag:'YOG://KERNEL', text:'Every moment is an addressable sector. The Gate and Key becomes a memory manager where past and future are permissions, not places.', note:'Yog-Sothoth is reimagined as the unified kernel: access control, database, temporal index, and forbidden pointer arithmetic.', cmd:'temporal_query --past --present --future' },
  { id:'memory', title:'Mythos Memory', glyph:'◎', tag:'COLD STORAGE', text:'Brains become portable media; cities become documentation; dreams become swap space. Myth is a storage layer for things humans cannot safely cache.', note:'Mi-Go cylinders, Yithian archives, bas-reliefs, and grimoires become backup systems and hazardous manuals.', cmd:'mount /dreamlands /mnt/unreliable' },
  { id:'daemon', title:'Daemon Cosmology', glyph:'✣', tag:'BACKGROUND JOBS', text:'Shoggoths automate labor, Hounds enforce geometry, and spawning engines fill the available RAM with life, bots, and ritual noise.', note:'The pantheon is treated as services and daemons: active, recursive, scheduled, and sometimes impossible to kill.', cmd:'systemctl status hounds-of-tindalos.service' },
  { id:'ritual', title:'Ritual Interface', glyph:'⌬', tag:'API SURFACE', text:'The rite is a command line wearing candles. True names are root calls; sigils are executable geometry; madness is output too large for the interface.', note:'The Necronomicon becomes documentation for dangerous system calls: accurate, useful, and unsafe to read without limits.', cmd:'POST /summon { credential: "yellow-sign" }' },
  { id:'theory', title:'Operating System as Haunted Theory', glyph:'☍', tag:'README.DREAD', text:'Lovecraft OS is less adaptation than diagram: cosmic horror as infrastructure theory, where the supernatural is a misread stack trace.', note:'This tour summarizes and remixes the source repo’s core premise: mythos entities mapped to hardware, software, networks, and security models.', cmd:'tail -f /var/log/underlayer' }
];

let active = 'boot';
let paused = false;
const root = document.getElementById('root');
root.innerHTML = `<canvas class="void-canvas" aria-hidden="true"></canvas><main><nav class="top"><b>LOVECRAFT_OS TOUR</b><button id="pause">Pause motion</button></nav><header class="hero"><div class="sigil" aria-label="animated ascii sigil"><span>  /\\_∴_/\\</span><span> &lt;  ◉  ◉  &gt;</span><span>  \\/⌬_\\//</span><span> sigil: AKLO-BOOT</span></div><p class="eyebrow">nonlinear visual explanation / haunted systems theory</p><h1>The Mythos boots as an operating system.</h1><p class="lede">A readable, clickable journey through a fictional architecture where Outer Gods are low-level services, dreams are networks, and ritual is a terminal with terrible permissions.</p></header><section class="terminal"><span>$ bootctl inspect underlayer</span><span id="cmd"></span></section><div class="grid" id="grid"></div><footer><p>Source material: the public <a href="https://github.com/merrypranxter/lovecraft_os">lovecraft_os</a> premise and architecture notes, summarized in original language.</p></footer></main>`;

function renderCards(){
  document.getElementById('cmd').textContent = sections.find((s)=>s.id===active).cmd;
  document.getElementById('grid').innerHTML = sections.map((s,idx)=>`<article class="card ${active===s.id?'active':''}" data-id="${s.id}" tabindex="0"><div class="glyph">${s.glyph}</div><small>${String(idx+1).padStart(2,'0')} / ${s.tag}</small><h2>${s.title}</h2><p>${s.text}</p><div class="note"><b>Deeper note:</b> ${s.note}</div></article>`).join('');
  document.querySelectorAll('.card').forEach((card)=>{ card.addEventListener('click',()=>{active=card.dataset.id; renderCards();}); card.addEventListener('keydown',(e)=>{ if(e.key==='Enter'){ active=card.dataset.id; renderCards(); }}); });
}
renderCards();
document.getElementById('pause').addEventListener('click',(e)=>{ paused=!paused; e.currentTarget.textContent=paused?'Resume motion':'Pause motion'; });

const canvas = document.querySelector('.void-canvas');
const ctx = canvas.getContext('2d');
let t = 0;
const stars = Array.from({length:90},()=>({x:Math.random(),y:Math.random(),r:Math.random()*2+0.5,v:Math.random()*0.4+0.1}));
function draw(){
  const d = devicePixelRatio || 1;
  canvas.width = innerWidth * d; canvas.height = innerHeight * d; ctx.setTransform(d,0,0,d,0,0);
  const g = ctx.createRadialGradient(innerWidth*.5,innerHeight*.35,20,innerWidth*.5,innerHeight*.4,innerWidth);
  g.addColorStop(0,`hsl(${280+Math.sin(t)*40} 90% 18%)`); g.addColorStop(.55,'#091225'); g.addColorStop(1,'#020207'); ctx.fillStyle=g; ctx.fillRect(0,0,innerWidth,innerHeight);
  stars.forEach((s,i)=>{ s.y=(s.y+(paused?0:s.v/1000))%1; const px=s.x*innerWidth+Math.sin(t+i)*18, py=s.y*innerHeight; ctx.fillStyle=`hsla(${160+i%80},100%,70%,${.25+s.r/5})`; ctx.beginPath(); ctx.arc(px,py,s.r,0,7); ctx.fill(); });
  t += paused ? 0 : .016; requestAnimationFrame(draw);
}
draw();
