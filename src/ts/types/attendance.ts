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
