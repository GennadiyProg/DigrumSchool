import React, {FC} from 'react';
import {MainLayoutContainer} from "../../layouts/MainLayout/MainLayout.styled";
import {CompletedTestsTable} from "./components/CompletedTestsTable";


export const TestsHistory= () => {
  
  return (
    <MainLayoutContainer style={{marginTop: '20px'}}>
      <CompletedTestsTable/>
    </MainLayoutContainer>
  );
};