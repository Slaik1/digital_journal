import { Student } from './student';

interface StudentData {
  student: Student;
  marks: {
    [date: string]: number;
  };
}

export interface MarksJournal {
  _id: string;
  lessonsDates: string[];
  studentsData: StudentData[];
}
