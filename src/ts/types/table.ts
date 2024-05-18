interface Student {
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

export interface TableData {
  _id: string;
  startDate: string;
  endDate: string;
  lessonsDates: string[];
  studentsData: StudentData[];
}