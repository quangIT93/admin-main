import React from "react";
import moment from "moment";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

console.log("Just laoded the list columns");

const PostListColumns = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.5,
    minWidth: 100,
    filterable: true,
    renderCell: (params) => (
      <Link
        to={`/admin/posts/${params.row.id}`}
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
    field: "company_name",
    headerName: "Công ty",
    type: "string",
    flex: 1,
    minWidth: 150,
    filterable: true,
  },
  {
    field: "title",
    headerName: "Tên",
    type: "string",
    flex: 1,
    minWidth: 150,
    filterable: true,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    type: "string",
    flex: 0.5,
    minWidth: 100,
    filterable: true,
    renderCell: (params) => {
      switch (params.row.status) {
        case 0:
          return <Chip variant="outlined" color="primary" label="Pending" />;
        case 1:
          return <Chip variant="outlined" color="success" label="Accepted" />;
        case 2:
          return <Chip variant="outlined" color="error" label="Rejected" />;
        case 3:
          return <Chip variant="outlined" color="secondary" label="Closed" />;
        default:
      }
    },
  },
  {
    field: "created_at",
    headerName: "Ngày tạo",
    type: "string",
    flex: 1,
    minWidth: 150,
    renderCell: (params) =>
      moment(params.row.created_at).format("DD/MM/YYYY HH:mm:ss"),
  },
  {
    field: "street_names",
    headerName: "Tên đường",
    type: "string",
    flex: 1,
    minWidth: 150,
    renderCell: (params) =>
      moment(params.row.created_at).format("DD/MM/YYYY HH:mm:ss"),
  },
  {
    field: "city",
    headerName: "Thành phố",
    type: "string",
    flex: 1,
    minWidth: 150,
    // renderCell: (params) =>
    //   moment(params.row.created_at).format("DD/MM/YYYY HH:mm:ss"),
  },
];

export default PostListColumns;
