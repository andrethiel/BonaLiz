"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useRef } from "react";

export default function AgGrid({ Data, Columns }) {
  const gridRef = useRef(null);
  return (
    <div className="ag-theme-quartz" style={{ height: "calc(100vh - 350px)" }}>
      <AgGridReact ref={gridRef} rowData={Data} columnDefs={Columns} />
    </div>
  );
}
