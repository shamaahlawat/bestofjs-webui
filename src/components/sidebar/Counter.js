import React from 'react'
import styled from 'styled-components'

const Span = styled.span`
  float: right;
  color: rgba(255, 255, 255, 0.5);
`

const Counter = ({ count }) => {
  return count > 0 && <Span>{count}</Span>
}

export default Counter
