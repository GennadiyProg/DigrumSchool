import styled from "styled-components";
import {MainLayoutContainer} from "../../layouts/MainLayout/MainLayout.styled";

export const HalfPart = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`

export const HalfPartItem = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const CreateCourseContainer = styled(MainLayoutContainer)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
