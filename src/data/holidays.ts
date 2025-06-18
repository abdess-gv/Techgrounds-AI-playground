
export interface Holiday {
  date: string; // YYYY-MM-DD format
  name: string;
  type: 'national' | 'regional' | 'religious';
}

export const dutchHolidays: Holiday[] = [
  // 2024
  { date: '2024-01-01', name: 'Nieuwjaarsdag', type: 'national' },
  { date: '2024-03-29', name: 'Goede Vrijdag', type: 'religious' },
  { date: '2024-03-31', name: 'Eerste Paasdag', type: 'national' },
  { date: '2024-04-01', name: 'Tweede Paasdag', type: 'national' },
  { date: '2024-04-27', name: 'Koningsdag', type: 'national' },
  { date: '2024-05-05', name: 'Bevrijdingsdag', type: 'national' },
  { date: '2024-05-09', name: 'Hemelvaart', type: 'national' },
  { date: '2024-05-19', name: 'Eerste Pinksterdag', type: 'national' },
  { date: '2024-05-20', name: 'Tweede Pinksterdag', type: 'national' },
  { date: '2024-12-25', name: 'Eerste Kerstdag', type: 'national' },
  { date: '2024-12-26', name: 'Tweede Kerstdag', type: 'national' },
  
  // 2025
  { date: '2025-01-01', name: 'Nieuwjaarsdag', type: 'national' },
  { date: '2025-04-18', name: 'Goede Vrijdag', type: 'religious' },
  { date: '2025-04-20', name: 'Eerste Paasdag', type: 'national' },
  { date: '2025-04-21', name: 'Tweede Paasdag', type: 'national' },
  { date: '2025-04-26', name: 'Koningsdag', type: 'national' },
  { date: '2025-05-05', name: 'Bevrijdingsdag', type: 'national' },
  { date: '2025-05-29', name: 'Hemelvaart', type: 'national' },
  { date: '2025-06-08', name: 'Eerste Pinksterdag', type: 'national' },
  { date: '2025-06-09', name: 'Tweede Pinksterdag', type: 'national' },
  { date: '2025-12-25', name: 'Eerste Kerstdag', type: 'national' },
  { date: '2025-12-26', name: 'Tweede Kerstdag', type: 'national' },
  
  // 2026
  { date: '2026-01-01', name: 'Nieuwjaarsdag', type: 'national' },
  { date: '2026-04-03', name: 'Goede Vrijdag', type: 'religious' },
  { date: '2026-04-05', name: 'Eerste Paasdag', type: 'national' },
  { date: '2026-04-06', name: 'Tweede Paasdag', type: 'national' },
  { date: '2026-04-27', name: 'Koningsdag', type: 'national' },
  { date: '2026-05-05', name: 'Bevrijdingsdag', type: 'national' },
  { date: '2026-05-14', name: 'Hemelvaart', type: 'national' },
  { date: '2026-05-24', name: 'Eerste Pinksterdag', type: 'national' },
  { date: '2026-05-25', name: 'Tweede Pinksterdag', type: 'national' },
  { date: '2026-12-25', name: 'Eerste Kerstdag', type: 'national' },
  { date: '2026-12-26', name: 'Tweede Kerstdag', type: 'national' },
];

export const isHoliday = (date: Date): Holiday | null => {
  const dateString = date.toISOString().split('T')[0];
  return dutchHolidays.find(holiday => holiday.date === dateString) || null;
};

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};

export const isExcludedDate = (date: Date): boolean => {
  return isWeekend(date) || isHoliday(date) !== null;
};
