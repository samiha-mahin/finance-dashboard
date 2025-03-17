import { Box, useMediaQuery, useTheme } from '@mui/material'
import DashboardBox from '@/components/DashboardBox';
import React from 'react'
import Row1 from './Row1';

type Props = {}
 
const gridTemplateLargeScreens = `
"a b c"
"a b c"
"a b c"
"a b f"
"d e f"
"d e f"
"d h i"
"g h i"
"g h j"
"g h j"
`;
const gridTemplateSmallScreens =`
"a"
"a"
"a"
"a"
"b"
"b"
"b"
"b"
"c"
"c"
"d"
"d"
"d"
"e"
"e"
"f"
"f"
"g"
"g"
"g"
"h"
"h"
"h"
"h"
"i"
"i"
"j"
"j"
`;

const index = (props: Props) => {
    const { palette } = useTheme();
    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
   <Box width="100%" height="100%" display="grid" gap="1.5rem"
   sx={isAboveMediumScreens ? {
    gridTemplateColumns:"repeat(3,minmax(370px,1fr))",
    gridTemplateRows:"repeat(10,minmax(60px,1fr))",
    gridTemplateAreas: gridTemplateLargeScreens,
   } : {
    gridAutoColumns:"1fr",
    gridAutoRows:"80px",
    gridTemplateAreas: gridTemplateSmallScreens,
   }}
   >
    <Row1/>
   <DashboardBox bgcolor="#fff" gridArea="d" ></DashboardBox>
   <DashboardBox bgcolor="#fff" gridArea="e" ></DashboardBox>
   <DashboardBox bgcolor="#fff" gridArea="f" ></DashboardBox>
   <DashboardBox bgcolor="#fff" gridArea="g" ></DashboardBox>
   <DashboardBox bgcolor="#fff" gridArea="h" ></DashboardBox>
   <DashboardBox bgcolor="#fff" gridArea="i" ></DashboardBox>
   <DashboardBox bgcolor="#fff" gridArea="j" ></DashboardBox>
   </Box>
  )
}

export default index