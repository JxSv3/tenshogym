// ============================================================
// TenshoGym - Configuración de Supabase
// ============================================================
// 1. Crea un proyecto en https://supabase.com
// 2. Ejecuta el script "database_schema.sql" en el SQL Editor
// 3. Reemplaza las dos constantes de abajo con los datos de tu
//    proyecto (Project Settings > API)
// ============================================================

const SUPABASE_URL = 'https://wjwfugwgbzfhouhkamoo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_zTo1oh7WoKRvUJxFvztF_A_2GV1vvSN';

window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
// CONSTANTES
// ============================================================

// IDs de sucursales (deben coincidir con la tabla "sucursales")
const SUCURSALES = {
  1: { nombre: 'Sucursal Calderon', clase: 'pill-sucursal-1' },
  2: { nombre: 'Sucursal Marianas', clase: 'pill-sucursal-2' }
};

// Días para considerar una membresía "por vencer"
const DIAS_ALERTA_VENCIMIENTO = 7;

// ============================================================
// UTILIDADES DE FECHAS
// ============================================================

// Devuelve la fecha de hoy en formato YYYY-MM-DD (zona local)
function hoyISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().split('T')[0];
}

// Convierte YYYY-MM-DD a DD/MM/YYYY para mostrar
function formatDate(dateStr) {
  if (!dateStr) return '-';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

// Calcula fecha fin = fecha_inicio + duracion_dias (string YYYY-MM-DD)
function calcularFechaFin(fechaInicio, duracionDias) {
  const date = new Date(fechaInicio + 'T00:00:00');
  date.setDate(date.getDate() + parseInt(duracionDias, 10));
  return date.toISOString().split('T')[0];
}

// Devuelve los días restantes entre hoy y fechaFin (puede ser negativo si ya venció)
function diasRestantes(fechaFin) {
  const hoy = new Date(hoyISO() + 'T00:00:00');
  const fin = new Date(fechaFin + 'T00:00:00');
  const diffMs = fin.getTime() - hoy.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

// Determina el estado de una membresía según su fecha de fin
// Devuelve: 'activa' | 'por_vencer' | 'vencida'
function estadoMembresiaPorFecha(fechaFin) {
  const dias = diasRestantes(fechaFin);
  if (dias < 0) return 'vencida';
  if (dias <= DIAS_ALERTA_VENCIMIENTO) return 'por_vencer';
  return 'activa';
}

// Devuelve el HTML de un badge según el estado de la membresía
function badgeEstadoMembresia(fechaFin) {
  const estado = estadoMembresiaPorFecha(fechaFin);
  const dias = diasRestantes(fechaFin);

  if (estado === 'vencida') {
    return `<span class="badge badge-danger"><span class="badge-dot"></span> Vencida (${Math.abs(dias)}d)</span>`;
  }
  if (estado === 'por_vencer') {
    return `<span class="badge badge-warning"><span class="badge-dot"></span> Por vencer (${dias}d)</span>`;
  }
  return `<span class="badge badge-success"><span class="badge-dot"></span> Activa (${dias}d)</span>`;
}

// ============================================================
// FORMATO DE DINERO
// ============================================================
function formatMoney(value) {
  const num = Number(value || 0);
  return '$' + num.toFixed(2);
}

// ============================================================
// SUCURSALES - HELPERS
// ============================================================
function nombreSucursal(id) {
  return SUCURSALES[id] ? SUCURSALES[id].nombre : 'N/D';
}

function pillSucursal(id) {
  const s = SUCURSALES[id];
  if (!s) return '<span class="badge badge-muted">N/D</span>';
  return `<span class="badge ${s.clase}">${s.nombre}</span>`;
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ============================================================
// TEMA OSCURO / CLARO
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('tenshogym_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('tenshogym_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ============================================================
// MODAL HELPERS
// ============================================================
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add('active');
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('active');
}

// Cierra el modal si se hace click fuera del contenido
document.addEventListener('click', (e) => {
  if (e.target.classList && e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});
