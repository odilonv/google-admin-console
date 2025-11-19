import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

// Small date picker that exposes both calendar and manual input (d/MM/YYYY)
const DateFilter: React.FC<Props> = ({ value, onChange }) => {
  // Convert value like "1/05/2020" or "01/05/2020" to yyyy-mm-dd for input[type=date]
  const toISO = (val: string) => {
    if (!val) return '';
    // try parsing dd/mm/yyyy or d/m/yyyy
    const m = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (m) {
      const day = String(m[1]).padStart(2, '0');
      const month = String(m[2]).padStart(2, '0');
      return `${m[3]}-${month}-${day}`; // yyyy-mm-dd
    }
    // try ISO-ish
    const iso = new Date(val);
    if (!isNaN(iso.getTime())) {
      const y = iso.getFullYear();
      const mm = String(iso.getMonth() + 1).padStart(2, '0');
      const dd = String(iso.getDate()).padStart(2, '0');
      return `${y}-${mm}-${dd}`;
    }
    return '';
  };

  const fromISO = (iso: string) => {
    if (!iso) return '';
    // iso: yyyy-mm-dd
    const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) {
      return `${Number(m[3])}/${m[2]}/${m[1]}`; // d/MM/YYYY (day as number)
    }
    return '';
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const iso = e.target.value; // yyyy-mm-dd
    const formatted = fromISO(iso);
    onChange(formatted);
  };

  return (
    <input
      type="date"
      className="column-filter-input date-filter-input"
      value={toISO(value)}
      onChange={handleDateChange}
      aria-label="Select date"
    />
  );
};

export default DateFilter;
