import { parse, parseISO } from 'date-fns';



const toDateObj = (raw) => {

  if (!raw) return null;
  if (raw instanceof Date) return raw;
  if (typeof raw === 'number') return new Date(raw); // timestamp (ms)

  if (typeof raw === 'string') {
    const s = raw.trim();

    // 1) dd/MM/yyyy
    if (s.includes('/')) return parse(s, 'dd/MM/yyyy', new Date());

    // 2) ISO 8601 (tem 'T' ou ':', opcional 'Z' no fim)
    if (s.includes('T') || s.includes(':')) return parseISO(s);

    // 3) yyyy-MM-dd
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return parse(s, 'yyyy-MM-dd', new Date());

    // 4) fallback
    const d = new Date(s);
    return isNaN(d) ? null : d;
  }

  return null;
};


export default toDateObj;