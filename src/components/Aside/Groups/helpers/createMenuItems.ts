import { MenuData } from '../../../../api/faculty/faculty';
import { MenuItem } from '../../../../ts/types/menu';

export const createMenuItems = (data: MenuData[]): MenuItem[] => {
  const items = data.map((faculty) => ({
    key: faculty._id,
    label: faculty.title,
    children: faculty.groups.map((group) => ({
      key: group._id,
      label: group.title,
      children: group.journals.map((journal) => ({
        key: journal._id,
        label: journal.lesson.title,
      })),
    })),
  }));

  return items;
};
