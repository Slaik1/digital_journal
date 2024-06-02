import { Student } from './student';

interface StudentData {
  student: Student;
  attendance: {
    [date: string]: boolean;
  };
}

export interface AttendanceJournal {
  _id: string;
  lessonsDates: string[];
  studentsData: StudentData[];
}
