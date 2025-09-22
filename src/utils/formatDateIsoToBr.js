

export function formatIsoToBRDateTime(isoString) {
    if (!isoString) return '-';
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return '-';
  
    const parts = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false,
    }).formatToParts(d);
  
    const get = (t) => parts.find(p => p.type === t)?.value || '';
    return `${get('day')}/${get('month')}/${get('year')} ${get('hour')}:${get('minute')}:${get('second')}`;
  }