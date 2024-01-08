import React from "react";
import moment from "moment";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

const MediaListColumns = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.5,
    minWidth: 100,
    filterable: true,
    renderCell: (params) => (
      <Link
        target="_blank"
        to={`/admin/posts/media/${params.row.id}`}
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
  // {
  //   field: "province",
  //   headerName: "Thành phố",
  //   type: "string",
  //   flex: 1,
  //   minWidth: 150,
  //   // renderCell: (params) =>
  //   //   moment(params.row.created_at).format("DD/MM/YYYY HH:mm:ss"),
  // },
  {
    field: "link_tiktok",
    headerName: "Url Tiktok",
    flex: 0.75,
    minWidth: 100,
    // renderCell: (params) =>
    //   moment(params.row.created_at).format("DD/MM/YYYY HH:mm:ss"),
  },
  {
    field: "link_youtube",
    headerName: "Url Youtube",
    flex: 1,
    minWidth: 100,
    // renderCell: (params) =>
    //   moment(params.row.created_at).format("DD/MM/YYYY HH:mm:ss"),
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
          return <Chip variant="outlined" color="success" label="Created" />;
        default:
      }
    },
  },
  // {
  //   field: "created_at",
  //   headerName: "Ngày tạo",
  //   type: "string",
  //   flex: 1,
  //   minWidth: 150,
  //   renderCell: (params) =>
  //     moment(params.row.created_at).format("DD/MM/YYYY HH:mm"),
  // },
];

export default MediaListColumns;
