import React from 'react'
import styled from 'styled-components'

import reactImage from './react-logo.svg'

const IndexPage = () => {
  return (
    <StyledWrapper>
      <h1>Hello world!</h1>
      <StyledImage src={reactImage} alt="React Significa" />
    </StyledWrapper>
  )
}

export default IndexPage

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const StyledImage = styled.img`
  height: 300px;
  width: 300px;
`
