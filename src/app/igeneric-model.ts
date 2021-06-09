
import {NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';


export interface IGenericModel<T,U> {
    
    openModalComponent(content:T, model:U, options?: NgbModalOptions):void;
}