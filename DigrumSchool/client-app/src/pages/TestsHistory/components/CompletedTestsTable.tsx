import React, {useEffect, useState} from 'react';
import {
  Box,
  Checkbox, CircularProgress, FormControlLabel,
  Paper, Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from "@mui/material";
import {CompletedTestTableToolbar} from "./CompletedTestTableToolbar";
import {CompletedTestsTableHeader} from "./CompletedTestsTableHeader";
import {CompletedTestRow, Order} from "../TestsHistory.typed"
import {useLoaderFetch} from "../../../hooks/useLoaderFetch";
import {getCompletedTests} from "../../../api/Test";
import {CompletedTest} from "../../../utils/types";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  } else if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(order: Order, orderBy: Key,): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  return array.sort(comparator)
}

function createData(id: number, title: string, score: number, date: string): CompletedTestRow {
  return {
    id,
    title,
    score,
    date: new Date(Date.parse(date)).toLocaleString()
  }
}

export const CompletedTestsTable = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof CompletedTestRow>('date');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {isLoading, LoaderFetch} = useLoaderFetch(getCompletedTests)
  const [rows, setRows] = useState<CompletedTestRow[]>([])

  const getTests = async () => {
    const response = await LoaderFetch()
    const data = await response.json().then((res: CompletedTest[]) => res)
    const newRows = data.map(value => createData(value.id, value.test.title, value.score, value.date))
    setRows(newRows)
  }

  useEffect(() => {
    getTests()
  }, [])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof CompletedTestRow,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <> {
      isLoading ? <CircularProgress/> : (
        <Box sx={{width: '100%'}}>
          <Paper sx={{width: '100%', mb: 2}}>
            <CompletedTestTableToolbar numSelected={selected.length}/>
            <TableContainer>
              <Table
                sx={{width: '100%'}}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <CompletedTestsTableHeader
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort<CompletedTestRow>(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">{row.title}</TableCell>
                          <TableCell align="right">{row.score}</TableCell>
                          <TableCell align="right">{row.date}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6}/>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense}/>}
            label="make smaller"
          />
        </Box>
      )
    }
    </>
  );
};