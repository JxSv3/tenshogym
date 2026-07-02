// ============================================================
// TenshoGym - Autenticación y control de roles
// ============================================================

// Verifica sesión activa y permiso de rol. Redirige si no cumple.
// allowedRoles: array de roles permitidos en esta página (omitir = cualquier rol logueado)
async function requireAuth(allowedRoles) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }

  const { data: perfil, error } = await supabase
    .from('perfiles')async function requireAuth(allowedRoles) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { window.location.href = 'index.html'; return null; }

  const { data: perfil, error } = await supabase
    .from('perfiles').select('*').eq('id', session.user.id).single();

  if (error || !perfil || perfil.activo === false) {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(perfil.rol)) {
    window.location.href = 'dashboard.html';
    return null;
  }
  return perfil;
}

async function cerrarSesion() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}

    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error || !perfil || perfil.activo === false) {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(perfil.rol)) {
    window.location.href = 'dashboard.html';
    return null;
  }

  return perfil;
}

async function cerrarSesion() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}
