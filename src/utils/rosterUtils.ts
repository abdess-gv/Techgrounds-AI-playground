
export const calculateGroupWeek = (anchorDate: Date, targetDate: Date, cycleWeeks: number = 4): {
  groupNumber: number;
  currentWeek: number;
  weekStartDate: Date;
} => {
  // Calculate the difference in days from anchor date
  const diffTime = targetDate.getTime() - anchorDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Calculate which week we're in since the anchor date
  const totalWeeks = Math.floor(diffDays / 7);
  
  // Calculate current week in the cycle (1-4)
  const currentWeek = (totalWeeks % cycleWeeks) + 1;
  
  // Calculate which group number this represents
  const groupNumber = Math.floor(totalWeeks / cycleWeeks) + 1;
  
  // Calculate the start date of the current week
  const weekStartDate = new Date(anchorDate);
  weekStartDate.setDate(anchorDate.getDate() + (totalWeeks * 7));
  
  return {
    groupNumber,
    currentWeek,
    weekStartDate
  };
};

export const generateWeekDates = (startDate: Date): Date[] => {
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }
  return dates;
};

export const formatTime = (time: string): string => {
  return time.substring(0, 5); // Remove seconds if present
};

export const getDayName = (dayIndex: number): string => {
  const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
  return days[dayIndex];
};

export const getLocationIcon = (locationType: string): string => {
  switch (locationType) {
    case 'Online': return '💻';
    case 'Fysiek': return '🏢';
    case 'Zelfstudie': return '📚';
    default: return '📍';
  }
};
