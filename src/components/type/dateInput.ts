export interface DataInput {
    id: number
    name: string;
    time: string;
    nameLecture?: string;
}

export interface DataDialog {
  
    name: string;
    time: string;
    nameLecture?: string;
}

export interface ScheduleItem {
    id: number;
    name: string;
    time: string;
    nameLecture?: string; 
}
export interface ScheduleState {
   'תפילות ליל שבת': ScheduleItem[];
    'תפילות יום שבת': ScheduleItem[];
    'שיעורים': ScheduleItem[];
    'פעילות לילדים': ScheduleItem[];
}