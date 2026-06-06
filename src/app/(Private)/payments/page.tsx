"use client";

import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import ClientDataTable from "@/components/DataTable";
import api from "@/config/api";
import moment from "moment";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "amount",
    headerName: "Amount ($)",
    width: 130,
  },
  {
    field: "method",
    headerName: "Method",
    width: 140,
    renderCell: (params) => params.row?.method?.toUpperCase(),
  },

  {
    field: "createdAt",
    headerName: "Created At",
    width: 180,
    renderCell: (params) =>
      moment(params.row.createdAt).format("DD-MMM-YYYY hh:mm A"),
  },
];

export default function PaymentsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/payment")
      .then((res) => setRows(res.data))
      .catch((err) => console.error("Failed to load payments:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <h2 className="mb-4 font-semibold text-orange-600 text-xl">Payments</h2>
      <ClientDataTable columns={columns} rows={rows} loading={loading} />
    </div>
  );
}
