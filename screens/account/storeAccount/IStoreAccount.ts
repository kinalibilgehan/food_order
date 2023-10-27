import {Coordinate} from '../../mainScreen/IMainScreen';

export interface StoreWorkDayCurrent {
  id: string;
  storeId: string;
  workingHourBegin: string;
  workingHourEnd: string;
  courrierHourBegin: string;
  courrierHourEnd: string;
  isActive: boolean;
  hasCourrierService: boolean;
  date: string;
}

export interface StoreWorkDayGeneral {
  id: string;
  storeId: string;
  dayNumber: number;
  dayName: string;
  workingHourBegin: string;
  workingHourEnd: string;
  courrierHourBegin: string;
  courrierHourEnd: string;
  isActive: boolean;
  hasCourrierService: boolean;
}

export interface WorkingDayTimeSlotResponseDto {
  dayDate: string;
  timeSlotsWithCourrier: TimeSlotWithCourrier[];
  dayName: string;
}

export interface TimeSlotWithCourrier {
  timeSlot: string;
  hasCourrierService: boolean;
}
export interface StorePropertiesResponseDto {
  name: string;
  location: Coordinate;
  hasCourrierService: boolean;
  currentWeeksWorkSheet: StoreWorkDayCurrent[];
  generalWorkSheet: StoreWorkDayGeneral[];
  availableWorkingDayTimeSlots: WorkingDayTimeSlotResponseDto[];
}
