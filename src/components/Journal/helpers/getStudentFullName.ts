import { Student } from '../../../ts/types/student';

export const getStudentFullName = (student: Student) => {
  return `${student.lastName} ${student.firstName} ${student.patronymic}`;
};

export const getStudentInitials = (student: Student) => {
  return `${student.lastName} ${student.firstName.substring(0, 1)}.${student.patronymic.substring(0, 1)}.`;
};
