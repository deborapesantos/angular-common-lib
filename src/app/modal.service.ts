import { Injectable,TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbActiveModal,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { IGenericModel } from './igeneric-model';
import { Modal } from './modal';


@Injectable({
  providedIn: 'root'
})
export class HtModalService {
  

  content:any;
  model:any;
  defaultOptions:NgbModalOptions={
    backdropClass: 'light-blue-backdrop',
    windowClass: 'dark-modal',
    size:'lg',
    centered: true ,
    scrollable: true
  }


  constructor(private modalService: NgbModal) {}

  openModalComponent(content:any,model:any, options?: NgbModalOptions){

    this.setDefaultOptions(options);
    Object.assign(this.defaultOptions,options);

    let modal = this.modalService.open(content,this.defaultOptions)
    modal.componentInstance.model = model;
    return  modal.result;
    
  }
  
  protected setDefaultOptions(options) {
    for (var prop in options) {
        if (!this.defaultOptions[prop]) {
            this.defaultOptions[prop] = options[prop];
        }
    }
  }
}

