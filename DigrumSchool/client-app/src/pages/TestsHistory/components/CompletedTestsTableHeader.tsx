import React, {FC} from 'react';
import {Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import {CompletedTestRow, Order} from "../TestsHistory.typed";

interface HeadCell {
  disablePadding: boolean;
  id: keyof CompletedTestRow;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    numeric: true,
    disablePadding: false,
    label: 'title',
  },
  {
    id: 'score',
    numeric: true,
    disablePadding: false,
    label: 'score',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'date',
  },
];

interface TestsHistoryProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof CompletedTestRow) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export const CompletedTestsTableHeader:FC<TestsHistoryProps> = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) => {
  const createSortHandler =
    (property: keyof CompletedTestRow) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
};