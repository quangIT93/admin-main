import React, { forwardRef } from "react";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarExport,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { Pagination, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./style.scss";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchCircle from '@mui/icons-material/Search';
import ClearCircle from "@mui/icons-material/Clear";

// Custom display when empty row
function CustomNoRowsOverlay() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography>No Rows</Typography>
    </Box>
  );
}

// Custom toolbar
const CssGridToolbarExport = styled(GridToolbarExport)(({ theme }) => ({
  color: theme.palette.color.primary,
  fontSize: "1rem",
  "& .MuiMenuItem-root": {
    fontSize: "1rem",
  },
}));

const CssGridToolbarQuickFilter = styled(GridToolbarQuickFilter)(
  ({ theme }) => ({
    flex: 1,
    "& > div": {
      fontFamily: theme.fontFamily,
      fontSize: "1rem",
      color: theme.palette.color.main,
      alignSelf: "flex-end",
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
      "&:hover::before": {
        borderBottom: theme.palette.border,
      },
    },
  })
);

function CustomToolbar() {
  // const [valueSearch, setValueSearch] = React.useState('');

  // const handleChange = (data) => { 
  //   setValueSearch(data);
  //   handleSearch(data)
  // }

  // const handleClearSearch = () => {
  //   setValueSearch("");
  //   handleSearch(valueSearch)
  // }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        justifyContent: "space-between",
        alignItems: {
          xs: "flex-start",
          md: "center",
        },
        padding: "0.625rem",
      }}
    >
      <CssGridToolbarExport />
      <CssGridToolbarQuickFilter />
      {/* <Input value={valueSearch} style={{width: "45%", height: "2rem", border: "none", outline: "none", backgroundColor: "none"}} placeholder="Search...." onChange={(e) => handleChange(e.target.value)}
          id="input-with-icon-adornment"
          startAdornment={
          <InputAdornment position="start">
            <SearchCircle />
          </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end" onClick = {handleClearSearch}>
              <ClearCircle />
            </InputAdornment>
          }
      />     */}
      </Box>
  );
}

// Custom pagination
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

// CSS GRID
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
  height: "90%",
}));

const Table = forwardRef((props, ref) => {
  const {
    rows,
    currentPage,
    nextPage,
    prevPage,
    columns,
    checkData,
    showCheckbox = true,
    selectionModel,
    onSelectionModelChange,
  } = props;

  const handleNextPage = () => {
    nextPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    prevPage(currentPage - 1);
  };

  // const handleSearchFilter = (search) => {
  //   handleSearchFilterParent(search)
  // }

  return (
    <>
      <CssDataGrid
        sx={{ padding: "0.5rem" }}
        ref={ref}
        rows={rows}
        columns={columns}
        // autoPageSize
        // pageSize={10}
        checkboxSelection={showCheckbox}
        rowHeight={46}
        disableSelectionOnClick={true}
        disableColumnMenu={true}
        components={{
          // Toolbar: GridToolbar,
          Toolbar: CustomToolbar,
          // Toolbar: () => CustomToolbar((search) => handleSearchFilter(search)),
          NoRowsOverlay: CustomNoRowsOverlay,
          // Pagination: CustomPagination,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 1000 },
          },
        }}
        selectionModel={selectionModel}
        onSelectionModelChange={onSelectionModelChange}
        // hideFooterPagination
        hideFooter
      />
       <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "1rem",
          gap: "1rem",
        }}
      >
      
      {checkData && (
        <>
          <div>
            Trang {currentPage} / {parseInt(totalPages / 20)} 
          </div>
          <div>
            <Button
              style={{ marginRight: "0.5rem" }}
              variant="outlined"
              onClick={() => handlePrevPage()}
              disabled={currentPage === 1}
            >
              {"<"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleNextPage()}
              disabled={checkData === false || rows.length < 20}
            >
              {">"}
            </Button>
          </div>
        </>
      )}

     </div>
    
    </>
  );
  
});

export default Table;
export { CustomNoRowsOverlay, CustomToolbar, CustomPagination };
