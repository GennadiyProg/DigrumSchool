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
import {Word, WordPrepare} from "../../../utils/types";
import DeleteIcon from '@mui/icons-material/Delete';
import {CreateTestPreviewContainer} from "../CreateTest.styled";

interface CreateTestPreviewProps {
  words: WordPrepare[]
}

const findMaxTranslations = (arr: WordPrepare[]) => {
  let max = 0
  arr.forEach(w => {
    if (w.translations.length > max) {
      max = w.translations.length
    }
  })
  return max
}

export const CreateTestPreview: FC<CreateTestPreviewProps> = ({words}) => {
  const [maxTranslations, setMaxTranslations] = useState(0)
  const theme = useTheme()

  useEffect(() => {
    setMaxTranslations(findMaxTranslations(words))
  }, [words])

  return (
    <CreateTestPreviewContainer>
      <Paper>
        <TableContainer>
          <Table>
            <TableBody>
              {words.map((word) => (
                <TableRow
                  key={word + word.translations.join('/')}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell align='center' component="th" scope="row">
                    {word.name}
                  </TableCell>
                  {[...Array(maxTranslations)].map((v, i) => (
                    <TableCell align='center' key={word.translations[i]} component="th" scope="row">
                      {word.translations[i] || '-'}
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