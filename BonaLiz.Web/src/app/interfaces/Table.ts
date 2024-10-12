declare interface Table {
  Data: [];
  Columns: columnDefs[];
  isLoading: boolean;
}

interface columnDefs {
  field: string;
  size?: number;
}
