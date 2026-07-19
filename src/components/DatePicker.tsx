import { useState, useRef, useEffect } from 'react';
import { FaRegCalendar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  label: string;
  placeholder?: string;
}

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const DAY_LABELS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

function parseDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return { year: y, month: m, day: d };
}

function toDateString(year: number, month: number, day: number) {
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month - 1, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function formatDisplay(dateStr: string) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function DatePicker({ value, onChange, minDate, label, placeholder }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'day' | 'month' | 'year'>('day');
  const containerRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const { year: selYear, month: selMonth, day: selDay } = value
    ? parseDate(value)
    : { year: currentYear, month: new Date().getMonth() + 1, day: new Date().getDate() };

  const minParsed = minDate ? parseDate(minDate) : null;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setViewMode('day');
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setViewMode('day');
  }, [isOpen]);

  function isDisabledDay(year: number, month: number, day: number) {
    if (!minParsed) return false;
    const ts = new Date(year, month - 1, day).getTime();
    const minTs = new Date(minParsed.year, minParsed.month - 1, minParsed.day).getTime();
    return ts < minTs;
  }

  function changeYear(y: number) {
    const maxDay = getDaysInMonth(y, selMonth);
    const d = Math.min(selDay, maxDay);
    onChange(toDateString(y, selMonth, d));
  }

  function changeMonth(m: number) {
    const maxDay = getDaysInMonth(selYear, m);
    const d = Math.min(selDay, maxDay);
    onChange(toDateString(selYear, m, d));
  }

  function selectDay(d: number) {
    onChange(toDateString(selYear, selMonth, d));
    setIsOpen(false);
    setViewMode('day');
  }

  function prevYear() {
    if (minParsed && selYear - 1 < minParsed.year) return;
    changeYear(selYear - 1);
  }

  function nextYear() { changeYear(selYear + 1); }

  function prevMonth() {
    if (minParsed) {
      const prevYear = selMonth === 1 ? selYear - 1 : selYear;
      const prevMonth = selMonth === 1 ? 12 : selMonth - 1;
      if (prevYear < minParsed.year || (prevYear === minParsed.year && prevMonth < minParsed.month)) return;
    }
    if (selMonth === 1) onChange(toDateString(selYear - 1, 12, selDay));
    else onChange(toDateString(selYear, selMonth - 1, selDay));
  }

  function nextMonth() {
    if (selMonth === 12) onChange(toDateString(selYear + 1, 1, selDay));
    else onChange(toDateString(selYear, selMonth + 1, selDay));
  }

  const daysInMonth = getDaysInMonth(selYear, selMonth);
  const firstDay = getFirstDayOfMonth(selYear, selMonth);

  const yearOptions = [currentYear - 1, currentYear, currentYear + 1, currentYear + 2, currentYear + 3];

  return (
    <div className="search-field" ref={containerRef}>
      <label>{label}</label>
      <div className="search-input-wrapper" onClick={() => setIsOpen(!isOpen)}>
        <span className={`date-text-display ${!value ? 'placeholder' : ''}`}>
          {value ? formatDisplay(value) : (placeholder || 'Seleccionar fecha')}
        </span>
        <FaRegCalendar className="search-calendar-icon" />
      </div>

      {isOpen && (
        <div className="date-picker-dropdown">
          {/* Header with year and month arrows */}
          <div className="dp-header">
            <div className="dp-header-section">
              <button type="button" className="dp-arrow-btn" onClick={prevYear}>
                <FaChevronLeft size={11} />
              </button>
              <button
                type="button"
                className={`dp-header-label ${viewMode === 'year' ? 'active' : ''}`}
                onClick={() => setViewMode(viewMode === 'year' ? 'day' : 'year')}
              >
                {selYear}
              </button>
              <button type="button" className="dp-arrow-btn" onClick={nextYear}>
                <FaChevronRight size={11} />
              </button>
            </div>

            <div className="dp-header-section">
              <button type="button" className="dp-arrow-btn" onClick={prevMonth}>
                <FaChevronLeft size={11} />
              </button>
              <button
                type="button"
                className={`dp-header-label ${viewMode === 'month' ? 'active' : ''}`}
                onClick={() => setViewMode(viewMode === 'month' ? 'day' : 'month')}
              >
                {MONTH_NAMES[selMonth - 1]}
              </button>
              <button type="button" className="dp-arrow-btn" onClick={nextMonth}>
                <FaChevronRight size={11} />
              </button>
            </div>
          </div>

          {/* Year picker view */}
          {viewMode === 'year' && (
            <div className="dp-year-grid">
              {yearOptions.map(y => {
                const disabled = !!(minParsed && y < minParsed.year);
                return (
                  <button
                    key={y}
                    type="button"
                    className={`dp-year-btn ${y === selYear ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                    onClick={() => { if (!disabled) { changeYear(y); setViewMode('day'); } }}
                    disabled={disabled}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
          )}

          {/* Month picker view */}
          {viewMode === 'month' && (
            <div className="dp-month-grid">
              {MONTH_NAMES.map((name, i) => {
                const m = i + 1;
                const disabled = !!(minParsed && selYear === minParsed.year && m < minParsed.month);
                return (
                  <button
                    key={m}
                    type="button"
                    className={`dp-month-btn ${m === selMonth ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                    onClick={() => { if (!disabled) { changeMonth(m); setViewMode('day'); } }}
                    disabled={disabled}
                  >
                    {name.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          )}

          {/* Day grid (default view) */}
          {viewMode === 'day' && (
            <div className="dp-day-grid">
              {DAY_LABELS.map(d => (
                <span key={d} className="dp-day-label">{d}</span>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <span key={`empty-${i}`} className="dp-day-empty" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const d = i + 1;
                const disabled = isDisabledDay(selYear, selMonth, d);
                const today = toDateString(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
                const isToday = toDateString(selYear, selMonth, d) === today;
                return (
                  <button
                    key={d}
                    type="button"
                    className={`dp-day-btn ${d === selDay ? 'selected' : ''} ${isToday ? 'today' : ''} ${disabled ? 'disabled' : ''}`}
                    onClick={() => !disabled && selectDay(d)}
                    disabled={disabled}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
