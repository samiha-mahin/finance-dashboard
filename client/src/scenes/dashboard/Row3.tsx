import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData = [] } = useGetProductsQuery();
  const { data: transactionData = [] } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (!kpiData || kpiData.length === 0) return [];

    const totalExpenses = parseFloat(
      kpiData[0]?.totalExpenses?.toString().replace(/[$,]/g, "") || "0"
    );
    const expensesByCategory = kpiData[0]?.expensesByCategory || {};

    return Object.entries(expensesByCategory).map(([key, value]) => [
      { name: key, value: totalExpenses - value },
      { name: `${key} of Total`, value: parseFloat(value?.toString().replace(/[$,]/g, "") || "0") },
    ]);
  }, [kpiData]);

  const productColumns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value || 0}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value || 0}`,
    },
  ];

  const transactionColumns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "buyer", headerName: "Buyer", flex: 0.67 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value || 0}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        Array.isArray(params.value) ? params.value.length : 0,
    },
  ];

  return (
    <>
      {/* Products Table */}
      <DashboardBox gridArea="g">
        <BoxHeader title="List of Products" sideText={`${productData.length} products`} />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" },
            "& .MuiDataGrid-cell": { borderBottom: `1px solid ${palette.grey[800]} !important` },
            "& .MuiDataGrid-columnHeaders": { borderBottom: `1px solid ${palette.grey[800]} !important` },
            "& .MuiDataGrid-columnSeparator": { visibility: "hidden" },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter
            rows={productData.map((item) => ({ ...item, id: item._id }))} 
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      {/* Transactions Table */}
      <DashboardBox gridArea="h">
        <BoxHeader title="Recent Orders" sideText={`${transactionData.length} latest transactions`} />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" },
            "& .MuiDataGrid-cell": { borderBottom: `1px solid ${palette.grey[800]} !important` },
            "& .MuiDataGrid-columnHeaders": { borderBottom: `1px solid ${palette.grey[800]} !important` },
            "& .MuiDataGrid-columnSeparator": { visibility: "hidden" },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter
            rows={transactionData.map((item) => ({ ...item, id: item._id }))}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      {/* Pie Chart */}
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={80} height={70}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={15}
                  outerRadius={30}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      {/* Summary Section */}
      <DashboardBox gridArea="j">
        <BoxHeader title="Overall Summary and Explanation Data" sideText="+15%" />
        <Box height="15px" margin="1.25rem 1rem 0.4rem 1rem" bgcolor={palette.primary[800]} borderRadius="1rem">
          <Box height="15px" bgcolor={palette.primary[600]} borderRadius="1rem" width="40%"></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare sed. In volutpat nullam at est id cum pulvinar nunc.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
