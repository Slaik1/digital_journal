export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
}

interface StudentData {
  student: Student;
  marks: {
    [date: string]: number;
  };
}

export interface MarksTable {
  _id: string;
  lessonsDates: string[];
  studentsData: StudentData[];
}
