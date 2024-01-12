import routes from "configs/routes";
import moment from "moment";
import { Link } from "react-router-dom";

const companyDescriptionTemplateColumns = [
  {
    field: "id",
    headerName: "Id",
    flex: 0.5,
    minWidth: 100,
    filterable: true,
    renderCell: (param) => (
      <Link
        to={`${routes.companyDescriptionTemplate}/${param.row.id}`}
        style={{ textDecoration: "underline", width: "100%" }}
      >
        {param.row.id}
      </Link>
    ),
  },
  {
    field: "parentCategory",
    headerName: "Parent Category",
    flex: 1,
    minWidth: 350,
    filterable: true,
    renderCell: (param) =>
      `${param.row.parentCategory.name} - ${param.row.parentCategory.nameEn}`,
  },
  {
    field: "title",
    headerName: "Title",
    flex: 1,
    minWidth: 200,
    filterable: true,
  },
  {
    field: "content",
    headerName: "Content",
    flex: 1,
    minWidth: 350,
    filterable: true,
  },
  {
    field: "createAt",
    headerName: "Creation date",
    flex: 0.5,
    minWidth: 150,
    filterable: true,
    renderCell: (params) =>
      moment(params.row.createdAt).format("DD/MM/YYYY HH:mm"),
  },
];

export default companyDescriptionTemplateColumns;
