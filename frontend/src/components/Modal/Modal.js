import React from 'react'
import styled from 'styled-components'

import { Button } from '../Styled/GlobalStyled'

const Modal = styled.div`
  width: 90%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: fixed;
  top: 20vh;
  left: 5%;
  @media (min-width: 768px) {
    width: 30rem;
    left: calc((100% - 30rem)/2);
  }
`

const Header = styled.header`
  padding: 1rem;
  background: #01d1d1;
  color: #fff;
  h1 {
    margin: 0;
    font-size: 1.25rem;
  }
`

const Content = styled.section`
  padding: 1rem;
`
const Actions = styled.section`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`

const modal = (props) => (
  <Modal>
    <Header>
      <h1>{props.title}</h1>
    </Header>
    <Content>{props.children}</Content>
    <Actions>
      {props.canCancel && <Button onClick={props.onCancel}>Cancel</Button>}
      {props.canConfirm && <Button onClick={props.onConfirm}>Confirm</Button>}
    </Actions>
  </Modal>
)

export default modal
