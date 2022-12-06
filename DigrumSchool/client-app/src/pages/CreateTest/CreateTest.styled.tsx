import styled from "styled-components";
import {MainLayoutContainer} from "../../layouts/MainLayout/MainLayout.styled";

const CreateTestContainer = styled(MainLayoutContainer)`
  overflow-y: auto;
`

const CreateTestHeaderContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 15px 0;
`

const InputTestWordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`

const InputTestWordItem = styled.div`
  display: flex;
  gap: 10px;
`

const WordWrapper = styled.div`
  flex-grow: 4;
`
const TranslateWrapper = styled.div`
  flex-grow: 1;
`

const CreateTestPreviewContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  max-height: 400px;
`

export {
  CreateTestHeaderContainer,
  InputTestWordContainer,
  InputTestWordItem,
  WordWrapper,
  TranslateWrapper,
  CreateTestPreviewContainer,
  CreateTestContainer,
}