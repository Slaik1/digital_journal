import { Student } from './student';

interface StudentData {
  student: Student;
  attendance: {
    [date: string]: {
      value: boolean;
      _id: string;
    };
  };
}

export interface AttendanceJournal {
  _id: string;
  lessonsDates: string[];
  studentsData: StudentData[];
}

export interface Attendance {
  _id: string;
  journal: string;
  student: string;
  teacher: string;
  date: string;
  value: boolean;
}
