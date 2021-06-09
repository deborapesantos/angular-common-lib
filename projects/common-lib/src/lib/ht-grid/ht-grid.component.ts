import { Component, OnInit,HostListener, Input, Output ,EventEmitter } from '@angular/core';
import { GridOptions, GridApi,initialiseAgGridWithAngular1 } from 'ag-grid-community';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';

import { HTGridOptions } from './models/ht-grid-options';
import { HtStyleGridCss } from './models/ht-style-grid-css';
import { HtRequestData } from './models/ht-request-data';
import { HtDirectionOrderBy } from './models/ht-direction-order-by';

@Component({
  selector: 'ht-grid',
  templateUrl: './ht-grid.component.html',
  styleUrls: ['./ht-grid.component.scss']
})
export class HtGridComponent implements OnInit {
  @Input() htGridOptions:HTGridOptions;
  @Input() styleCSS:HtStyleGridCss;
  @Input() multiSortKey:any;
  @Input() isPagination:boolean;
  @Input() loadingMore:boolean;

  @Input() qdteTotal:number;
  @Input() qdtePageTotal:number;
  @Input() currentPage:number;
  @Input() takePage:number;
  
  @Output() objSendEventRowClick = new EventEmitter<any>();
  @Output() objSendOnGridLoadId= new EventEmitter<string>();
  @Output() objSendEventDoubleRowClick = new EventEmitter<any>();
  @Output() objSendEventCarregaMais = new EventEmitter<any>();

  @Output() onCarregaPrimeiro = new EventEmitter<any>();
  @Output() onCarregaProximo= new EventEmitter<string>();
  @Output() onCarregaAnterior = new EventEmitter<any>();
  @Output() onCarregaUltimo = new EventEmitter<any>();
 
   gridId:string;
   elementTable: HTMLElement;
   _gridOptions: GridOptions={};
   copyGridOptions:HTGridOptions={};
   _request:HtRequestData;
   _filterGrid:any;
   _disableInfiniteScroll:boolean = false;
   _InfiniteScrollDifferent:boolean= false;
   rowData:any[]=[];
   tempRowData:any[]=[];
   loadMoreItems:boolean =false;
   pageInfiniteScroll: number=0;
   copyRowData;
   gridApi: GridApi;
   gridColumApi;
   directionOrderBy:HtDirectionOrderBy = HtDirectionOrderBy.ASC;
   campoOrderBy:string="id";
   busca:string;
   _styleCSS:HtStyleGridCss;
   disableNextButtomPagination:boolean=false;
   disablePreviusButtomPagination:boolean=true;
   styleHeight:string='15px';
   constructor(private _httpClient: HttpClient) {
       this.gridId = "ht-grid-"+Math.random().toString(36).substr(2, 9);
   }
 
 
   ngOnInit() {
     /* adiciona os objetos vindos do componente pai para uma variavel local*/
       this._filterGrid = this.htGridOptions.filterDataModel;
       this.htGridOptions.overlayNoRowsTemplate= '<span class="overlayNoRows">Não existem items a serem exibidos</span>';
       
       this._request = this.htGridOptions.request;
       this._disableInfiniteScroll =  this.htGridOptions.disableInfiniteScroll || false;
       this._InfiniteScrollDifferent = this.htGridOptions.InfiniteScrollDifferent;
       this.rowData = this.htGridOptions.list;
       this._styleCSS = this.styleCSS;
       this._gridOptions = {
         animateRows: true,
         columnDefs:[{editable: true,      resizable: true}]
       }
       Object.assign(this.copyGridOptions,this.htGridOptions)
       this.getGridOptionsComponent();


       this.copyGridOptions.overlayNoRowsTemplate= '<span class="overlayNoRows">Não existem items a serem exibidos</span>';


      if(this.isPagination){
        this.styleHeight = "47px"
      }

    }
 
    /**
    * Preenche o objeto columnDefs do gridOptions para criar a tabela
    * function
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
    * function
    * param {any} filterDataModel - recebe um objeto de qualquer natureza, porém esse objeto deve contar um objeto do tipo FilterGrid
    *
    */
   protected getData(filterDataModel,isLoadMore?){

    if(!isLoadMore){
      isLoadMore = false;
    }
     
     const request = new HttpRequest(this._request.Method,this._request.Url,filterDataModel,{reportProgress:true,responseType:"json"})
     this._httpClient.request(request)
           .subscribe((data:HttpResponse<any[]>) => {
            console.log(data);
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
    * function
    * param {$event} params - recebe uma lista de qualquer natureza
    *
    */
   onGridReady(params,isLoadMore?){
    //se é pra carregar mais
    if(!isLoadMore){
      isLoadMore = false;
    }

    //adiciona api a uma variavel
     this.gridApi = params.api;

     //envia um evento para saber o id da grid
     this.objSendOnGridLoadId.emit(this.gridId);
     
     //adiciona uma lista na grid
     this.setDataToGrid(this.copyGridOptions.list);

     if(this.copyGridOptions.sizeColumnsToFit == true){
      this.gridApi.sizeColumnsToFit();
     }
      
     this.onSortHeaderClick();


     //adiciona uma configuracao de ordenação default
     this.gridApi.setSortModel(this.copyGridOptions.defaultSortModel);

     
 
   }

   /**carrega mais dados para infinite scroll
    * function   
   */
  protected loadMore(){
    if(this._request.Url == '' || this._request.Method == '')
      return;

      var newFilter = this._filterGrid;
      this.pageInfiniteScroll++;
        if(!newFilter){
          newFilter ={
            FiltroGrid : {
            Busca : this.busca,
            CampoOrderBy : this.campoOrderBy,
            DirectionOrderBy : this.directionOrderBy,
            Skip : this.pageInfiniteScroll,
            Take : 40
          }
        }
      }

      newFilter.Skip = this.pageInfiniteScroll;
      newFilter.filterSkip = this.pageInfiniteScroll;
      newFilter.filtroSkip = this.pageInfiniteScroll;


       if(!newFilter.FiltroGrid){
        newFilter.FiltroGrid = {
          Busca : this.busca,
          CampoOrderBy : this.campoOrderBy,
          DirectionOrderBy : this.directionOrderBy,
          Skip : this.pageInfiniteScroll,
          Take : 40
        }
      }
 
      newFilter.FiltroGrid.Skip = this.pageInfiniteScroll;


      if(!this._InfiniteScrollDifferent){
        this.getData(newFilter,true);
      }else{
        return this.pageInfiniteScroll;
      }
    }

    /**
    * insere mais items na lista que preenche a grid
    * function
    * param {any} temp - recebe uma lista de qualquer natureza
    *
    */
   pushDataGridByList(temp){
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
    * insere mais items na lista que preenche a grid
    * function
    * param {any} temp - recebe uma lista de qualquer natureza
    *
    */
   public pushDataToGrid(temp){
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
    * function
    * param {any} temp - recebe uma lista de qualquer natureza
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
    * function
    * param {$event} event
    *
    */
   onScroll(event){
     if(this._InfiniteScrollDifferent){
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
                this.objSendEventCarregaMais.emit(true);
              }
          }
       }
     }
     else
     {
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
 
   protected changingDirectionOrderBy(param:HtDirectionOrderBy,elem:HTMLElement,elementoPai:string):HtDirectionOrderBy{
     var direction:HtDirectionOrderBy;
     var lastchild = elem.children.length -1;
     var childElem = elem.children[lastchild];
 
     if(param == HtDirectionOrderBy.ASC){
       direction = HtDirectionOrderBy.DESC;
       this.removeIconsSort(elementoPai);
       
       childElem.insertAdjacentHTML('beforeend','<i class="fa fa-sort-up icosort" id="'+elementoPai+'-sort-up"></i>');
 
     }else if (param == HtDirectionOrderBy.DESC){
       direction = HtDirectionOrderBy.ASC;
       
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
    * function
    * param {GridOptions} gridOptions
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
    * function
    * param {$event} $event
    * returns evento de click de uma row
    */
   onRowClicked(event){
     this.objSendEventRowClick.emit(event);
   }
 
   /**
    * envia para componente pai o evento de  duplo click da row de uma grid
    * function
    * param {$event} $event
    * returns  evento de duplo click de uma row
    */
   onDoubleRowClicked(event){
     this.objSendEventDoubleRowClick.emit(event);
   }
 
 /**
    * refresca a lista da grid
    * function
    * param {any} FilterModel
    */
   refreshData(filterModel) 
   { 
     this.getData(filterModel,false);
   }

   /**
    * refresca a lista da grid usando a lista passada por parametro
    * function
    * param {any} list
    */
   refreshDataGridByList(list) 
   { 
     this.setDataToGrid(list);
   }

   setHabilitarBotoes(){
    if(this.currentPage == 1 || this.currentPage == 0){
      this.disablePreviusButtomPagination = true;
      this.disableNextButtomPagination = false;
    }else{
      this.disablePreviusButtomPagination = false;
      this.disableNextButtomPagination = false;
    }


    if(this.currentPage >= this.qdtePageTotal){
      this.disableNextButtomPagination = true;
      this.disablePreviusButtomPagination = false;
    }else{
      this.disableNextButtomPagination = false;
      this.disablePreviusButtomPagination = false;
    }
   }

   /*
    * ações de paginação : para primeiro
   */
  onBtFirst() {
   //this.setHabilitarBotoes();
 console.log(this.currentPage )
    if(this.currentPage > 1){
      this.onCarregaPrimeiro.emit(0);
    }
  }
  /*
    * ações de paginação : para ultimo
   */
  onBtLast() {
    //this.setHabilitarBotoes();
    console.log(this.currentPage )
    if(this.currentPage < this.qdtePageTotal){
      this.onCarregaUltimo.emit();
    }
  }

  /*
    * ações de paginação : para proximo
   */
  onBtNext() {
    //this.setHabilitarBotoes();
    console.log(this.currentPage )
    if(this.currentPage < this.qdtePageTotal){
      this.onCarregaProximo.emit();
    }

  }

  /*
    * ações de paginação : para anterior
   */
  onBtPrevious() {
   // this.setHabilitarBotoes();
   console.log(this.currentPage )
    if(this.currentPage > 1){
      this.onCarregaAnterior.emit();
    }
  }

  // onBtPageFive() {
  //   this.gridApi.paginationGoToPage(4);
  // }

  // onBtPageFifty() {
  //   this.gridApi.paginationGoToPage(49);
  // }



 }
 