import { Link } from "react-router-dom";
import moment from "moment";
import routes from "configs/routes";

const pointListColumns = [
  {
    field: "id",
    headerName: "Account Id",
    flex: 1,
    minWidth: 350,
    filterable: true,
    renderCell: (params) => (
      <Link
        target="_blank"
        to={`${routes.point}/${params.row.id}`}
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
    field: "totalPoint",
    headerName: "Tổng điểm",
    type: "string",
    flex: 0.5,
    minWidth: 150,
    filterable: true,
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    flex: 1,
    minWidth: 150,
    filterable: true,
  },
  {
    filed: "updatedAt",
    headerName: "Ngày cập nhật",
    type: "string",
    flex: 1,
    minWidth: 150,
    filterable: true,
    renderCell: (params) =>
      moment(params.row.updatedAt).format("DD/MM/YYYY HH:mm"),
  },
];

export default pointListColumns;
