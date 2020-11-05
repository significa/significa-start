import React from 'react'
import styled from 'styled-components'

import { StyledLayout } from 'common/UI'

import ImageSvg from './react-logo.svg'

const IndexPage: React.FC = () => {
  return (
    <StyledLayout>
      <StyledImageSvg />
      <StyledHeading>Hello world!</StyledHeading>
    </StyledLayout>
  )
}

export default IndexPage

const StyledHeading = styled.h1`
  color: #444;
`

const StyledImageSvg = styled(ImageSvg)`
  width: 300px;
  height: 300px;
`
