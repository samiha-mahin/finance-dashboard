import FlexBetween from '@/components/FlexBetween'
import { Box, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const index = (props: Props) => {
    const { palette } = useTheme();
  return (
    <FlexBetween></FlexBetween>
  )
}

export default index