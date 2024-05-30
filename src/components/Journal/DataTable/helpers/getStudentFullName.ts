import { Student } from '../../../../ts/types/table';

export const getStudentFullName = (student: Student) => {
  return `${student.lastName} ${student.firstName} ${student.patronymic}`;
};
