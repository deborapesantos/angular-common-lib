import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';;
import { GridOptions, GridApi } from 'ag-grid-community';
import { FunctionCall } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherGridService {

  elementTable: HTMLElement;
  gridOptions: GridOptions={};
  rowData:any[]=[];
  tempRowData:any[]=[];
  loadMoreItems:boolean =false;
  pageInfiniteScroll: number=0;
  varInterval: any
  copyRowData;
  gridApi: GridApi;
  gridColumApi;
  requestData:DataRequest;
  Request:HttpRequest<any>
  

  FiltroGrid:FiltroGrid = {
      Busca : '',
      CampoOrderBy : '',
      DirectionOrderBy : DirectionOrderBy.ASC,
      Skip : 0,
      Take : 100,
  }
  
  constructor(private httpClient: HttpClient) { 

      this.gridOptions.animateRows = true;
      

  }


/** Método para criação de uma tabela */
 async getInstanceGrid(pGridApi:GridApi, gridOptions:GridOptions){
   this.gridApi = pGridApi;

   this.setDefaultOptions(gridOptions);
   
   Object.assign(this.gridOptions,gridOptions)

   this.gridOptions.rowData =[
    {id:20,name:"Debora"},
    {id:30,name:"Jaime"}
   ];
   
   
   return await this.gridOptions;

  }


   setDefaultOptions(gridOptions) {
    for (var prop in this.gridOptions) {
        if (!gridOptions[prop]) {
            gridOptions[prop] = this.gridOptions[prop];
        }
    }
  }

  public getData(request:HttpRequest<any>){

    this.httpClient.request(request)
    .subscribe((data:HttpResponse<any[]>) => {
      if(data.body){
        var tempRowData = data.body;
        this.pushDataToGrid(tempRowData);
      }   
     });
  }

  private pushDataToGrid(temp){
    if(temp){

      this.copyRowData=[]; 
      Object.assign(this.copyRowData, this.rowData);


      if(!this.copyRowData.length)
      this.copyRowData = [];
      
       temp.forEach(element => {
        this.copyRowData.push(element);
       });
     
      this.rowData = this.copyRowData;
      this.gridApi.refreshCells({rowNodes:this.rowData});

      if(this.elementTable && this.loadMoreItems){
        var meio = this.elementTable.scrollHeight - this.copyRowData.length;
        var table = this.elementTable;
        console.log(meio);
        setTimeout(function() {
          table.scrollTo(0,meio);
      }, 1);
      this.loadMoreItems = false;
      }
      
    }
  }

  public loadMore(){
    this.pageInfiniteScroll = this.pageInfiniteScroll + 1;
    this.requestData.data.FiltroGrid.Skip= this.pageInfiniteScroll;
    this.Request = new HttpRequest(this.requestData.method,this.requestData.url,this.requestData.data,{reportProgress:true,responseType:"json"})


    this.getData(this.Request);
  }

  onScroll(){
    this.elementTable =  <HTMLElement>document.querySelectorAll(".ag-body-viewport.ag-layout-normal.ag-row-no-animation")[0];
      if(this.elementTable){
        this.elementTable.addEventListener("scroll",(event)=>{
  
          var tamanhoElemento = this.elementTable.offsetHeight;
          var posicaoTopo = this.elementTable.scrollTop;
          var tamanhoScroll = this.elementTable.scrollHeight;
          var positionBottom = tamanhoScroll - this.copyRowData.length;
          
  
          if(posicaoTopo + tamanhoElemento >= tamanhoScroll ){
            this.loadMoreItems = true;
            this.loadMore();
            this.elementTable.scrollTo(0,positionBottom);
          }
       })
      }
    }
}

class DataRequest {
  method:string;
  url:string;
  data:any;
}


class FiltroGrid{
  Busca :string;
  CampoOrderBy :string;
  DirectionOrderBy :DirectionOrderBy;
  Skip:number;
  Take:number;
}

enum DirectionOrderBy{
  ASC,
  DESC
}