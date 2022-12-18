import styled from "styled-components";

const boxItems = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1 1 50%;
`

export const AppNavbarContainer = styled.nav`
  grid-column: 1 / -1;
  grid-row: 1;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .12);
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 2;
`

export const AppNavbarLeftItems = styled(boxItems)`
  align-self: start;
`

export const AppNavbarRightItems = styled(boxItems)`
  align-self: end;
  justify-content: end;
`