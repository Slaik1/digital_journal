import { ColDef, ColGroupDef } from 'ag-grid-community';
import { useEffect, useState } from 'react';

import { journalsStore } from '../../../../stores/journalsStore/journalsStore';
import { Mark } from '../../../../ts/types/mark';
import { MarksJournal } from '../../../../ts/types/table';
import { getStudentInitials } from '../../helpers/getStudentFullName';
import { reduceWorkName } from '../../helpers/reduceWorkName';
import MarkField from '../MarkField/MarkField';

interface RowData {
  info: object;
  [key: string]: any;
}

const useMarkTableData = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [columnDefs, setColumnDefs] = useState<Array<ColDef | ColGroupDef>>([]);
  const { markJournal } = journalsStore;

  const createColData = (data: MarksJournal) => {
    const moduleColumns: Array<ColDef | ColGroupDef> = data.modules.map(
      (module) => ({
        headerName: module.title,
        openByDefault: true,
        children: [
          {
            field: '1',
            columnGroupShow: 'closed',
            headerName: '',
          },
          ...module.works.map((work, workIndex) => ({
            field: `${module.value}_${work.value}`,
            headerName: reduceWorkName(work.title),
            columnGroupShow: 'open',
            cellRenderer: (params: any) => {
              const value = params.value;
              const studentId = params.data.info.id;
              const work = params.colDef.field;

              const onChange = (newValue: number | null) => {
                params.node.setDataValue(params.colDef.field, newValue);
              };

              const onPost = (mark: Mark) => {
                const { value } = mark;

                params.node.setDataValue(params.colDef.field, value);
              };

              return (
                <MarkField
                  onPost={onPost}
                  studentId={studentId}
                  value={value}
                  onChange={onChange}
                  work={work}
                />
              );
            },
          })),
        ],
      })
    );

    const columns: Array<ColDef | ColGroupDef> = [
      {
        field: 'info',
        headerName: 'ФИО',
        pinned: 'left',
        cellRenderer: (params: any) => {
          return <p>{params.value.name}</p>;
        },
      },
      ...moduleColumns,
    ];

    setColumnDefs(columns);
  };

  const createRowData = (data: MarksJournal) => {
    const rows: RowData[] = data.studentsData.map((students) => {
      const studentData = students.student;

      const row: RowData = {
        info: {
          name: getStudentInitials(studentData),
          id: studentData._id,
        },
      };

      data.modules.forEach((module) => {
        module.works.forEach((work) => {
          const mark = students.marks[`${module.value}_${work.value}`];

          const markValue = mark ? mark.value : null;

          row[`${module.value}_${work.value}`] = markValue;
        });
      });

      return row;
    });

    setRowData(rows);
  };

  useEffect(() => {
    if (!markJournal) return;

    createColData(markJournal);
    createRowData(markJournal);
  }, [markJournal]);

  return { rowData, columnDefs };
};

export default useMarkTableData;
