import { GridOptions } from 'ag-grid-community';
import { HtColumnsDef } from './ht-columns-def';
import { HtRequestData } from './ht-request-data';

export interface HTGridOptions extends GridOptions {
    InfiniteScrollDifferent?:boolean;
    list?:any;
    request?:HtRequestData;
    filterDataModel?: any;
    htcolumnDefs?: (HtColumnsDef)[];
    disableInfiniteScroll?:boolean;
    skip?:number;
    take?:number;
    sizeColumnsToFit?:boolean;
    defaultSortModel?:any

}
