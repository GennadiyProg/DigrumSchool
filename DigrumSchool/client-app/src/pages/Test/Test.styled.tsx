import styled from "styled-components";

interface TestContainerProps {
  background: string,
}
export const TestContainer = styled.div<TestContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${({background}) => background};
  transition: .2s;
`
export const AnswerContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`
export const AnswerControlsContainer = styled.div`
  display: flex;
  justify-content: start;
  gap: 50px;
  margin: 20px 0;
  width: 100%;
`
export const AnswerControl = styled.p`
  margin: 0;
  padding: 0;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
export const TestWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10%;
  flex-grow: 1;
`