import moment from "moment";

const pointLogListColumns = [
  {
    field: "id",
    headerName: "Id",
    flex: 0.3,
    minWidth: 50,
    filterable: true,
  },
  {
    field: "accountId",
    headerName: "Account ID",
    flex: 1,
    minWidth: 250,
    filterable: true,
  },
  {
    field: "pointTypeId",
    headerName: "Point type",
    flex: 0.4,
    minWidth: 100,
    filterable: true,
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    flex: 0.5,
    minWidth: 150,
    filterable: true,
    renderCell: (params) =>
      moment(params.row.createdAt).format("DD/MM/YYYY HH:mm"),
  },
];

export default pointLogListColumns;
