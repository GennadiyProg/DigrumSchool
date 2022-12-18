import styled from "styled-components";
import {MainLayoutContainer} from "../../layouts/MainLayout/MainLayout.styled";

export const CourseContainer = styled(MainLayoutContainer)`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  gap: 30px;
`

export const TestContainer = styled.div`
  flex: 1 1 70%;
  display: flex;
  flex-direction: column;
`

export const SideMenuContainer = styled.aside`
  flex: 1 1 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const TestsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CourseContent = styled.div`
  display: flex;
  gap: 40px;
`