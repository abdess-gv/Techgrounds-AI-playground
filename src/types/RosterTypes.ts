
export interface RosterEntry {
  id: string;
  program_id: string;
  week_number: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
  title: string;
  description?: string;
  location_type: 'Online' | 'Fysiek' | 'Zelfstudie';
  location_details?: string;
  meeting_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Program {
  id: string;
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  anchor_date?: string;
  cycle_weeks?: number;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface GroupCalculation {
  groupNumber: number;
  currentWeek: number;
  weekStartDate: Date;
}
