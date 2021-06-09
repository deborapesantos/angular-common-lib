import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-infinite-grid-api-maestra',
  templateUrl: './infinite-grid-api-maestra.component.html',
  styleUrls: ['./infinite-grid-api-maestra.component.scss']
})

export class InfiniteGridApiMaestraComponent implements OnInit {
  gridApi;
  count:number =0;
  gridColumnApi;
  gridOptions: GridOptions={};

  FiltroGrid:Exemplo ={
    Id:0,
    Name:'',
    FiltroGrid: {
      Busca : '',
      CampoOrderBy : '',
      DirectionOrderBy : DirectionOrderBy.ASC,
      Skip : this.count,
      Take : 20,
    }
  }

  constructor(private http: HttpClient) {
    this.gridOptions = <GridOptions>{};
  
    this.gridOptions={
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
      maxBlocksInCache : 100,
    };

    this.gridOptions.columnDefs=[
      {headerName: "Id", field: "id", width: 150},
      {headerName: "Name", field: "name", width: 90},
     
    ];
    this.gridOptions.rowData = [
      {id: 1, name:'Debora'},
      {id: 2, name:'Rafael'},
      {id: 3, name:'Jaime'},
      {id: 4, name:'Gigi'},
   ];
    
   // this.getData(this.gridOptions);
   }

  ngOnInit() {}

   
}


  // getData(gridOptions: GridOptions){
  
  //   const request = new HttpRequest('POST','https://192.168.1.39:45456/api/Aplicativo/GetExemplo',this.FiltroGrid,{reportProgress:true,responseType:"json"})
  //   this.http.request(request)
  //    .subscribe((data:HttpResponse<Exemplo[]>)=>{
  //      var mdata = data.body;
  //     gridOptions.rowData = mdata;
  //    });
  // }



// onGridReady(params) {
//   this.getData(this.gridOptions);
//   var dataSource = {
//     getRows: function(params:IGetRowsParams) {

      

//       console.log("chama funcao pega mais");
//       var novoArray = [
//         {id: 200, name:'novo mundo 200'},
//         {id: 201, name:'novo mundo 201'}
//       ]
//       params.successCallback(novoArray);
//     }
//   }
//   params.api.setDatasource(dataSource);
// }

  // onGridReady(params) {
  //   this.gridApi = params.api;

  //   this.gridColumnApi = params.columnApi;
  //   const request = new HttpRequest('POST','https://192.168.1.39:45456/api/Aplicativo/GetExemplo',this.FiltroGrid,{reportProgress:true,responseType:"json"})
   
  //    this.http.request(request)
  //     .subscribe(
  //       (data:HttpResponse<any[]>) => {
      
  //       //  var count = this.count;

  //       //  var filtro = this.FiltroGrid;
  //       //  var myhttp = this.http;
  //        var dataSource = {
  //           getRows: function(params:IGetRowsParams) {
            //  var myarray = data.body;
            //  filtro.FiltroGrid.Skip = count;
            //  //const request2 = new HttpRequest('POST','https://192.168.1.39:45456/api/Aplicativo/GetExemplo',filtro,{reportProgress:true,responseType:"json"})

            //   var rowsThisPage = myarray.slice(params.startRow, params.endRow);
            //   count = count + 1;
            //   var lastRow = -1;
            //  if (myarray.length <= params.endRow) {
            //      lastRow = myarray.length;
            //  }
           // params.successCallback(rowsThisPage, lastRow);

        //     }
        //   }
        // }
            
             

  //             // if(myarray.length){
  //             // myhttp.request(request2)
  //             // .subscribe(
  //             //   (dataInfinity:HttpResponse<any[]>) => {
  //             //     var rowsThisBlock = dataInfinity.body;
  //             //     console.log(rowsThisBlock);
  //             //     var lastRow = -1;
  //             //     if (myarray.length <= params.endRow) {
  //             //       lastRow = myarray.length;
  //             //     }
  //             //     params.successCallback(rowsThisBlock, lastRow);
  //             // })
  //           }
  //         };
  //          params.api.setDatasource(dataSource);
           
  //   });

          
  //               // var param = 'json=' + json;
  //               // var cabe = new Headers();
                
                

  //               // cabe.append('Content-Type', 'application/x-www-form-urlencoded');
  //               // return this.http.post('http://validate.jsontest.com', 
  //               // param, )
  //               //         .map(res=> res.json());
  
         
 // }

  
  

class Exemplo
{
   public Id:number;
   public Name: string;
   public FiltroGrid:FiltroGrid;
    
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

