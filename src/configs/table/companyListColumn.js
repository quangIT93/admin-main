import { Link } from "react-router-dom";
import { Chip, Avatar } from "@mui/material";

const { default: routes } = require("configs/routes");

const companyListColumn = [
  {
    field: "id",
    headerName: "Id",
    flex: 0.5,
    minWidth: 80,
    filterable: true,
    renderCell: (params) => (
      <Link
        // target="_blank"
        to={`${routes.company}/${params.row.id}`}
        style={{
          width: "100%",
          textDecoration: "underline",
        }}
      >
        {params.row.id}
      </Link>
    ),
  },
  // {
  //   field: "accountId",
  //   headerName: "Account Id",
  //   flex: 1,
  //   minWidth: 350,
  //   filterable: true,
  // },
  {
    field: "logoPath",
    headerName: "Logo",
    flex: 0.5,
    minWidth: 60,
    filterable: true,
    renderCell: (params) => {
      return (
        <Avatar
          alt={params.row.name}
          src={params.row.logoPath}
          sx={{ width: 50, height: 50 }}
          variant="rounded"
        />
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 400,
    filterable: true,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    minWidth: 110,
    filterable: true,
    renderCell: (params) => {
      switch (params.row.status) {
        case 0:
          return <Chip variant="outlined" color="primary" label="Pending" />;
        case 1:
          return <Chip variant="outlined" color="success" label="Accepted" />;
        default:
          return <Chip variant="outlined" label="Not status" />;
      }
    },
  },
  // {
  //   field: "companyLocation",
  //   headerName: "Location",
  //   flex: 1,
  //   minWidth: 100,
  //   filterable: true,
  //   renderCell: (params) => {
  //     if (!params.row.companyLocation) {
  //       return "Location not updated yet";
  //     }
  //     return params.row.companyLocation.district.province.fullName;
  //   },
  // },
  {
    field: "amountPost",
    headerName: "number of posts",
    flex: 1,
    minWidth: 150,
    filterable: true,
    renderCell: (params) => {
      return params.row.amountPost;
    },
  },
  {
    field: "email",
    headerName: "email",
    flex: 1,
    minWidth: 300,
    filterable: true,
    renderCell: (params) => {
      if (!params.row.email) {
        return "Location not updated yet";
      }
      return params.row.email;
    },
  },
];

export default companyListColumn;
