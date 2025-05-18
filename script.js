// Zonas horarias por defecto
const zones = ['America/Guatemala', 'America/Bogota'];
// Permite cambiar la 3ª zona con ?tz3=Europe/Madrid
const params = new URLSearchParams(location.search);
const tz3 = params.get('tz3') || 'America/Chicago';
zones.push(tz3);

// Etiqueta corta para el tercer reloj
const tz3Label = document.getElementById('tz3-label');
const parts = tz3.split('/');
tz3Label.textContent = parts[parts.length - 1]
  .replace(/_/g, ' ')
  .split(' ')
  .map(w => w[0])
  .join('')
  .toUpperCase();
tz3Label.title = tz3;

function updateClocks() {
  const now = new Date();
  zones.forEach((tz, i) => {
    const timeStr = new Intl.DateTimeFormat(navigator.language, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,      // poner false para 24h
      timeZone: tz
    }).format(now);
    document.querySelector(`#clock${i+1} .time`).textContent = timeStr;
  });
}

// Actualiza dinámicamente: al cargar, cada 30 s y al volver de pestaña oculta
updateClocks();
setInterval(updateClocks, 30_000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateClocks();
});
