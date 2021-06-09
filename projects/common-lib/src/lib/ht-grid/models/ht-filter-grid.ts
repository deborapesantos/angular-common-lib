import { HtDirectionOrderBy } from './ht-direction-order-by';

export interface HtFilterGrid {
    Busca?:string;
    CampoOrderBy?:string;
    DirectionOrderBy?:HtDirectionOrderBy;
    Skip?:number;
    Take?:number;
}
