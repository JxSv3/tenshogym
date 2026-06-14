// ============================================================
// TenshoGym - UI compartida (Navbar)
// ============================================================

function renderNavbar(active) {
  const links = [
    { href: 'index.html', label: 'Dashboard', key: 'dashboard' },
    { href: 'clientes.html', label: 'Clientes', key: 'clientes' },
    { href: 'membresias.html', label: 'Membresías', key: 'membresias' },
    { href: 'asistencia.html', label: 'Asistencia', key: 'asistencia' }
  ];

  const linksHtml = links.map(l => `
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
    </div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);
  initTheme();
}
