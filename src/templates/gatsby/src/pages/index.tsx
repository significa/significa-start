import React from 'react'
import styled from 'styled-components'

import { StyledLayout } from 'common/UI'

const IndexPage = () => {
  return (
    <StyledLayout>
      <StyledHeading>Hello world!</StyledHeading>
    </StyledLayout>
  )
}

export default IndexPage

const StyledHeading = styled.h1`
  color: #444;
`
