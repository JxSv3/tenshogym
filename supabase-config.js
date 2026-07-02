const SUPABASE_URL = 'https://wjwfugwgbzfhouhkamoo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_zTo1oh7WoKRvUJxFvztF_A_2GV1vvSN';

const _supabaseLib = window.supabase;
window.supabase = _supabaseLib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const supabaseAdmin = _supabaseLib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, storageKey: 'tenshogym-admin-temp' }
});

const SUCURSALES = {
  1: { nombre: 'Sucursal Calderon', clase: 'pill-sucursal-1' },
  2: { nombre: 'Sucursal Marianas', clase: 'pill-sucursal-2' }
};
const DIAS_ALERTA_VENCIMIENTO = 7;

function hoyISO() {
  const d = new Date(), off = d.getTimezoneOffset();
  return new Date(d.getTime() - off*60000).toISOString().split('T')[0];
}
function formatDate(s) {
  if (!s) return '-';
  const [y,m,d] = s.split('-');
  return `${d}/${m}/${y}`;
}
function calcularFechaFin(inicio, dias) {
  const d = new Date(inicio+'T00:00:00');
  d.setDate(d.getDate()+parseInt(dias,10));
  return d.toISOString().split('T')[0];
}
function diasRestantes(fechaFin) {
  const hoy = new Date(hoyISO()+'T00:00:00');
  const fin = new Date(fechaFin+'T00:00:00');
  return Math.round((fin-hoy)/(1000*60*60*24));
}
function estadoMembresiaPorFecha(fechaFin) {
  const d = diasRestantes(fechaFin);
  if (d < 0) return 'vencida';
  if (d <= DIAS_ALERTA_VENCIMIENTO) return 'por_vencer';
  return 'activa';
}
function badgeEstadoMembresia(fechaFin) {
  const estado = estadoMembresiaPorFecha(fechaFin);
  const dias = diasRestantes(fechaFin);
  if (estado === 'vencida') return `<span class="badge badge-danger"><span class="badge-dot"></span> Vencida (${Math.abs(dias)}d)</span>`;
  if (estado === 'por_vencer') return `<span class="badge badge-warning"><span class="badge-dot"></span> Por vencer (${dias}d)</span>`;
  return `<span class="badge badge-success"><span class="badge-dot"></span> Activa (${dias}d)</span>`;
}
function formatMoney(v) { return '$'+(Number(v||0)).toFixed(2); }
function nombreSucursal(id) { return SUCURSALES[id]?.nombre || 'N/D'; }
function pillSucursal(id) {
  const s = SUCURSALES[id];
  if (!s) return '<span class="badge badge-muted">N/D</span>';
  return `<span class="badge ${s.clase}">${s.nombre}</span>`;
}
function telefonoWhatsapp(tel) {
  if (!tel) return null;
  let t = tel.replace(/\D/g,'');
  if (t.startsWith('0')) t = '593'+t.substring(1);
  else if (!t.startsWith('593')) t = '593'+t;
  return t;
}
function linkRecordatorioWhatsapp(cliente, membresia) {
  const n = telefonoWhatsapp(cliente.telefono);
  if (!n) return null;
  const msg = `Hola ${cliente.nombre}, te recordamos que tu membresía "${membresia.nombre_plan}" en TenshoGym vence el ${formatDate(membresia.fecha_fin)}. ¡Te esperamos para renovar! 💪`;
  return `https://wa.me/${n}?text=${encodeURIComponent(msg)}`;
}
function showToast(message, type='success') {
  let c = document.getElementById('toast-container');
  if (!c) { c = document.createElement('div'); c.id='toast-container'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = `toast ${type}`; t.textContent = message; c.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity 0.3s'; setTimeout(()=>t.remove(),300); }, 3200);
}
function initTheme() {
  const saved = localStorage.getItem('tenshogym_theme')||'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur==='light'?'dark':'light';
  document.documentElement.setAttribute('data-theme',next);
  localStorage.setItem('tenshogym_theme',next);
  updateThemeIcon(next);
}
function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = theme==='light'?'🌙':'☀️';
}
function openModal(id) { document.getElementById(id)?.classList.add('active'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('active'); }
document.addEventListener('click', e => {
  if (e.target.classList?.contains('modal-overlay')) e.target.classList.remove('active');
});
