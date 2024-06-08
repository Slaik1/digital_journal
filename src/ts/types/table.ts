import { Student } from './student';

interface Work {
  title: string;
  value: string;
}

interface Module {
  title: string;
  value: string;
  works: Work[];
}

interface StudentData {
  student: Student;
  marks: Record<string, { value: number | null; _id: string }>;
}

export interface MarksJournal {
  _id: string;
  modules: Module[];
  studentsData: StudentData[];
}
