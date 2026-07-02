function renderSidebar(active, perfil) {
  const rol = perfil ? perfil.rol : 'recepcion';
  const links = [
    { href:'dashboard.html', label:'Dashboard', key:'dashboard', icon:'📊', roles:['admin','recepcion'] },
    { href:'clientes.html', label:'Clientes', key:'clientes', icon:'👥', roles:['admin','recepcion'] },
    { href:'membresias.html', label:'Membresías', key:'membresias', icon:'🎫', roles:['admin','recepcion'] },
    { href:'asistencia.html', label:'Asistencia', key:'asistencia', icon:'✅', roles:['admin','recepcion'] },
    { href:'inventario.html', label:'Inventario', key:'inventario', icon:'🧃', roles:['admin','recepcion'] },
    { href:'respaldo.html', label:'Respaldos', key:'respaldo', icon:'💾', roles:['admin'] },
    { href:'usuarios.html', label:'Usuarios', key:'usuarios', icon:'🔑', roles:['admin'] },
  ];
  const visibles = links.filter(l => l.roles.includes(rol));
  const iniciales = perfil ? perfil.nombre.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : '?';

  // Insertar sidebar ANTES del .app-layout (primer hijo del body)
  const sidebarEl = document.createElement('div');
  sidebarEl.innerHTML = `
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <span class="logo-dot"></span>TenshoGym <span class="sub">CRM</span>
      </div>
      <nav class="sidebar-nav">
        <div class="sidebar-label">Menú</div>
        ${visibles.map(l=>`
          <a href="${l.href}" class="sidebar-link ${l.key===active?'active':''}">
            <span class="icon">${l.icon}</span>${l.label}
          </a>`).join('')}
      </nav>
      <div class="sidebar-footer">
        ${perfil?`<div class="sidebar-user">
          <div class="avatar">${iniciales}</div>
          <div class="info"><div class="name">${perfil.nombre}</div><div class="role">${perfil.rol==='admin'?'Administrador':'Recepción'}</div></div>
        </div>`:''}
        <div class="flex-gap" style="gap:8px">
          <button id="theme-toggle-btn" class="theme-toggle" onclick="toggleTheme()" title="Cambiar tema">☀️</button>
          <button class="btn btn-danger btn-sm" style="flex:1" onclick="cerrarSesion()">Salir</button>
        </div>
      </div>
    </aside>`;

  document.body.insertBefore(sidebarEl.firstElementChild, document.body.firstChild); // overlay
  document.body.insertBefore(sidebarEl.firstElementChild, document.body.firstChild); // sidebar

  // Topbar mobile dentro de .main-content
  const main = document.querySelector('.main-content');
  if (main) {
    const topbar = document.createElement('div');
    topbar.className = 'topbar';
    topbar.innerHTML = `
      <button class="sidebar-toggle" onclick="toggleSidebar()">☰</button>
      <span class="topbar-title">${visibles.find(l=>l.key===active)?.label||''}</span>
      <div></div>`;
    main.insertBefore(topbar, main.firstChild);
  }

  initTheme();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}
function renderNavbar(active, perfil) { renderSidebar(active, perfil); }
