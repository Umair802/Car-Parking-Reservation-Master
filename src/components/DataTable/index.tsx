import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";

type ClientDataTableProps = {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
};

export default function ClientDataTable({
  columns,
  rows,
  loading = false,
}: ClientDataTableProps) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  const equalWidthColumns = columns.map((col) => ({
    ...col,
    flex: 1,
  }));

  return (
    <div className="shadow-sm border border-gray-200 rounded-2xl w-full h-[650px] overflow-hidden">
      <DataGrid
        className="bg-white"
        columns={equalWidthColumns}
        rows={rows}
        getRowId={(row) => row._id}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode="client"
        pageSizeOptions={[5, 10, 25, 50]}
        loading={loading}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#FFE5B4", // 🍊 Soft pastel orange
            color: "#A8572A", // 🧡 Rich orangish-brown text
            fontWeight: 800,
            fontSize: "1.1rem",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "0.875rem",
          },
          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: "#FFF8F0", // subtle hover effect
            },
          },
        }}
      />
    </div>
  );
}
