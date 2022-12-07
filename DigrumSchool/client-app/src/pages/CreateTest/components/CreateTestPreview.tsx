import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useTheme
} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import {Word} from "../../../utils/types";
import DeleteIcon from '@mui/icons-material/Delete';
import {CreateTestPreviewContainer} from "../CreateTest.styled";

interface CreateTestPreviewProps {
  words: Word[]
}

const findMaxTranslates = (arr: Word[]) => {
  let max = 0
  arr.forEach(w => {
    if (w.translates.length > max) {
      max = w.translates.length
    }
  })
  return max
}

export const CreateTestPreview: FC<CreateTestPreviewProps> = ({words}) => {
  const [maxTranslates, setMaxTranslates] = useState(0)
  const theme = useTheme()

  useEffect(() => {
    setMaxTranslates(findMaxTranslates(words))
  }, words)

  return (
    <CreateTestPreviewContainer>
      <Paper>
        <TableContainer>
          <Table>
            <TableBody>
              {words.map((word) => (
                <TableRow
                  key={word.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell align='center' component="th" scope="row">
                    {word.title}
                  </TableCell>
                  {[...Array(maxTranslates)].map((v, i) => (
                    <TableCell align='center' key={word.translates[i]} component="th" scope="row">
                      {word.translates[i] || '-'}
                    </TableCell>
                  ))}
                  <TableCell align='center' component="th" scope="row">
                    <Button sx={{color: theme.palette.error.main}}><DeleteIcon/></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </CreateTestPreviewContainer>
  );
};