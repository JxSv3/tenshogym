// ============================================================
// TenshoGym - UI compartida (Sidebar)
// ============================================================

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

  const linksHtml = visibles.map(l => `
    <a href="${l.href}" class="sidebar-link ${l.key === active ? 'active' : ''}">
      <span class="icon">${l.icon}</span> ${l.label}
    </a>
  `).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <span class="logo-dot"></span>
        TenshoGym <span class="sub">CRM</span>
      </div>
      <nav class="sidebar-nav">
        <div class="sidebar-label">Menú</div>
        ${linksHtml}
      </nav>
      <div class="sidebar-footer">
        ${perfil ? `
          <div class="sidebar-user">
            <div class="avatar">${iniciales}</div>
            <div class="info">
              <div class="name">${perfil.nombre}</div>
              <div class="role">${perfil.rol === 'admin' ? 'Administrador' : 'Recepción'}</div>
            </div>
          </div>` : ''}
        <div class="flex-gap" style="gap:8px">
          <button id="theme-toggle-btn" class="theme-toggle" onclick="toggleTheme()" title="Cambiar tema">☀️</button>
          <button class="btn btn-danger btn-sm btn-block" onclick="cerrarSesion()">Cerrar sesión</button>
        </div>
      </div>
    </aside>
  `);

  // Topbar con hamburger (mobile)
  const main = document.querySelector('.main-content');
  if (main) {
    main.insertAdjacentHTML('afterbegin', `
      <div class="topbar">
        <button class="sidebar-toggle" onclick="toggleSidebar()">☰</button>
        <span class="topbar-title">${visibles.find(l=>l.key===active)?.label || ''}</span>
        <div></div>
      </div>
    `);
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

// Alias para compatibilidad (algunas páginas llaman renderNavbar)
function renderNavbar(active, perfil) { renderSidebar(active, perfil); }
