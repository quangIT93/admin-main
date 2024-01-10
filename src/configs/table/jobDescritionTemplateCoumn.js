import routes from "configs/routes";
import moment from "moment";
import { Link } from "react-router-dom";

const jobDescriptionTemplateColumns = [
  {
    field: "id",
    headerName: "Id",
    flex: 0.5,
    minWidth: 50,
    filterable: true,
    renderCell: (param) => (
      <Link
        to={`${routes.jobDescriptionTemplate}/${param.row.id}`}
        style={{
          textDecoration: "underline",
          width: "100%",
        }}
      >
        {param.row.id}
      </Link>
    ),
  },
  {
    field: "childCategory",
    headerName: "Child Category",
    flex: 1,
    minWidth: 300,
    filterable: true,
    renderCell: (params) =>
      `${params.row.childCategory.name} / ${params.row.childCategory.nameEn}`,
  },
  {
    field: "title",
    headerName: "Title",
    flex: 1,
    minWidth: 250,
    filterable: true,
  },
  {
    field: "content",
    headerName: "Content",
    flex: 1,
    minWidth: 300,
    filterable: true,
  },
  {
    field: "createAt",
    headerName: "Creation date",
    flex: 0.5,
    minWidth: 100,
    filterable: true,
    renderCell: (params) =>
      moment(params.row.createdAt).format("DD/MM/YYYY HH:mm"),
  },
];

export default jobDescriptionTemplateColumns;
