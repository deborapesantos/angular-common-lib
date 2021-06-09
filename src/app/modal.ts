import { IGenericModel } from './igeneric-model';
import {NgbModal, ModalDismissReasons,NgbActiveModal,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Pessoa } from './pessoa';
import { ModalComponent } from './components/modal/modal.component';
export class Modal implements IGenericModel<any,Pessoa> {

    openModalComponent(content:any, model:Pessoa, options?: NgbModalOptions){
            console.log(content);
            console.log(model);
    }
}
