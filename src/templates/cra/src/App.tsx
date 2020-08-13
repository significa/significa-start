import React from 'react'
import styled from 'styled-components'

import { StyledLayout } from 'common/UI'

import reactImage from './react-logo.svg'

export const App = () => {
  return (
    <StyledLayout>
      <StyledHeading>Hello world!</StyledHeading>
      <StyledImage src={reactImage} alt="React" />
    </StyledLayout>
  )
}

const StyledHeading = styled.h1`
  color: #444;
`

const StyledImage = styled.img`
  height: 300px;
  width: 300px;
`
