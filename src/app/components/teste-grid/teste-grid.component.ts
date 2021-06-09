 import { Component, OnInit,ViewChild } from '@angular/core';
 import { GridOptions } from 'ag-grid-community';
 import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
 import { ColDef } from "ag-grid-community/dist/lib/entities/colDef";
 import { RowGridRedComponent } from './../../row-grid-red/row-grid-red.component';
 import { RowGridActionsComponent } from './../../row-grid-actions/row-grid-actions.component';
 import { HtFilterGrid,HtDirectionOrderBy,HTGridOptions, HtRequestData,HtStyleGridCss,IHtBaseGrid,HtGridComponent } from 'common-lib';

 @Component({
   selector: 'app-teste-grid',
   templateUrl: './teste-grid.component.html',
   styleUrls: ['./teste-grid.component.scss'],
 })
 export class TesteGridComponent implements IHtBaseGrid {
 @ViewChild(RowGridActionsComponent, {static: false}) childActions: RowGridActionsComponent; 
 @ViewChild(HtGridComponent, {static: false}) child: HtGridComponent;
 public hello;
 objectRowClicked: any;
 gridId:string;
 list:any;
 gridOptions:HTGridOptions;
 disableInfiniteScroll:boolean=false;
 dataIsLoaded:boolean=false;
 request:HtRequestData;
 filterGrid: HtFilterGrid = {
   Busca : '',
   CampoOrderBy : '',
   DirectionOrderBy : HtDirectionOrderBy.ASC,
   Skip : 0,
   Take : 100,
 }
 rowData:any[];
 filterDataModel:Exemplo ={
   Id:0,
   Name:'',
   FiltroGrid:this.filterGrid
 }
 estiloCSS:HtStyleGridCss={
   width: '100%',
   height: '300px'  
 }
   constructor(private _httpClient: HttpClient) { 
  
     this.request = {
       Method:'POST',
       Url:'http://localhost:19667/api/Aplicativo/GetExemplo',
       Data:this.filterDataModel,
     }
     this.getData(this.request);
 
   }
   ngOnInit() {
 
   }
   ngOnChanges() {
  console.log(this.hello)
   }
   getData(request:HtRequestData){
     var req = new HttpRequest(request.Method,request.Url,request.Data,{reportProgress:true,responseType:"json"})
      this._httpClient.request(req)
           .subscribe((data:HttpResponse<any[]>) => {
             if(data.body){
               this.rowData = data.body;
               this.dataIsLoaded = true;
               this.gridOptions={
                 list:data.body,
                 request: this.request,
                 filterDataModel:this.filterDataModel,
                 htcolumnDefs: [
                   {headerName: 'Id', field: 'id'},
                   {headerName: 'Nome', field: 'name', enableSort:true },
                   {headerName: "Data", field: "date",cellRendererFramework: RowGridRedComponent},
                   {headerName: "Opções", field:'id', cellRendererFramework: RowGridActionsComponent},
                 ],
                 context: {
                   componentParent: this
                 }
               }
             }
           });
   }
   filtrar(filter){
    var filterGrid: HtFilterGrid = {
       Busca : 'Nome 10',
       CampoOrderBy : '',
       DirectionOrderBy : HtDirectionOrderBy.ASC,
       Skip : 0,
       Take : 100,
     }
     var filterDataModel:Exemplo ={
         Id:0,
         Name:'',
         FiltroGrid:filterGrid
     }
    this.child.refreshData(filterDataModel); 
   }
   getGridId($event:string){
     this.gridId = $event;
     console.log(this.gridId);
   }
   onClickRow($event){
     console.log($event);
   }
   onDoubleClickRow($event){
     console.log($event);
   }
   edit(messge,model){
     console.log(model);
   }
 }
  class Exemplo
  {
     public Id:number;
     public Name: string;
     public FiltroGrid:HtFilterGrid;
  
  }
