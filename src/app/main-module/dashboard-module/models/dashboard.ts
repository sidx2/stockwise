export interface InventoryCount {
    itemName: string;
    assignedCount: number; 
    availableCount: number; 
  }
  
  export interface DashboardState {
    inventoryCounts: InventoryCount[];
    loading: boolean;
    errorMessage: string;
  }
  
  export interface ChartDataRow {
    [index: number]: [string, number, number?];
  }
  
  export interface ChartOptions {
    title: string;
    hAxis: { title: string };
    vAxis: { title: string };
    legend: { position: string };
    colors: string[];
    backgroundColor: string;
    isStacked?: boolean; 
  }
  