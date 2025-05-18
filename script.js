// Zonas fijas
const fixedZones = [
  { tz: 'America/Guatemala', el: 'time1' },
  { tz: 'America/Bogota',   el: 'time2' },
];

// Zonas para el selector, ahora incluyendo California
const commonZones = [
  { label: 'Pacific Time (US)',  tz: 'America/Los_Angeles' },
  { label: 'Mountain Time (US)', tz: 'America/Denver'          },
  { label: 'Central Time (US)',  tz: 'America/Chicago'         },
  { label: 'Eastern Time (US)',  tz: 'America/New_York'        },
  { label: 'London (UK)',        tz: 'Europe/London'           },
  { label: 'Madrid (ES)',        tz: 'Europe/Madrid'           },
  { label: 'Tokyo (JP)',         tz: 'Asia/Tokyo'              },
  { label: 'Sydney (AU)',        tz: 'Australia/Sydney'        },
];

const select3 = document.getElementById('tz3-select');
// Poblar opciones
commonZones.forEach(({label, tz}) => {
  const opt = document.createElement('option');
  opt.value = tz;
  opt.textContent = label;
  select3.appendChild(opt);
});
// Valor por defecto
select3.value = commonZones[0].tz;

function updateClocks() {
  const now = new Date();
  // Relojes fijos
  fixedZones.forEach(({tz, el}) => {
    document.getElementById(el).textContent = new Intl.DateTimeFormat(navigator.language, {
      hour: 'numeric', minute: 'numeric',
      hour12: true, timeZone: tz
    }).format(now);
  });
  // Reloj dinámico
  const tz3 = select3.value;
  document.getElementById('time3').textContent = new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric', minute: 'numeric',
    hour12: true, timeZone: tz3
  }).format(now);
}

// Dinámico sin reload
updateClocks();
setInterval(updateClocks, 30000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateClocks();
});
select3.addEventListener('change', updateClocks);
