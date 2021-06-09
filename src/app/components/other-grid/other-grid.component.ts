import { Component, OnInit,HostListener, Input, Output ,EventEmitter } from '@angular/core';
import { GridOptions, GridApi, initialiseAgGridWithAngular1 } from 'ag-grid-community';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { ColDef } from "ag-grid-community/dist/lib/entities/colDef";


@Component({
  selector: 'app-other-grid',
  templateUrl: './other-grid.component.html',
  styleUrls: ['./other-grid.component.scss']
})

export class OtherGridComponent implements OnInit {
 @Input() htGridOptions:HTGridOptions;
 @Output() objSendEventRowClick = new EventEmitter<any>();
 @Output() objSendOnGridLoadId= new EventEmitter<string>();
 @Output() objSendEventDoubleRowClick = new EventEmitter<any>();
 @Input() styleCSS:StyleCSS;

  gridId:string;
  elementTable: HTMLElement;
  _gridOptions: GridOptions={};
  copyGridOptions:HTGridOptions={};
  _request:RequestData;
  _filterGrid:any;
  _disableInfiniteScroll:boolean = false;
  rowData:any[]=[];
  tempRowData:any[]=[];
  loadMoreItems:boolean =false;
  pageInfiniteScroll: number=0;
  copyRowData;
  gridApi: GridApi;
  gridColumApi;
  directionOrderBy:DirectionOrderBy = DirectionOrderBy.ASC;
  campoOrderBy:string="id";
  busca:string;
  _styleCSS:StyleCSS;
  
  constructor(private _httpClient: HttpClient) {
      this.gridId = "ht-grid-"+Math.random().toString(36).substr(2, 9);
  }


  ngOnInit() {
      this._filterGrid = this.htGridOptions.filterDataModel;
      this._request = this.htGridOptions.request;
      this._disableInfiniteScroll =  this.htGridOptions.disableInfiniteScroll || false;
      this.rowData = this.htGridOptions.list;
      this._styleCSS = this.styleCSS;
      this._gridOptions = {
        animateRows: true
      }
      Object.assign(this.copyGridOptions,this.htGridOptions)
      this.getGridOptionsComponent();
   }

   /**
   * Preenche o objeto columnDefs do gridOptions para criar a tabela
   * @function
   */
   protected getGridOptionsComponent(){
   const newGridOptions = this.htGridOptions;
  
   this.htGridOptions.columnDefs = newGridOptions.htcolumnDefs;

    if(this._filterGrid){
      delete this.htGridOptions.filterDataModel;
    }

    if(this._request){
      delete this.htGridOptions.request;
    }

    if(this.rowData){
      delete this.htGridOptions.list;
    }


    this.setDefaultOptions(this.htGridOptions);

    Object.assign(this._gridOptions,this.htGridOptions)
   }

  /**
   * Faz uma requisição para pegar mais dados de uma para inserir na lista da tabela
   * @function
   * @param {any} filterDataModel - recebe um objeto de qualquer natureza, porém esse objeto deve contar um objeto do tipo FilterGrid
   *
   */
  protected getData(filterDataModel,isLoadMore=false){
    const request = new HttpRequest(this._request.Method,this._request.Url,filterDataModel,{reportProgress:true,responseType:"json"})
    
    this._httpClient.request(request)
          .subscribe((data:HttpResponse<any[]>) => {
            if(data.body){
              var tempRowData = data.body;

              if(isLoadMore){
                
                if(tempRowData.length > 0)
                    this.pushDataToGrid(tempRowData);

              }else{
                this.setDataToGrid(tempRowData);
              }
              
            }
        });
  }

 
  /**
   * Quando carregar a grid puxa dados para inserir na tabela
   * @function
   * @param {$event} params - recebe uma lista de qualquer natureza
   *
   */
  onGridReady(params){
    this.gridApi = params.api;
    this.objSendOnGridLoadId.emit(this.gridId);
    this.pushDataToGrid(this.copyGridOptions.list);

    this.onSortHeaderClick()

  }

 
  /**carrega mais dados para infinite scroll
   * @function   
  */
 protected loadMore(){
     var newFilter = this._filterGrid;
     this.pageInfiniteScroll++;

      if(!newFilter.FiltroGrid){
        newFilter.FiltroGrid = {
          Busca : this.busca,
          CampoOrderBy : this.campoOrderBy,
          DirectionOrderBy : this.directionOrderBy,
          Skip : this.pageInfiniteScroll,
          Take : 100
        }
      }

     newFilter.FiltroGrid.Skip = this.pageInfiniteScroll;
    
     this.getData(newFilter,true);
   }

   /**
   * insere mais items na lista que preenche a grid
   * @function
   * @param {any} temp - recebe uma lista de qualquer natureza
   *
   */
  protected pushDataToGrid(temp){
     if(temp){
       this.copyRowData=[];
       Object.assign(this.copyRowData, this.rowData);

       if(!this.copyRowData.length){
        this.copyRowData = [];
       }
      
    
        temp.forEach(element => {
         this.copyRowData.push(element);
        });
   
       this.rowData = this.copyRowData;
       this.gridApi.refreshCells({rowNodes:this.rowData});

       /**configura a barra de rolagem para permanecer sempre na posição de onde parou a linha da tabela*/
       if(this.elementTable && this.loadMoreItems){
         var meio = this.elementTable.scrollHeight - this.copyRowData.length;
         var table = this.elementTable;
     
         setTimeout(function() {
           table.scrollTo(0,meio);
       }, 1);
       this.loadMoreItems = false;
       }
    
     }
   }


   
   /**
   * preenche a grid
   * @function
   * @param {any} temp - recebe uma lista de qualquer natureza
   *
   */
  protected setDataToGrid(list){
    if(list){
      this.rowData = list;
      this.gridApi.refreshCells({rowNodes:this.rowData});
    }
  }

  /**
   * pega o elemento da tabela para executar a função  loadMore() quando chegar ao final da barra de rolagem
   * @function
   * @param {$event} event
   *
   */
  onScroll(event){
    if(event.direction == "vertical"){
      this.elementTable =  <HTMLElement>document.querySelectorAll("#"+this.gridId +" .ag-body-viewport")[0];
     
    if(this.elementTable){
        var tamanhoElemento = this.elementTable.offsetHeight;
        var posicaoTopo = event.top;
        var tamanhoScroll = this.elementTable.scrollHeight;

        if(!this.rowData.length){
          this.rowData = [];
         }
            var positionBottom = tamanhoScroll - this.rowData.length;
      
            if(posicaoTopo + tamanhoElemento >= tamanhoScroll ){
              this.loadMoreItems = true;
              if(!this._disableInfiniteScroll){
                this.loadMore();
                this.elementTable.scrollTo(0,positionBottom);
              }
            }
        }
     }
   }


  protected onSortHeaderClick(){
    var elems = document.querySelectorAll("#"+this.gridId +" .ag-header-cell");  
    elems.forEach((elem:HTMLElement,key:number) => {
      elem.addEventListener('click',()=>{
          var campoOrderBy =  elem.getAttribute("col-id");
          this.setEnableSortClass(elem,campoOrderBy);
      })
    });
  }

  protected changingDirectionOrderBy(param:DirectionOrderBy,elem:HTMLElement,elementoPai:string):DirectionOrderBy{
    var direction:DirectionOrderBy;
    var lastchild = elem.children.length -1;
    var childElem = elem.children[lastchild];

    if(param == DirectionOrderBy.ASC){
      direction = DirectionOrderBy.DESC;
      this.removeIconsSort(elementoPai);
      
      childElem.insertAdjacentHTML('beforeend','<i class="fa fa-sort-up icosort" id="'+elementoPai+'-sort-up"></i>');

    }else if (param == DirectionOrderBy.DESC){
      direction = DirectionOrderBy.ASC;
      
      this.removeIconsSort(elementoPai);
      
      childElem.insertAdjacentHTML('beforeend','<i class="fa fa-sort-down icosort" id="'+elementoPai+'-sort-down"></i>');

    } 
    else{
      this.removeIconsSort(elementoPai);
    }


    return direction;
  }

  protected removeIconsSort(pai){
    var icodown = document.getElementById(pai+"-sort-down"); 
    var icoup = document.getElementById(pai+"-sort-up");  
   
    if(icoup)
    icoup.remove();

    if(icodown)
    icodown.remove();
  }
  
  protected setEnableSortClass(elem:HTMLElement,id:string){
    var columDef = this.copyGridOptions.htcolumnDefs;
    var newFilter = this._filterGrid;
    columDef.forEach(element => {
      if(element.enableSort && id == element.field){
      
        var direction = this.changingDirectionOrderBy(this.directionOrderBy,elem,id);
          this.directionOrderBy = direction;
          this.campoOrderBy = id;

           newFilter.FiltroGrid = {
               Busca : this.busca,
               CampoOrderBy : id,
               DirectionOrderBy : direction,
               Skip : this.pageInfiniteScroll,
               Take : 100
             }
           

           this.getData(newFilter,false);
      }
    });
  
  }

   /**
   * transfere os dados de gridOptions vindo por parametro em _gridOptions
   * @function
   * @param {GridOptions} gridOptions
   */
  protected setDefaultOptions(gridOptions) {
    for (var prop in this.htGridOptions) {
        if (!gridOptions[prop]) {
            gridOptions[prop] = this.htGridOptions[prop];
        }
    }
  }

 /**
   * envia para componente pai o evento click da row de uma grid
   * @function
   * @param {$event} $event
   * @returns evento de click de uma row
   */
  onRowClicked(event){
    this.objSendEventRowClick.emit(event);
  }

  /**
   * envia para componente pai o evento de  duplo click da row de uma grid
   * @function
   * @param {$event} $event
   * @returns  evento de duplo click de uma row
   */
  onDoubleRowClicked(event){
    this.objSendEventDoubleRowClick.emit(event);
  }

/**
   * refresca a lista da grid
   * @function
   * @param {any} FilterModel
   */
  refreshData(filterModel) 
  { 
    this.getData(filterModel,false);
  }

}


declare interface HTColumnsDef extends ColDef {
  enableSort?:boolean;
}

declare interface HTGridOptions extends GridOptions{

  list?:any;
  request?:RequestData;
  filterDataModel?: any;
  disableInfiniteScroll?:boolean;
  htcolumnDefs?: (HTColumnsDef)[];
 
}

class Exemplo
{
   public Id:number;
   public Name: string;
   public FiltroGrid:FilterGrid;
    
}

class RequestData{
  public Method:string;
  public Url:string;
  public Data:any; 
}

class FilterGrid{
  public Busca :string;
  public CampoOrderBy :string;
  public DirectionOrderBy :DirectionOrderBy;
  public Skip:number;
  public Take:number;
}

class StyleCSS{
  public width?:string;
  public height?:string;
  public backgroundColor?:string;
  public borderColor?:string;

}

enum DirectionOrderBy{
  ASC,
  DESC
}





