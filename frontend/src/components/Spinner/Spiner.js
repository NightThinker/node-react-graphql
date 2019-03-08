import React from 'react'
import styled, { keyframes } from 'styled-components'

const lds_ellipsis1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const lds_ellipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
`;

const lds_ellipsis3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const LdsEllipsis = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  div {
    position: absolute;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #cef;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 6px;
    animation: ${lds_ellipsis1} 0.6s infinite;
  }
  div:nth-child(2) {
    left: 6px;
    animation: ${lds_ellipsis2} 0.6s infinite;
  }
  div:nth-child(3) {
    left: 26px;
    animation: ${lds_ellipsis2} 0.6s infinite;
  }
  div:nth-child(4) {
    left: 45px;
    animation: ${lds_ellipsis3} 0.6s infinite;
  }
`

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const spinner = (props) => (
  <Spinner>
    <LdsEllipsis>
      <div />
      <div />
      <div />
      <div />
    </LdsEllipsis>
  </Spinner>
)

export default spinner
