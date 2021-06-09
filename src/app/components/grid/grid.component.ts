import { Component, OnInit } from '@angular/core';
import { GridOptions, Grid } from 'ag-grid-community';
import { RowGridRedComponent } from './../../row-grid-red/row-grid-red.component';
import { RowGridActionsComponent } from './../../row-grid-actions/row-grid-actions.component';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent  {
   gridApi;
   gridColumnApi;
  gridOptions: GridOptions;
  
constructor(private http: HttpClient) {
  this.gridOptions = <GridOptions>{};

  this.gridOptions={
    enableFilter:false,
    enableColResize: false,
    enableSorting: false,
    enableServerSideFilter: true,
    animateRows: true,
    rowModelType : 'infinite',
    rowBuffer : 0,
    rowSelection : "multiple",
    paginationPageSize : 50,
    cacheOverflowSize : 1,
    maxConcurrentDatasourceRequests : 1,
    infiniteInitialRowCount : 20,
    maxBlocksInCache : 10,
    
  };
  this.gridOptions.columnDefs=[
    {headerName: "Athlete", field: "athlete", width: 150},
    {headerName: "Age", field: "age", width: 90},
    {headerName: "Country", field: "country", width: 120},
    {headerName: "Year", field: "year", width: 90},
    {headerName: "Data", field: "date",cellRendererFramework: RowGridRedComponent},
    {headerName: "Opções", field:'country', cellRendererFramework: RowGridActionsComponent},
  ],
  this.gridOptions.rowData=[
    
];

this.getData(this.gridOptions);
 }


  getData(gridOptions){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json');
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var httpResult = JSON.parse(httpRequest.responseText);
            
            gridOptions.api.setRowData(httpResult);
        }
    };
}

onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;

  this.http
    .get("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json")
    .subscribe((data:Object[]) => {
    
      var dataSource = {
        rowCount: null,
        getRows: function(params) {
          console.log("asking for " + params.startRow + " to " + params.endRow);
          setTimeout(function() {
            var rowsThisPage = data.slice(params.startRow, params.endRow);
            var lastRow = -1;
            if (data.length <= params.endRow) {
              lastRow = data.length;
            }
            params.successCallback(rowsThisPage, lastRow);
          }, 500);
        }
      };
      params.api.setDatasource(dataSource);
    });
}


  }


  interface IDatasource {

    // Callback the grid calls that you implement to fetch rows from the server. See below for params.
    getRows(params: IGetRowsParams): void;
  
    // optional destroy method, if your datasource has state it needs to clean up
    destroy?(): void;
  
  }
  interface IGetRowsParams {

    // The first row index to get.
    startRow: number;

    // The first row index to NOT get.
    endRow: number;

    // If doing Server-side sorting, contains the sort model
    sortModel: any,

    // If doing Server-side filtering, contains the filter model
    filterModel: any;

    // The grid context object
    context: any;

    // Callback to call when the request is successful.
    successCallback(rowsThisBlock: any[], lastRow?: number): void;

    // Callback to call when the request fails.
    failCallback(): void;
}