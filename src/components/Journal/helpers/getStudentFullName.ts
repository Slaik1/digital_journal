import { Student } from '../../../ts/types/student';

export const getStudentFullName = (student: Student) => {
  return `${student.lastName} ${student.firstName} ${student.patronymic}`;
};
