import { GridOptions } from 'ag-grid-community';
import { HtColumnsDef } from './ht-columns-def';
import { HtRequestData } from './ht-request-data';
import { HTGridOptions } from './ht-grid-options';


export  declare interface IHtBaseGrid {
    /** opções de configuração da grid */
    gridOptions:HTGridOptions;
    /** usar essa variavel para verificar se a lista (list:any) está preenchida
     * usar *ngIf="dataIsLoaded" no elemento da grid para iniciar depois de ter uma lista carregada
     */
    dataIsLoaded?:boolean;
    /** preencher request para criar uma requisição */
    request?:HtRequestData;
    /** desabilitar infinite scroll da grid*/
    disableInfiniteScroll?:boolean;
    /**
     * [função local]
     * função para preencher a lista da grid 
     * function
     * param {RequestData} request
     */
    getData?(request:HtRequestData);
    /**
     * [função externa]
     * função para pegar o valor do id da grid criada
     * function
     * param {string} $event
     * returns {string} id gerado no componente da grid
     */
    getGridId?($event:string);
    /**
     * [função externa]
     * função para pegar o valor do evento de click da row de uma grid
     * function
     * param {$event} $event
     * returns {$event} evento click de uma row
     */
    onClickRow?($event);
    /**
     *  função para pegar o valor do evento de duplo click da row de uma grid
     *  [função de retorno do componente Grid]
     * function
     * param {$event} $event
     * returns {$event} evento click duplo de uma row
     */
    onDoubleClickRow?($event);
 
  }