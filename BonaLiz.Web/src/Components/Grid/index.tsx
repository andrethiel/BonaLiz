"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useRef } from "react";
import CustomLoadingOverlay from "@/Components/CustomLoadingGrid";

export default function AgGrid(prop: Table) {
  const loadingOverlayComponentParams = useMemo(() => {
    return { loadingMessage: "Aguarde..." };
  }, []);
  const gridRef = useRef(null);
  return (
    <div
      className="ag-theme-quartz"
      style={{ height: "calc(100vh - 300px)", width: "calc(100vw - 290px)" }}
    >
      <AgGridReact
        ref={gridRef}
        loading={prop.isLoading}
        rowData={prop?.Data}
        columnDefs={prop?.Columns}
        oadingOverlayComponent={CustomLoadingOverlay}
        loadingOverlayComponentParams={loadingOverlayComponentParams}
      />
    </div>
  );
}
