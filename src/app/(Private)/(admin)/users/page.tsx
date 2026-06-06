"use client";

import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import ClientDataTable from "@/components/DataTable";
import api from "@/config/api";
import moment from "moment";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 220 },
  { field: "name", headerName: "Name", width: 180 },
  { field: "email", headerName: "Email", width: 220 },
  {
    field: "role",
    headerName: "Role",
    width: 120,
    renderCell: (params) => params.row.role.toUpperCase(),
  },
  {
    field: "createdAt",
    headerName: "Joined At",
    width: 180,
    renderCell: (params) =>
      moment(params.row.createdAt).format("DD-MMM-YYYY hh:mm A"),
  },
];

export default function UsersPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/user")
      .then((res) => setRows(res.data))
      .catch((err) => console.error("Failed to load users:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <h2 className="mb-4 font-semibold text-orange-600 text-xl">Users</h2>
      <ClientDataTable columns={columns} rows={rows} loading={loading} />
    </div>
  );
}
