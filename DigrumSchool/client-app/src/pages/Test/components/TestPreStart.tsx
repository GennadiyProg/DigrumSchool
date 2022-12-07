import React, {FC} from 'react';
import {Button} from "@mui/material";

interface TestPreStartProps {
  start: () => void
}

export const TestPreStart:FC<TestPreStartProps> = ({start}) => {
  return (
    <>
      <Button onClick={start}>Начать!</Button>
    </>
  );
};
