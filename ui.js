// ============================================================
// TenshoGym - UI compartida (Navbar)
// ============================================================

function renderNavbar(active, perfil) {
  const links = [
    { href: 'dashboard.html', label: 'Dashboard', key: 'dashboard', roles: ['admin', 'recepcion'] },
    { href: 'clientes.html', label: 'Clientes', key: 'clientes', roles: ['admin', 'recepcion'] },
    { href: 'membresias.html', label: 'Membresías', key: 'membresias', roles: ['admin', 'recepcion'] },
    { href: 'asistencia.html', label: 'Asistencia', key: 'asistencia', roles: ['admin', 'recepcion'] },
    { href: 'respaldo.html', label: 'Respaldos', key: 'respaldo', roles: ['admin'] },
    { href: 'usuarios.html', label: 'Usuarios', key: 'usuarios', roles: ['admin'] }
  ];

  const rol = perfil ? perfil.rol : 'recepcion';
  const visibles = links.filter(l => l.roles.includes(rol));

  const linksHtml = visibles.map(l => `
    <a href="${l.href}" class="${l.key === active ? 'active' : ''}">${l.label}</a>
  `).join('');

  const nav = document.createElement('div');
  nav.className = 'navbar';
  nav.innerHTML = `
    <div class="brand">
      <span class="logo-dot"></span>
      TenshoGym <span class="sub">CRM</span>
    </div>
    <div class="nav-links">
      ${linksHtml}
      <button id="theme-toggle-btn" class="theme-toggle" onclick="toggleTheme()" title="Cambiar tema">☀️</button>
      ${perfil ? `<span class="text-secondary" style="font-size:0.82rem; margin-left:4px">${perfil.nombre}</span>` : ''}
      <button class="btn btn-secondary btn-sm" onclick="cerrarSesion()">Salir</button>
    </div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);
  initTheme();
}
