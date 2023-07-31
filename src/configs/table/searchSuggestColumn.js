import React from "react";
import moment from "moment";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

const searchSuggestColumn = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.5,
    minWidth: 100,
    filterable: true,
    renderCell: (params) => (
      <Link
        to={`/admin/search-suggest/${params.row.id}`}
        style={{
          padding: "0.5rem 4rem 0.5rem 0",
          textDecoration: "underline",
        }}
      >
        {params.row.id}
      </Link>
    ),
  },
  {
    field: "keyword",
    headerName: "KEYWORD",
    type: "string",
    flex: 1,
    minWidth: 100,
    filterable: true,
  },
  {
    field: "order",
    headerName: "ORDER",
    type: "int",
    flex: 1,
    minWidth: 100,
    filterable: true,
  },
  {
    field: "status",
    headerName: "STATUS",
    type: "int",
    flex: 0.5,
    minWidth: 100,
    filterable: true,
    renderCell: (params) => {
      switch (params.row.status) {
        case 0:
          return <Chip variant="outlined" color="primary" label="Disable" />;
        case 1:
          return <Chip variant="outlined" color="success" label="Enable" />;
        default:
      }
    },
  },

  {
    field: "createdAt",
    headerName: "CREATED_AT",
    type: "string",
    flex: 1,
    minWidth: 150,
    renderCell: (params) =>
      moment(params.row.createdAt).format("DD/MM/YYYY HH:mm:ss"),
  },

  {
    field: "updatedAt",
    headerName: "UPDATED_AT",
    type: "string",
    flex: 1,
    minWidth: 150,
    renderCell: (params) =>
      moment(params.row.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
    },
];

export default searchSuggestColumn;
