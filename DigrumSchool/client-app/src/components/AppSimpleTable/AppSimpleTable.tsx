import TableContainer from '@mui/material/TableContainer';
import React, {FC, useEffect, useState} from 'react';
import {IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface AppSimpleTableProps {
  data: any[],
  headVisible?: boolean,
  itemChosen?: (obj: any) => void,
  isSearchBody?: boolean,
  deletable?: boolean,
  deleteHandler?: (obj: any) => void
}

export const AppSimpleTable: FC<AppSimpleTableProps> = ({
                                                          data,
                                                          headVisible = true,
                                                          itemChosen,
                                                          isSearchBody,
                                                          deletable,
                                                          deleteHandler,
                                                        }) => {
  const [tableRowStyles, setTableRowStyles] = useState({
    '&:last-child td, &:last-child th': {
      border: 0
    }
  })
  const ad = (obj: any) => {
    console.log(typeof itemChosen)
    typeof itemChosen === "function" && itemChosen(obj)
  }
  const SearchRowStyles = {
    cursor: 'pointer'
  }

  useEffect(() => {
    if (isSearchBody) {
      setTableRowStyles({...tableRowStyles, ...SearchRowStyles})
    }
  }, [])

  return (
    <>
      {data.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            {headVisible && (
              <TableHead>
                <TableRow>
                  {
                    Object.entries(data[0] || {})
                      .filter(([k, v]) => k !== 'id')
                      .map(([key, v]) => (
                          <TableCell key={key}>{key}</TableCell>
                        )
                      )
                  }
                  {deletable && <TableCell></TableCell>}
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {data?.map((obj: { id?: number }, index) => (
                <TableRow
                  key={index}
                  sx={{...tableRowStyles}}
                  hover={isSearchBody}
                  onClick={() => itemChosen && itemChosen(obj)}
                >
                  {Object.entries(obj)
                    .filter(([k, _]) => k !== 'id')
                    .map(([k, v], index) => (
                      <TableCell key={index}>{v}</TableCell>
                    ))}
                  {deletable && (
                    <TableCell align="right">
                      <Tooltip title="Delete">
                        <IconButton onClick={() => deleteHandler && deleteHandler(obj)}>
                          <DeleteIcon/>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};