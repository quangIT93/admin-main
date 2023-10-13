import React, { forwardRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

// Css grid
const CssDataGrid = styled(DataGrid)(({ theme }) => ({
  backgroundColor: theme.palette.background.content,
  fontFamily: theme.fontFamily,
  fontSize: "1rem",
  border: "none",
  "& .MuiDataGrid-cellContent, & .MuiDataGrid-columnHeaderTitle, & .MuiTablePagination-root":
    {
      color: theme.palette.color.main,
    },
  "& .Mui-disabled": {
    color: "rgba(255, 255, 255, 0.26)",
  },
}));

const TablePoint = forwardRef((props, ref) => {
  const { columns, rows } = props;
  const rowsPoint = rows.map((item) => {
    return {
      id: item.accountId,
      totalPoint: item.totalPoint,
      email: item.email,
      updatedAt: item.updatedAt,
    };
  });
  return (
    <CssDataGrid
      sx={{ padding: "0.5rem", height: "100%" }}
      ref={ref}
      rows={rowsPoint}
      columns={columns}
      autoPageSize
    />
  );
});

export default TablePoint;
