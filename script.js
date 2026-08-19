/* =========================================================
   Skillmate — app logic
   No backend: all data lives in localStorage.
   ========================================================= */

/* ---------------- Storage helpers ---------------- */
const DB_KEYS = {
  currentUser: 'ssc_currentUser'
};

let DB = {
  users: [],
  requests: [],
  sessions: [],
  notifications: [],
  seeded: false
};

let useLocalServer = true;

async function saveDB(){
  if (useLocalServer) {
    try{
      await fetch('/api/db/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(DB)
      });
    }catch(e){
      console.warn('Failed to save DB to server. Falling back to localStorage.', e);
      localStorage.setItem('ssc_fallback_db', JSON.stringify(DB));
    }
  } else {
    localStorage.setItem('ssc_fallback_db', JSON.stringify(DB));
  }
}

function uid(prefix){
  return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

function getUsers(){ return DB.users; }
function setUsers(u){ DB.users = u; saveDB(); }
function getRequests(){ return DB.requests; }
function setRequests(r){ DB.requests = r; saveDB(); }
function getSessions(){ return DB.sessions; }
function setSessions(s){ DB.sessions = s; saveDB(); }
function getNotifications(){ return DB.notifications; }
function setNotifications(n){ DB.notifications = n; saveDB(); }

function getUserById(id){ return getUsers().find(u => u.id === id); }
function getCurrentUser(){
  const id = localStorage.getItem(DB_KEYS.currentUser);
  if(!id) return null;
  return getUserById(id) || null;
}
function setCurrentUser(id){
  localStorage.setItem(DB_KEYS.currentUser, id);
}
function logoutUser(){
  localStorage.removeItem(DB_KEYS.currentUser);
}

/* ---------------- Seed data ---------------- */
function seedIfNeeded(){
  const hasAnshul = DB.users && DB.users.some(u => u.name === 'Anshul Gaikwad');
  if(DB.seeded && hasAnshul) return;

  const palette = ['#2E6B5E','#B87F16','#3C4A8C','#AE4234','#6E6759','#1F7A8C','#8C5E3C'];
  const seedUsers = [
    {
      name:'Ananya Rao', email:'ananya@campus.edu', dept:'CSE', year:'3rd Year',
      bio:'Full-stack dev who loves clean UI. Happy to trade React for design feedback.',
      teach:[{skill:'React', level:'Advanced'},{skill:'JavaScript', level:'Advanced'}],
      learn:[{skill:'Figma', level:'Beginner'},{skill:'UI/UX Design', level:'Beginner'}],
      availability:{hours:5, days:['Mon','Wed','Fri']},
      links:{github:'github.com/ananya', linkedin:'', portfolio:''}
    },
    {
      name:'Rohan Mehta', email:'rohan@campus.edu', dept:'Design', year:'2nd Year',
      bio:'Product design student, into motion & branding. Want to finally learn to code.',
      teach:[{skill:'Figma', level:'Advanced'},{skill:'UI/UX Design', level:'Intermediate'}],
      learn:[{skill:'JavaScript', level:'Beginner'},{skill:'React', level:'Beginner'}],
      availability:{hours:4, days:['Tue','Thu']},
      links:{github:'', linkedin:'linkedin.com/in/rohanm', portfolio:'rohan.design'}
    },
    {
      name:'Sara Khan', email:'sara@campus.edu', dept:'CSE', year:'4th Year',
      bio:'ML enthusiast, published a paper on NLP. Also decent at public speaking.',
      teach:[{skill:'Python', level:'Advanced'},{skill:'Machine Learning', level:'Advanced'}],
      learn:[{skill:'Public Speaking', level:'Intermediate'},{skill:'Video Editing', level:'Beginner'}],
      availability:{hours:3, days:['Sat']},
      links:{github:'github.com/sarakhan', linkedin:'', portfolio:''}
    },
    {
      name:'Devika Iyer', email:'devika@campus.edu', dept:'Mass Comm', year:'3rd Year',
      bio:'Runs the campus YouTube channel. Editing is second nature to me.',
      teach:[{skill:'Video Editing', level:'Advanced'},{skill:'Public Speaking', level:'Advanced'}],
      learn:[{skill:'Python', level:'Beginner'},{skill:'Excel', level:'Intermediate'}],
      availability:{hours:6, days:['Mon','Thu','Sun']},
      links:{github:'', linkedin:'linkedin.com/in/devikaiyer', portfolio:''}
    },
    {
      name:'Kabir Singh', email:'kabir@campus.edu', dept:'Finance', year:'2nd Year',
      bio:'Spreadsheet wizard, building a stock tracker on the side.',
      teach:[{skill:'Excel', level:'Advanced'},{skill:'Financial Modeling', level:'Intermediate'}],
      learn:[{skill:'Python', level:'Intermediate'},{skill:'Machine Learning', level:'Beginner'}],
      availability:{hours:4, days:['Wed','Sat']},
      links:{github:'', linkedin:'linkedin.com/in/kabirsingh', portfolio:''}
    },
    {
      name:'Meera Nair', email:'meera@campus.edu', dept:'CSE', year:'1st Year',
      bio:'Fresher trying to catch up fast — big on note-taking and consistency.',
      teach:[{skill:'Excel', level:'Beginner'},{skill:'Public Speaking', level:'Beginner'}],
      learn:[{skill:'JavaScript', level:'Beginner'},{skill:'Figma', level:'Beginner'}],
      availability:{hours:8, days:['Mon','Tue','Wed','Thu']},
      links:{github:'github.com/meeran', linkedin:'', portfolio:''}
    },
    {
      name:'Arjun Verma', email:'arjun@campus.edu', dept:'CSE', year:'4th Year',
      bio:'Backend-leaning dev, also captains the debate club.',
      teach:[{skill:'Python', level:'Advanced'},{skill:'Public Speaking', level:'Advanced'}],
      learn:[{skill:'Figma', level:'Intermediate'},{skill:'Video Editing', level:'Beginner'}],
      availability:{hours:5, days:['Fri','Sat']},
      links:{github:'github.com/arjunv', linkedin:'', portfolio:''}
    },
    {
      name:'Anshul Gaikwad', email:'anshulgaikwad1924@gmail.com', dept:'Design', year:'3rd Year',
      bio:'Passionate about UI/UX and product design.',
      teach:[{skill:'UI/UX Design', level:'Advanced'}],
      learn:[{skill:'React', level:'Beginner'}],
      availability:{hours:5, days:['Mon','Wed']},
      links:{github:'', linkedin:'', portfolio:''}
    },
    {
      name:'Elvin Neware', email:'elvin@campus.edu', dept:'CSE', year:'2nd Year',
      bio:'Frontend developer looking to collaborate.',
      teach:[{skill:'React', level:'Intermediate'}],
      learn:[{skill:'UI/UX Design', level:'Intermediate'}],
      availability:{hours:4, days:['Tue','Thu']},
      links:{github:'', linkedin:'', portfolio:''}
    },
    {
      name:'Arya Ramteke', email:'arya@campus.edu', dept:'CSE', year:'3rd Year',
      bio:'Loves solving complex algorithmic challenges.',
      teach:[{skill:'Algorithms', level:'Advanced'}],
      learn:[{skill:'Machine Learning', level:'Beginner'}],
      availability:{hours:6, days:['Sat','Sun']},
      links:{github:'', linkedin:'', portfolio:''}
    }
  ];

  const users = seedUsers.map((u, i) => ({
    id: uid('u'),
    avatarColor: palette[i % palette.length],
    joined: Date.now() - (7 - i) * 86400000,
    ...u
  }));
  DB.users = users;
  DB.requests = [];
  DB.sessions = [];
  DB.notifications = [];
  DB.seeded = true;
  saveDB();
}

/* ---------------- Matching logic ---------------- */
// Reciprocal match score between `me` and `other`:
// - teachRatio: fraction of MY teach-skills that OTHER wants to learn
// - learnRatio: fraction of MY learn-skills that OTHER can teach
// score = average of the two ratios, expressed as a percentage.
function normSkill(s){ return s.trim().toLowerCase(); }

function computeMatch(me, other){
  const myTeach = me.teach.map(s => normSkill(s.skill));
  const myLearn = me.learn.map(s => normSkill(s.skill));
  const otherTeach = other.teach.map(s => normSkill(s.skill));
  const otherLearn = other.learn.map(s => normSkill(s.skill));

  const theyLearnFromYou = me.teach.filter(s => otherLearn.includes(normSkill(s.skill)));
  const youLearnFromThem = me.learn.filter(s => otherTeach.includes(normSkill(s.skill)));

  const teachRatio = myTeach.length ? theyLearnFromYou.length / myTeach.length : 0;
  const learnRatio = myLearn.length ? youLearnFromThem.length / myLearn.length : 0;

  let score = Math.round(((teachRatio + learnRatio) / 2) * 100);
  if(theyLearnFromYou.length && youLearnFromThem.length){
    score = Math.min(100, score + 10); // bonus for a true two-way swap
  }
  return { score, theyLearnFromYou, youLearnFromThem };
}

function getSuggestedMatches(me, limit){
  const others = getUsers().filter(u => u.id !== me.id);
  const scored = others.map(o => ({ user:o, ...computeMatch(me, o) }))
    .filter(m => m.score > 0)
    .sort((a,b) => b.score - a.score);
  return limit ? scored.slice(0, limit) : scored;
}

/* ---------------- Verified skills / badges ---------------- */
function getVerifiedSkills(userId){
  const sessions = getSessions().filter(s => s.status === 'completed' &&
    (s.userAId === userId || s.userBId === userId));
  const verified = new Set();
  sessions.forEach(s => {
    if(s.userAId === userId && s.ratingForA && s.ratingForA.stars >= 4){
      verified.add(s.skillATeaches);
    }
    if(s.userBId === userId && s.ratingForB && s.ratingForB.stars >= 4){
      verified.add(s.skillBTeaches);
    }
  });
  return verified;
}

/* ---------------- Backup / Restore ---------------- */
// localStorage can be lost (private browsing, temp file copies, cleared
// site data, switching browsers/devices). This lets people export a full
// snapshot to a .json file and restore it later, on any browser/device.
function exportAllData(){
  const snapshot = {
    exportedAt: new Date().toISOString(),
    currentUserId: localStorage.getItem(DB_KEYS.currentUser) || null,
    users: getUsers(),
    requests: getRequests(),
    sessions: getSessions(),
    notifications: getNotifications()
  };
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'skill-swap-backup-' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast('Backup downloaded!');
}

function importAllData(file){
  const reader = new FileReader();
  reader.onload = () => {
    try{
      const data = JSON.parse(reader.result);
      if(!Array.isArray(data.users)) throw new Error('Not a valid backup file');
      setUsers(data.users || []);
      setRequests(data.requests || []);
      setSessions(data.sessions || []);
      setNotifications(data.notifications || []);
      if(data.currentUserId && data.users.some(u => u.id === data.currentUserId)){
        setCurrentUser(data.currentUserId);
      }
      showToast('Backup restored! Reloading...');
      setTimeout(() => window.location.reload(), 900);
    }catch(e){
      showToast('Could not read that file — is it a Skillmate backup?');
      console.error(e);
    }
  };
  reader.readAsText(file);
}

/* ---------------- Notifications ---------------- */
function pushNotification(userId, text, view){
  const all = getNotifications();
  all.unshift({ id: uid('n'), userId, text, view: view || 'dashboard', read:false, createdAt: Date.now() });
  setNotifications(all);
}
function getMyNotifications(){
  const cu = getCurrentUser();
  if(!cu) return [];
  return getNotifications().filter(n => n.userId === cu.id).sort((a,b)=>b.createdAt-a.createdAt);
}
function unreadCount(){
  return getMyNotifications().filter(n => !n.read).length;
}

/* ---------------- UI helpers ---------------- */
function initials(name){
  return name.split(' ').map(p => p[0]).slice(0,2).join('').toUpperCase();
}
function timeAgo(ts){
  const diff = Date.now() - ts;
  const mins = Math.floor(diff/60000);
  if(mins < 1) return 'just now';
  if(mins < 60) return mins + 'm ago';
  const hrs = Math.floor(mins/60);
  if(hrs < 24) return hrs + 'h ago';
  const days = Math.floor(hrs/24);
  return days + 'd ago';
}
function fmtDateTime(dtStr){
  if(!dtStr) return '—';
  const d = new Date(dtStr);
  if(isNaN(d)) return dtStr;
  return d.toLocaleString(undefined, { weekday:'short', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
}
function avatarHTML(user, size){
  const cls = size ? 'avatar ' + size : 'avatar';
  return `<div class="${cls}" style="background:${user.avatarColor}">${initials(user.name)}</div>`;
}
function escapeHTML(str){
  const d = document.createElement('div');
  d.textContent = str == null ? '' : str;
  return d.innerHTML;
}

let toastTimer = null;
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 2600);
}

function openModal(html){
  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal-overlay').classList.remove('hidden');
}
function closeModal(){
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('modal-content').innerHTML = '';
}

/* ---------------- App state / routing ---------------- */
let currentView = 'dashboard';

async function boot(){
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  if (isGitHubPages) {
    useLocalServer = false;
    const local = localStorage.getItem('ssc_fallback_db');
    if (local) DB = JSON.parse(local);
  } else {
    try {
      const res = await fetch('/api/db');
      if(res.ok) {
        DB = await res.json();
      } else {
        throw new Error("Server not ok");
      }
    } catch(e) {
      console.warn('Local server not found, falling back to localStorage');
      useLocalServer = false;
      const local = localStorage.getItem('ssc_fallback_db');
      if (local) DB = JSON.parse(local);
    }
  }

  seedIfNeeded();
  const cu = getCurrentUser();
  if(cu){
    showAppShell();
  }else{
    showLanding();
  }
  wireGlobalEvents();
}

function wireGlobalEvents(){
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if(e.target.id === 'modal-overlay') closeModal();
  });
  document.getElementById('notif-bell').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleNotifDropdown();
  });
  document.addEventListener('click', (e) => {
    const dd = document.getElementById('notif-dropdown');
    if(!dd.classList.contains('hidden') && !dd.contains(e.target) && e.target.id !== 'notif-bell'){
      dd.classList.add('hidden');
    }
  });
  document.getElementById('logout-btn').addEventListener('click', () => {
    logoutUser();
    showLanding();
  });
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });
}

/* ---------------- Landing ---------------- */
function showLanding(){
  document.getElementById('app-shell').classList.add('hidden');
  const landing = document.getElementById('view-landing');
  landing.classList.remove('hidden');

  const users = [...getUsers()].sort((a,b) => (b.lastLogin || 0) - (a.lastLogin || 0));
  const quickLoginHTML = users.slice(0,20).map(u => `
    <button class="quick-login-card" data-login="${u.id}">
      ${avatarHTML(u, 'sm')}
      <span style="display:flex; flex-direction:column; align-items:flex-start;">
        <span class="ql-name" style="display:block">${escapeHTML(u.name)}</span>
        <span class="ql-role">${escapeHTML(u.dept)} · ${escapeHTML(u.year)}</span>
        ${u.lastLogin ? `<span class="ql-role" style="color:var(--teal); font-weight:500; margin-top:2px;">Last active: ${timeAgo(u.lastLogin)}</span>` : `<span class="ql-role" style="color:var(--ink-faint); margin-top:2px;">Never logged in</span>`}
      </span>
    </button>
  `).join('');

  landing.innerHTML = `
    <div class="landing-wrap">
      <div class="landing-hero">
        <img src="logo-large.png" alt="Skillmate Logo" class="brand-logo-large" style="max-width: 360px; margin-bottom: 24px;">
        <span class="brand-mark">Peer-to-peer · Campus only</span>
        <h1>Trade what you know<br>for what you <em>want to learn</em>.</h1>
        <p class="lede">Skillmate matches students who can teach a skill with students who want to learn it — no fees, just a fair trade.</p>
        <div class="trade-illustration">
          <span class="trade-chip teach">You teach React</span>
          <span class="trade-arrow">⇄</span>
          <span class="trade-chip learn">You learn Figma</span>
        </div>
      </div>
      <div class="landing-panel">
        <h3>Quick login</h3>
        <p class="sub">Jump in as one of the demo students.</p>
        <div class="quick-login-grid">${quickLoginHTML}</div>

        <div class="divider-label">or restore a backup</div>
        <label class="btn btn-outline btn-block" style="margin-bottom:16px;">
          ⬆ Import backup file
          <input type="file" id="landing-import-input" accept="application/json" style="display:none;">
        </label>

        <div class="divider-label">or create your profile</div>
        <form id="signup-form">
          <div class="field">
            <label>Full name</label>
            <input type="text" id="su-name" required placeholder="e.g. Priya Sharma">
          </div>
          <div class="field-row">
            <div class="field">
              <label>Department</label>
              <input type="text" id="su-dept" required placeholder="e.g. CSE">
            </div>
            <div class="field">
              <label>Year</label>
              <input type="text" id="su-year" required placeholder="e.g. 2nd Year">
            </div>
          </div>
          <div class="field">
            <label>Email</label>
            <input type="email" id="su-email" required placeholder="you@campus.edu">
          </div>
          <button type="submit" class="btn btn-teal btn-block">Create profile &amp; enter</button>
        </form>
      </div>
    </div>
  `;

  landing.querySelectorAll('[data-login]').forEach(btn => {
    btn.addEventListener('click', () => {
      const uId = btn.dataset.login;
      setCurrentUser(uId);
      const allUsers = getUsers();
      const u = allUsers.find(x => x.id === uId);
      if(u) {
        u.lastLogin = Date.now();
        setUsers(allUsers);
      }
      showAppShell();
      showToast('Logged in as ' + getCurrentUser().name);
    });
  });

  document.getElementById('landing-import-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file) importAllData(file);
  });

  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('su-name').value.trim();
    const dept = document.getElementById('su-dept').value.trim();
    const year = document.getElementById('su-year').value.trim();
    const email = document.getElementById('su-email').value.trim();
    if(!name || !dept || !year || !email) return;

    const palette = ['#2E6B5E','#B87F16','#3C4A8C','#AE4234','#6E6759','#1F7A8C','#8C5E3C'];
    const newUser = {
      id: uid('u'),
      name, dept, year, email,
      bio: '',
      teach: [], learn: [],
      availability: { hours: 0, days: [] },
      links: { github:'', linkedin:'', portfolio:'' },
      avatarColor: palette[Math.floor(Math.random()*palette.length)],
      joined: Date.now(),
      lastLogin: Date.now()
    };
    const users = getUsers();
    users.push(newUser);
    setUsers(users);
    setCurrentUser(newUser.id);
    showAppShell();
    switchView('profile');
    showToast('Welcome! Add your skills to get matched.');
  });
}

/* ---------------- App shell ---------------- */
function showAppShell(){
  document.getElementById('view-landing').classList.add('hidden');
  document.getElementById('app-shell').classList.remove('hidden');
  const cu = getCurrentUser();
  document.getElementById('cu-avatar').outerHTML = avatarHTML(cu, 'sm').replace('class="avatar sm"', 'class="avatar sm" id="cu-avatar"');
  document.getElementById('cu-name').textContent = cu.name;
  switchView('dashboard');
}

function switchView(view){
  currentView = view;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  document.querySelectorAll('.view-panel').forEach(p => p.classList.add('hidden'));
  const titles = { dashboard:'Dashboard', directory:'Skill Directory', profile:'My Profile', requests:'Swap Requests', sessions:'Sessions', lounge:'Virtual Lounge' };
  document.getElementById('view-title').textContent = titles[view] || '';
  document.getElementById('view-' + view).classList.remove('hidden');

  if(view === 'dashboard') renderDashboard();
  if(view === 'directory') renderDirectory();
  if(view === 'profile') renderProfile();
  if(view === 'requests') renderRequests();
  if(view === 'sessions') renderSessions();
  if(view === 'lounge') renderLounge();
  renderNotifBell();
}

/* ---------------- Notifications UI ---------------- */
function renderNotifBell(){
  const count = unreadCount();
  const badge = document.getElementById('notif-count');
  if(count > 0){
    badge.textContent = count;
    badge.classList.remove('hidden');
  }else{
    badge.classList.add('hidden');
  }
}
function toggleNotifDropdown(){
  const dd = document.getElementById('notif-dropdown');
  if(dd.classList.contains('hidden')){
    renderNotifDropdown();
    dd.classList.remove('hidden');
  }else{
    dd.classList.add('hidden');
  }
}
function renderNotifDropdown(){
  const dd = document.getElementById('notif-dropdown');
  const items = getMyNotifications();
  if(!items.length){
    dd.innerHTML = `<div class="notif-empty">No notifications yet.</div>`;
    return;
  }
  dd.innerHTML = items.slice(0,20).map(n => `
    <div class="notif-item ${n.read ? '' : 'unread'}" data-nid="${n.id}" data-view="${n.view}">
      <div class="n-text">${escapeHTML(n.text)}</div>
      <div class="n-time">${timeAgo(n.createdAt)}</div>
    </div>
  `).join('');
  dd.querySelectorAll('.notif-item').forEach(el => {
    el.addEventListener('click', () => {
      const all = getNotifications();
      const target = all.find(n => n.id === el.dataset.nid);
      if(target) target.read = true;
      setNotifications(all);
      document.getElementById('notif-dropdown').classList.add('hidden');
      switchView(el.dataset.view);
    });
  });
}

/* ---------------- Dashboard ---------------- */
function renderDashboard(){
  const cu = getCurrentUser();
  const el = document.getElementById('view-dashboard');
  const matches = getSuggestedMatches(cu, 4);
  const mySessions = getSessions().filter(s => s.userAId === cu.id || s.userBId === cu.id);
  const upcoming = mySessions.filter(s => s.status === 'scheduled')
    .sort((a,b) => new Date(a.datetime) - new Date(b.datetime)).slice(0,3);
  const verified = getVerifiedSkills(cu.id);
  const recentNotifs = getMyNotifications().slice(0,3);

  el.innerHTML = `
    <div class="stats-row">
      <div class="stat-card"><div class="num">${cu.teach.length}</div><div class="lbl">Skills you teach</div></div>
      <div class="stat-card"><div class="num">${cu.learn.length}</div><div class="lbl">Skills you want</div></div>
      <div class="stat-card"><div class="num">${upcoming.length}</div><div class="lbl">Upcoming sessions</div></div>
      <div class="stat-card"><div class="num">${verified.size}</div><div class="lbl">Verified badges</div></div>
    </div>

    <div class="section-head"><h2>Suggested matches</h2></div>
    <div id="dash-matches" class="grid" style="margin-bottom:26px;"></div>

    <div class="grid grid-2">
      <div>
        <div class="section-head"><h2>Upcoming sessions</h2></div>
        <div id="dash-sessions"></div>
      </div>
      <div>
        <div class="section-head"><h2>Recent activity</h2></div>
        <div id="dash-notifs"></div>
      </div>
    </div>
  `;

  const mEl = document.getElementById('dash-matches');
  if(!matches.length){
    mEl.innerHTML = emptyState('🧭', 'No matches yet', 'Add skills to your profile — teach and learn — so we can find your trade partners.');
  }else{
    mEl.innerHTML = matches.map(m => ticketHTML(cu, m)).join('');
    wireTicketButtons(mEl);
  }

  const sEl = document.getElementById('dash-sessions');
  if(!upcoming.length){
    sEl.innerHTML = emptyState('📅', 'Nothing scheduled', 'Accept a swap request and pick a time to see it here.');
  }else{
    sEl.innerHTML = upcoming.map(s => miniSessionHTML(s, cu)).join('');
  }

  const nEl = document.getElementById('dash-notifs');
  if(!recentNotifs.length){
    nEl.innerHTML = emptyState('🔔', 'All quiet', 'New requests and updates will show up here.');
  }else{
    nEl.innerHTML = recentNotifs.map(n => `
      <div class="req-card" style="cursor:pointer" data-view="${n.view}">
        <div class="n-text">${escapeHTML(n.text)}</div>
        <div class="n-time" style="margin-top:4px">${timeAgo(n.createdAt)}</div>
      </div>
    `).join('');
    nEl.querySelectorAll('[data-view]').forEach(card => {
      card.addEventListener('click', () => switchView(card.dataset.view));
    });
  }
}

function emptyState(emoji, title, sub){
  return `<div class="empty-state"><div class="es-emoji">${emoji}</div><strong>${escapeHTML(title)}</strong><p style="margin-top:6px">${escapeHTML(sub)}</p></div>`;
}

function ticketHTML(me, match){
  const other = match.user;
  const why = match.theyLearnFromYou.length && match.youLearnFromThem.length
    ? `You teach ${match.theyLearnFromYou.map(s=>s.skill).join(', ')} · they teach ${match.youLearnFromThem.map(s=>s.skill).join(', ')}`
    : match.theyLearnFromYou.length
      ? `They want to learn ${match.theyLearnFromYou.map(s=>s.skill).join(', ')} from you`
      : `They can teach you ${match.youLearnFromThem.map(s=>s.skill).join(', ')}`;

  const existingReq = getRequests().find(r =>
    ((r.fromId === me.id && r.toId === other.id) || (r.fromId === other.id && r.toId === me.id)) &&
    r.status === 'pending');

  return `
  <div class="ticket">
    <div class="ticket-side you">
      <div class="ts-label">You</div>
      <div class="ts-name">${escapeHTML(me.name)}</div>
      ${match.theyLearnFromYou.map(s => `<span class="tag tag-teach">${escapeHTML(s.skill)}</span>`).join('') || '<span class="tag tag-teach" style="opacity:.4">—</span>'}
    </div>
    <div class="ticket-mid">
      <div class="swap-icon">⇄</div>
      <div class="score">${match.score}%</div>
    </div>
    <div class="ticket-side them">
      <div class="ts-label">${escapeHTML(other.dept)} · ${escapeHTML(other.year)}</div>
      <div class="ts-name">${escapeHTML(other.name)}</div>
      ${match.youLearnFromThem.map(s => `<span class="tag tag-learn">${escapeHTML(s.skill)}</span>`).join('') || '<span class="tag tag-learn" style="opacity:.4">—</span>'}
    </div>
    <div class="ticket-foot">
      <div class="why">${escapeHTML(why)}</div>
      ${existingReq
        ? `<span class="status-pill status-pending">Request pending</span>`
        : `<button class="btn btn-teal btn-sm" data-swap-with="${other.id}">Request swap</button>`}
    </div>
  </div>`;
}

function wireTicketButtons(container){
  container.querySelectorAll('[data-swap-with]').forEach(btn => {
    btn.addEventListener('click', () => openSwapRequestModal(btn.dataset.swapWith));
  });
}

function miniSessionHTML(s, cu){
  const otherId = s.userAId === cu.id ? s.userBId : s.userAId;
  const other = getUserById(otherId);
  if(!other) return '';
  return `
    <div class="req-card">
      <div class="req-top">
        <div class="req-people">${avatarHTML(other,'sm')}<strong>${escapeHTML(other.name)}</strong></div>
        <span class="status-pill status-scheduled">${fmtDateTime(s.datetime)}</span>
      </div>
      <div class="exchange-line">
        <span class="tag tag-teach">${escapeHTML(s.userAId===cu.id ? s.skillATeaches : s.skillBTeaches)}</span>
        <span class="arrow">for</span>
        <span class="tag tag-learn">${escapeHTML(s.userAId===cu.id ? s.skillBTeaches : s.skillATeaches)}</span>
      </div>
    </div>`;
}

/* ---------------- Directory ---------------- */
function renderDirectory(){
  const el = document.getElementById('view-directory');
  const cu = getCurrentUser();
  const depts = [...new Set(getUsers().map(u => u.dept))];

  el.innerHTML = `
    <div class="card" style="margin-bottom:18px;">
      <div class="grid grid-3">
        <div class="field" style="margin-bottom:0">
          <label>Search skill</label>
          <input type="text" id="dir-search" placeholder="e.g. Python, Figma...">
        </div>
        <div class="field" style="margin-bottom:0">
          <label>Level</label>
          <select id="dir-level">
            <option value="">Any level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div class="field" style="margin-bottom:0">
          <label>Department</label>
          <select id="dir-dept">
            <option value="">Any department</option>
            ${depts.map(d => `<option>${escapeHTML(d)}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>
    <div id="dir-results" class="grid grid-3"></div>
  `;

  const search = document.getElementById('dir-search');
  const level = document.getElementById('dir-level');
  const dept = document.getElementById('dir-dept');
  [search, level, dept].forEach(inp => inp.addEventListener('input', renderDirResults));

  function renderDirResults(){
    const q = search.value.trim().toLowerCase();
    const lvl = level.value;
    const dp = dept.value;
    const results = getUsers().filter(u => u.id !== cu.id).filter(u => {
      const allSkills = [...u.teach, ...u.learn];
      const matchesQuery = !q || allSkills.some(s => s.skill.toLowerCase().includes(q));
      const matchesLevel = !lvl || u.teach.some(s => s.level === lvl);
      const matchesDept = !dp || u.dept === dp;
      return matchesQuery && matchesLevel && matchesDept;
    });

    const resEl = document.getElementById('dir-results');
    if(!results.length){
      resEl.innerHTML = `<div style="grid-column:1/-1">${emptyState('🔍', 'No students found', 'Try a different skill, level, or department.')}</div>`;
      return;
    }
    resEl.innerHTML = results.map(u => {
      const verified = getVerifiedSkills(u.id);
      const pendingReq = getRequests().find(r =>
        ((r.fromId === cu.id && r.toId === u.id) || (r.fromId === u.id && r.toId === cu.id)) &&
        r.status === 'pending');
      return `
      <div class="index-card">
        <div class="ic-top">
          ${avatarHTML(u)}
          <div>
            <div class="ic-name">${escapeHTML(u.name)}</div>
            <div class="ic-meta">${escapeHTML(u.dept)} · ${escapeHTML(u.year)}</div>
            ${u.lastLogin ? `<div class="ic-meta" style="color:var(--teal); margin-top:2px;">Last active: ${timeAgo(u.lastLogin)}</div>` : `<div class="ic-meta" style="color:var(--ink-faint); margin-top:2px;">Never logged in</div>`}
          </div>
        </div>
        <div>
          <div class="ic-block-label">Can teach</div>
          ${u.teach.map(s => `<span class="tag tag-teach">${escapeHTML(s.skill)} · ${s.level}${verified.has(s.skill) ? ' ✓' : ''}</span>`).join('') || '<span style="font-size:12px;color:var(--ink-faint)">Nothing listed yet</span>'}
        </div>
        <div>
          <div class="ic-block-label">Wants to learn</div>
          ${u.learn.map(s => `<span class="tag tag-learn">${escapeHTML(s.skill)}</span>`).join('') || '<span style="font-size:12px;color:var(--ink-faint)">Nothing listed yet</span>'}
        </div>
        ${pendingReq
          ? `<button class="btn btn-outline btn-sm" disabled>Request pending</button>`
          : `<button class="btn btn-teal btn-sm" data-swap-with="${u.id}">Request swap</button>`}
      </div>`;
    }).join('');
    wireTicketButtons(resEl);
  }
  renderDirResults();
}

/* ---------------- Swap request modal ---------------- */
function openSwapRequestModal(otherId){
  const cu = getCurrentUser();
  const other = getUserById(otherId);
  if(!other) return;
  const match = computeMatch(cu, other);
  const myTopTeach = match.theyLearnFromYou[0]?.skill || cu.teach[0]?.skill || 'a skill';
  const theirTopTeach = match.youLearnFromThem[0]?.skill || other.teach[0]?.skill || 'a skill';
  const template = `Hi ${other.name.split(' ')[0]}, I can teach you ${myTopTeach} if you can teach me ${theirTopTeach}. Interested in a swap?`;

  openModal(`
    <div class="modal-head">
      <h3>Request a swap with ${escapeHTML(other.name)}</h3>
      <button class="modal-close" id="modal-close-btn">✕</button>
    </div>
    <div class="field">
      <label>Message</label>
      <textarea id="swap-msg" rows="4">${escapeHTML(template)}</textarea>
    </div>
    <button class="btn btn-teal btn-block" id="send-swap-btn">Send request</button>
  `);
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('send-swap-btn').addEventListener('click', () => {
    const msg = document.getElementById('swap-msg').value.trim();
    if(!msg) return;
    const reqs = getRequests();
    reqs.push({
      id: uid('r'), fromId: cu.id, toId: other.id,
      message: msg, status:'pending', createdAt: Date.now()
    });
    setRequests(reqs);
    pushNotification(other.id, `${cu.name} sent you a swap request.`, 'requests');
    closeModal();
    showToast('Swap request sent to ' + other.name + '!');
    switchView(currentView);
  });
}

/* ---------------- Profile ---------------- */
function renderProfile(){
  const cu = getCurrentUser();
  const el = document.getElementById('view-profile');
  const verified = getVerifiedSkills(cu.id);

  el.innerHTML = `
    <div class="grid grid-2">
      <div class="card">
        <h3>Basic info</h3>
        <div class="field"><label>Name</label><input id="pf-name" value="${escapeHTML(cu.name)}"></div>
        <div class="field-row">
          <div class="field"><label>Department</label><input id="pf-dept" value="${escapeHTML(cu.dept)}"></div>
          <div class="field"><label>Year</label><input id="pf-year" value="${escapeHTML(cu.year)}"></div>
        </div>
        <div class="field"><label>Bio</label><textarea id="pf-bio" rows="3">${escapeHTML(cu.bio)}</textarea></div>
        <div class="field"><label>GitHub</label><input id="pf-github" value="${escapeHTML(cu.links.github)}"></div>
        <div class="field"><label>LinkedIn</label><input id="pf-linkedin" value="${escapeHTML(cu.links.linkedin)}"></div>
        <div class="field"><label>Portfolio</label><input id="pf-portfolio" value="${escapeHTML(cu.links.portfolio)}"></div>
        <div class="field"><label>Hours/week available</label><input type="number" min="0" max="40" id="pf-hours" value="${cu.availability.hours}"></div>
      </div>

      <div>
        <div class="card" style="margin-bottom:16px;">
          <h3>Skills I can teach</h3>
          <div id="teach-rows"></div>
          <button type="button" class="link-btn add-skill-btn" id="add-teach-row">+ Add a skill</button>
        </div>
        <div class="card">
          <h3>Skills I want to learn</h3>
          <div id="learn-rows"></div>
          <button type="button" class="link-btn add-skill-btn" id="add-learn-row">+ Add a skill</button>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:16px;">
      <h3>Verified badges</h3>
      ${verified.size
        ? [...verified].map(s => `<span class="tag tag-verified">${escapeHTML(s)}</span>`).join('')
        : '<p style="color:var(--ink-soft);font-size:13px;margin-top:6px">Complete a swap and get rated 4★+ to earn your first verified badge.</p>'}
    </div>

    <div class="card" style="margin-top:16px;">
      <h3>Backup &amp; restore</h3>
      <p style="color:var(--ink-soft);font-size:13px;margin-bottom:12px;">
        This app stores everything in your browser only, so it can be lost if you clear browser data, use a different browser, or open the file from a temporary location. Download a backup now and then, and you can restore it anytime.
      </p>
      <div class="row-actions">
        <button type="button" class="btn btn-outline btn-sm" id="export-data-btn">⬇ Export my data</button>
        <label class="btn btn-outline btn-sm" style="margin:0;">
          ⬆ Import backup
          <input type="file" id="import-data-input" accept="application/json" style="display:none;">
        </label>
      </div>
    </div>

    <button class="btn btn-teal" id="save-profile-btn" style="margin-top:18px;">Save profile</button>
  `;

  renderSkillRows('teach-rows', cu.teach);
  renderSkillRows('learn-rows', cu.learn);

  document.getElementById('export-data-btn').addEventListener('click', exportAllData);
  document.getElementById('import-data-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file) importAllData(file);
  });

  document.getElementById('add-teach-row').addEventListener('click', () => {
    addSkillRow('teach-rows', {skill:'', level:'Beginner'});
  });
  document.getElementById('add-learn-row').addEventListener('click', () => {
    addSkillRow('learn-rows', {skill:'', level:'Beginner'});
  });

  document.getElementById('save-profile-btn').addEventListener('click', () => {
    const users = getUsers();
    const u = users.find(x => x.id === cu.id);
    u.name = document.getElementById('pf-name').value.trim() || u.name;
    u.dept = document.getElementById('pf-dept').value.trim();
    u.year = document.getElementById('pf-year').value.trim();
    u.bio = document.getElementById('pf-bio').value.trim();
    u.links.github = document.getElementById('pf-github').value.trim();
    u.links.linkedin = document.getElementById('pf-linkedin').value.trim();
    u.links.portfolio = document.getElementById('pf-portfolio').value.trim();
    u.availability.hours = Number(document.getElementById('pf-hours').value) || 0;
    u.teach = collectSkillRows('teach-rows');
    u.learn = collectSkillRows('learn-rows');
    setUsers(users);
    showToast('Profile updated!');
    renderProfile();
    renderNotifBell();
  });
}

function renderSkillRows(containerId, skills){
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  if(!skills.length){
    addSkillRow(containerId, {skill:'', level:'Beginner'});
    return;
  }
  skills.forEach(s => addSkillRow(containerId, s));
}
function addSkillRow(containerId, data){
  const container = document.getElementById(containerId);
  const row = document.createElement('div');
  row.className = 'skill-row';
  row.innerHTML = `
    <input type="text" class="sk-name" placeholder="Skill name" value="${escapeHTML(data.skill)}">
    <select class="sk-level">
      ${['Beginner','Intermediate','Advanced'].map(l => `<option ${l===data.level?'selected':''}>${l}</option>`).join('')}
    </select>
    <button type="button" class="rm-btn" title="Remove">✕</button>
  `;
  row.querySelector('.rm-btn').addEventListener('click', () => row.remove());
  container.appendChild(row);
}
function collectSkillRows(containerId){
  const rows = document.querySelectorAll('#' + containerId + ' .skill-row');
  const out = [];
  rows.forEach(r => {
    const name = r.querySelector('.sk-name').value.trim();
    const level = r.querySelector('.sk-level').value;
    if(name) out.push({ skill:name, level });
  });
  return out;
}

/* ---------------- Requests ---------------- */
function renderRequests(){
  const cu = getCurrentUser();
  const el = document.getElementById('view-requests');
  const all = getRequests();
  const received = all.filter(r => r.toId === cu.id).sort((a,b)=>b.createdAt-a.createdAt);
  const sent = all.filter(r => r.fromId === cu.id).sort((a,b)=>b.createdAt-a.createdAt);

  el.innerHTML = `
    <div class="grid grid-2">
      <div>
        <div class="list-col-head">Received</div>
        <div id="req-received"></div>
      </div>
      <div>
        <div class="list-col-head">Sent</div>
        <div id="req-sent"></div>
      </div>
    </div>
  `;

  const recEl = document.getElementById('req-received');
  recEl.innerHTML = received.length ? received.map(r => requestCardHTML(r, 'received')).join('')
    : emptyState('📥', 'No requests received', 'When someone wants to swap with you, it lands here.');

  const sentEl = document.getElementById('req-sent');
  sentEl.innerHTML = sent.length ? sent.map(r => requestCardHTML(r, 'sent')).join('')
    : emptyState('📤', 'No requests sent', 'Browse the directory to find someone to swap with.');

  wireRequestActions(el);
}

function requestCardHTML(r, direction){
  const cu = getCurrentUser();
  const otherId = direction === 'received' ? r.fromId : r.toId;
  const other = getUserById(otherId);
  if(!other) return '';
  const hasSession = getSessions().some(s => s.requestId === r.id);

  let actions = '';
  if(r.status === 'pending' && direction === 'received'){
    actions = `
      <button class="btn btn-teal btn-sm" data-accept="${r.id}">Accept</button>
      <button class="btn btn-outline btn-sm" data-decline="${r.id}">Decline</button>`;
  }else if(r.status === 'pending' && direction === 'sent'){
    actions = `<button class="btn btn-outline btn-sm" data-cancel="${r.id}">Cancel request</button>`;
  }else if(r.status === 'accepted' && !hasSession){
    actions = `<button class="btn btn-gold btn-sm" data-schedule="${r.id}">Schedule session</button>`;
  }else if(r.status === 'accepted' && hasSession){
    actions = `<button class="btn btn-outline btn-sm" data-goto-sessions="1">View in Sessions</button>`;
  }

  return `
    <div class="req-card">
      <div class="req-top">
        <div class="req-people">${avatarHTML(other,'sm')}<strong>${escapeHTML(other.name)}</strong></div>
        <span class="status-pill status-${r.status}">${r.status}</span>
      </div>
      <div class="req-msg">${escapeHTML(r.message)}</div>
      <div class="row-actions">${actions}</div>
    </div>`;
}

function wireRequestActions(el){
  el.querySelectorAll('[data-accept]').forEach(b => b.addEventListener('click', () => {
    updateRequestStatus(b.dataset.accept, 'accepted');
  }));
  el.querySelectorAll('[data-decline]').forEach(b => b.addEventListener('click', () => {
    updateRequestStatus(b.dataset.decline, 'declined');
  }));
  el.querySelectorAll('[data-cancel]').forEach(b => b.addEventListener('click', () => {
    updateRequestStatus(b.dataset.cancel, 'cancelled');
  }));
  el.querySelectorAll('[data-schedule]').forEach(b => b.addEventListener('click', () => {
    openScheduleModal(b.dataset.schedule);
  }));
  el.querySelectorAll('[data-goto-sessions]').forEach(b => b.addEventListener('click', () => switchView('sessions')));
}

function updateRequestStatus(reqId, status){
  const all = getRequests();
  const r = all.find(x => x.id === reqId);
  if(!r) return;
  r.status = status;
  setRequests(all);
  const cu = getCurrentUser();
  if(status === 'accepted'){
    pushNotification(r.fromId, `${cu.name} accepted your swap request.`, 'requests');
    showToast('Request accepted — schedule a session when ready.');
  }else if(status === 'declined'){
    pushNotification(r.fromId, `${cu.name} declined your swap request.`, 'requests');
    showToast('Request declined.');
  }else if(status === 'cancelled'){
    showToast('Request cancelled.');
  }
  renderRequests();
  renderNotifBell();
}

/* ---------------- Schedule session modal ---------------- */
function openScheduleModal(reqId){
  const cu = getCurrentUser();
  const r = getRequests().find(x => x.id === reqId);
  if(!r) return;
  const a = getUserById(r.fromId); // A = original requester
  const b = getUserById(r.toId);   // B = receiver

  const aTeachOptions = a.teach.length ? a.teach : [{skill:'(none listed)', level:''}];
  const bTeachOptions = b.teach.length ? b.teach : [{skill:'(none listed)', level:''}];

  openModal(`
    <div class="modal-head">
      <h3>Schedule your session</h3>
      <button class="modal-close" id="modal-close-btn">✕</button>
    </div>
    <div class="field">
      <label>${escapeHTML(a.name)} will teach</label>
      <select id="sch-a-skill">${aTeachOptions.map(s => `<option>${escapeHTML(s.skill)}</option>`).join('')}</select>
    </div>
    <div class="field">
      <label>${escapeHTML(b.name)} will teach</label>
      <select id="sch-b-skill">${bTeachOptions.map(s => `<option>${escapeHTML(s.skill)}</option>`).join('')}</select>
    </div>
    <div class="field">
      <label>Date &amp; time</label>
      <input type="datetime-local" id="sch-datetime">
    </div>
    <div class="field">
      <label>Session note (optional)</label>
      <textarea id="sch-note" rows="2" placeholder="e.g. Let's meet at the library, bring your laptop"></textarea>
    </div>
    <button class="btn btn-teal btn-block" id="confirm-schedule-btn">Confirm session</button>
  `);
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('confirm-schedule-btn').addEventListener('click', () => {
    const dt = document.getElementById('sch-datetime').value;
    if(!dt){ showToast('Pick a date and time first.'); return; }
    const sessions = getSessions();
    sessions.push({
      id: uid('s'), requestId: r.id,
      userAId: a.id, userBId: b.id,
      skillATeaches: document.getElementById('sch-a-skill').value,
      skillBTeaches: document.getElementById('sch-b-skill').value,
      datetime: dt,
      note: document.getElementById('sch-note').value.trim(),
      status: 'scheduled',
      ratingForA: null, ratingForB: null
    });
    setSessions(sessions);
    const otherId = cu.id === a.id ? b.id : a.id;
    pushNotification(otherId, `${cu.name} scheduled your swap session.`, 'sessions');
    closeModal();
    showToast('Session scheduled!');
    switchView(currentView === 'requests' ? 'requests' : 'sessions');
  });
}

/* ---------------- Sessions ---------------- */
function renderSessions(){
  const cu = getCurrentUser();
  const el = document.getElementById('view-sessions');
  const mine = getSessions().filter(s => s.userAId === cu.id || s.userBId === cu.id);
  const upcoming = mine.filter(s => s.status === 'scheduled').sort((a,b)=> new Date(a.datetime)-new Date(b.datetime));
  const completed = mine.filter(s => s.status === 'completed').sort((a,b)=> new Date(b.datetime)-new Date(a.datetime));

  el.innerHTML = `
    <div class="list-col-head">Upcoming</div>
    <div id="sess-upcoming" style="margin-bottom:26px;"></div>
    <div class="list-col-head">Completed</div>
    <div id="sess-completed"></div>
  `;

  const upEl = document.getElementById('sess-upcoming');
  upEl.innerHTML = upcoming.length ? upcoming.map(s => sessionCardHTML(s, cu)).join('')
    : emptyState('📅', 'No upcoming sessions', 'Accepted requests can be scheduled from the Requests tab.');

  const compEl = document.getElementById('sess-completed');
  compEl.innerHTML = completed.length ? completed.map(s => sessionCardHTML(s, cu)).join('')
    : emptyState('✅', 'No completed sessions yet', 'Mark a session complete after it happens to unlock ratings and badges.');

  wireSessionActions(el);
}

function sessionCardHTML(s, cu){
  const iAmA = s.userAId === cu.id;
  const other = getUserById(iAmA ? s.userBId : s.userAId);
  if(!other) return '';
  const mySkill = iAmA ? s.skillATeaches : s.skillBTeaches;
  const theirSkill = iAmA ? s.skillBTeaches : s.skillATeaches;

  let body = '';
  if(s.status === 'scheduled'){
    body = `<div class="row-actions"><button class="btn btn-gold btn-sm" data-complete="${s.id}">Mark as completed</button></div>`;
  }else{
    const myRatingGiven = iAmA ? s.ratingForB : s.ratingForA; // rating I gave to other
    const theirRatingGiven = iAmA ? s.ratingForA : s.ratingForB; // rating other gave me
    body = `
      ${myRatingGiven
        ? `<p style="font-size:12.5px;color:var(--ink-soft)">You rated ${escapeHTML(other.name)}'s teaching: ${'★'.repeat(myRatingGiven.stars)}${'☆'.repeat(5-myRatingGiven.stars)}</p>`
        : ratingFormHTML(s.id, iAmA ? 'B' : 'A', theirSkill)}
      ${theirRatingGiven
        ? `<p style="font-size:12.5px;color:var(--ink-soft)">${escapeHTML(other.name)} rated your teaching: ${'★'.repeat(theirRatingGiven.stars)}${'☆'.repeat(5-theirRatingGiven.stars)}</p>`
        : `<p style="font-size:12.5px;color:var(--ink-faint)">Waiting for ${escapeHTML(other.name)} to rate you.</p>`}
    `;
  }

  return `
    <div class="sess-card">
      <div class="sess-top">
        <div class="req-people">${avatarHTML(other,'sm')}<strong>${escapeHTML(other.name)}</strong></div>
        <span class="status-pill status-${s.status}">${s.status}</span>
      </div>
      <div class="exchange-line">
        <span class="tag tag-teach">You teach: ${escapeHTML(mySkill)}</span>
        <span class="arrow">⇄</span>
        <span class="tag tag-learn">They teach: ${escapeHTML(theirSkill)}</span>
      </div>
      <p style="font-size:12.5px;color:var(--ink-soft)">${fmtDateTime(s.datetime)}${s.note ? ' · ' + escapeHTML(s.note) : ''}</p>
      ${body}
    </div>`;
}

function ratingFormHTML(sessionId, who, skillLabel){
  return `
    <div class="rate-block" data-session="${sessionId}" data-who="${who}">
      <p style="font-size:12.5px;color:var(--ink-soft);margin-bottom:2px">Rate their teaching of "${escapeHTML(skillLabel)}"</p>
      <div class="star-row">
        ${[1,2,3,4,5].map(n => `<button type="button" class="star-btn" data-star="${n}">★</button>`).join('')}
      </div>
      <input type="text" class="rate-comment" placeholder="Optional comment" style="width:100%;padding:7px 9px;border-radius:6px;border:1px solid var(--line-strong);margin-bottom:6px;">
      <button class="btn btn-teal btn-sm submit-rating" disabled>Submit rating</button>
    </div>`;
}

function wireSessionActions(el){
  el.querySelectorAll('[data-complete]').forEach(b => b.addEventListener('click', () => {
    const sessions = getSessions();
    const s = sessions.find(x => x.id === b.dataset.complete);
    if(!s) return;
    s.status = 'completed';
    setSessions(sessions);
    const cu = getCurrentUser();
    const otherId = s.userAId === cu.id ? s.userBId : s.userAId;
    pushNotification(otherId, `${cu.name} marked your session as completed. Leave a rating!`, 'sessions');
    showToast('Session marked as completed.');
    renderSessions();
    renderNotifBell();
  }));

  el.querySelectorAll('.rate-block').forEach(block => {
    let selected = 0;
    const stars = block.querySelectorAll('.star-btn');
    const submitBtn = block.querySelector('.submit-rating');
    stars.forEach(st => {
      st.addEventListener('click', () => {
        selected = Number(st.dataset.star);
        stars.forEach(s2 => s2.classList.toggle('filled', Number(s2.dataset.star) <= selected));
        submitBtn.disabled = false;
      });
    });
    submitBtn.addEventListener('click', () => {
      if(!selected) return;
      const sessions = getSessions();
      const s = sessions.find(x => x.id === block.dataset.session);
      if(!s) return;
      const comment = block.querySelector('.rate-comment').value.trim();
      const cu = getCurrentUser();
      const iAmA = s.userAId === cu.id;
      // I'm rating the OTHER person's teaching.
      if(iAmA){ s.ratingForB = { stars: selected, comment }; }
      else{ s.ratingForA = { stars: selected, comment }; }
      setSessions(sessions);
      const otherId = iAmA ? s.userBId : s.userAId;
      pushNotification(otherId, `${cu.name} rated your teaching ${selected}★.`, 'sessions');
      showToast('Thanks for rating!');
      renderSessions();
    });
  });
}

/* ---------------- Lounge / Virtual Meet ---------------- */
const CHANNELS = [
  { id: 'general-chat', name: 'General Chat' },
  { id: 'quiet-study', name: 'Quiet Study' },
  { id: 'web-dev-help', name: 'Web Dev Help' },
  { id: 'design-collab', name: 'Design Collab' }
];

let jitsiAPI = null;
let loungeRendered = false;

function renderLounge() {
  const el = document.getElementById('view-lounge');
  
  if (loungeRendered) return; // Don't re-render and kill active calls when navigating back
  loungeRendered = true;

  el.innerHTML = `
    <div class="lounge-layout">
      <div class="lounge-sidebar">
        <div class="lounge-sidebar-header">Voice Channels</div>
        <div class="lounge-channels" id="lounge-channel-list">
          ${CHANNELS.map(c => `
            <button class="lounge-channel-btn" data-channel="${c.id}">
              <span class="hashtag">#</span> ${escapeHTML(c.name)}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="lounge-main">
        <div class="lounge-empty" id="lounge-empty-state">
          <div style="font-size:48px; margin-bottom:16px;">👋</div>
          <h2>Welcome to the Lounge</h2>
          <p>Select a voice channel on the left to join the meet.</p>
        </div>
        <div class="jitsi-container hidden" id="jitsi-container"></div>
      </div>
    </div>
  `;

  const btns = el.querySelectorAll('.lounge-channel-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      joinChannel(btn.dataset.channel, CHANNELS.find(x => x.id === btn.dataset.channel).name);
    });
  });
}

function joinChannel(channelId, channelName) {
  const container = document.getElementById('jitsi-container');
  const emptyState = document.getElementById('lounge-empty-state');
  
  container.classList.remove('hidden');
  emptyState.classList.add('hidden');
  
  if (jitsiAPI) {
    jitsiAPI.dispose();
  }
  
  const cu = getCurrentUser();
  const domain = 'meet.jit.si';
  const options = {
    roomName: 'Skillmate_' + channelId,
    width: '100%',
    height: '100%',
    parentNode: container,
    userInfo: {
      displayName: cu.name
    },
    configOverwrite: {
      startWithAudioMuted: true,
      startWithVideoMuted: true,
      prejoinPageEnabled: false
    }
  };
  
  jitsiAPI = new JitsiMeetExternalAPI(domain, options);
}

/* ---------------- Init ---------------- */
document.addEventListener('DOMContentLoaded', boot);
