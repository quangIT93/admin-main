import React, { forwardRef } from "react";
import {
  DataGrid,
  // GridToolbar,
  // GridToolbarContainer,
  // GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridToolbarExport,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { Pagination, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import "./style.scss";
import { fetchAllLocations } from "#api";

const Item = styled(Box)(({ theme }) => ({
  textarea: {
    fontSize: "1rem",
  },
}));

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

function Dropdown(props) {
  let { districts } = props;

  const [isActive, setIsActive] = React.useState(false);

  console.log("Just loaded the Dropdown compo");
  console.log("districts from props :>> ", districts);

  return (
    <div className="dropdown">
      <button
        onClick={() => setIsActive((prev) => !prev)}
        className="dropdown__btn"
      >
        <span>Choose one</span>
        {isActive ? (
          <IoMdArrowDropup size={20} />
        ) : (
          <IoMdArrowDropdown size={20} />
        )}
      </button>
      {isActive && (
        <div className="dropdown__content">
          {districts
            ? districts.map((district) => (
                <divk className="dropdown-content__item">
                  {district.district}
                </divk>
              ))
            : undefined}
        </div>
      )}
    </div>
  );
}

function SearchByLocation() {
  const [districts, setDistricts] = React.useState([{}]);
  const [locations, setLocations] = React.useState([]);

  React.useEffect(() => {
    const getLocations = async () => {
      const locations = await fetchAllLocations();
      setLocations(locations);
      let districtsLocalScope = [];
      locations.forEach((location) => {
        districtsLocalScope.push(location.districts);
      });
      setDistricts(districtsLocalScope);
    };
    getLocations();
  }, []);

  console.log("SearchByLocation compo just loaded");

  return (
    <div className="search-by-location">
      <button>Tìm kiếm bằng địa điểm</button>
      <div className="location__dropdown">
        <h2>Dropdown</h2>
        <Dropdown districts={districts} />
        {/* District */}
      </div>
    </div>
  );
}

function CustomToolbar() {
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
      <SearchByLocation />
      <CssGridToolbarQuickFilter />
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
}));

const Table = forwardRef((props, ref) => {
  const {
    rows,
    columns,
    showCheckbox = true,
    selectionModel,
    onSelectionModelChange,
  } = props;

  console.log("Just loaded the table componnet");

  return (
    <CssDataGrid
      sx={{ padding: "0.5rem" }}
      ref={ref}
      rows={rows}
      columns={columns}
      autoPageSize
      checkboxSelection={showCheckbox}
      rowHeight={46}
      disableSelectionOnClick={true}
      // disableColumnMenu={true}
      components={{
        // Toolbar: GridToolbar,
        Toolbar: CustomToolbar,
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
    />
  );
});

export default Table;
export { CustomNoRowsOverlay, CustomToolbar, CustomPagination };
