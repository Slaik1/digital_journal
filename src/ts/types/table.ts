import { Student } from './student';

interface StudentData {
  student: Student;
  marks: {
    [date: string]: {
      value: boolean | null;
      _id: string;
    };
  };
}

export interface MarksJournal {
  _id: string;
  lessonsDates: string[];
  studentsData: StudentData[];
}
