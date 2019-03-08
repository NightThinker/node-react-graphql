
import styled from 'styled-components'

export const Control = styled.div`
  margin-bottom: 1rem;
  label {
    margin-bottom: 0.5rem;
  }
  label, input, textarea {
    width: 100%;
    display: block;
  }
`
export const Actions = styled.div`
  button, 
  .btn {
    background: #01d1d1;
    font: inherit;
    border: 1px solid #01d1d1;
    border-radius: 5px;
    padding: 0.25rem 1rem;
    margin: 0 1rem;
    margin-right: 1rem;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.25);
    color: #fff;
    cursor: pointer;
    &:hover, 
    &:active {
      background: #01a7a7;
      border-color: #01a7a7;
    }
  }
`
