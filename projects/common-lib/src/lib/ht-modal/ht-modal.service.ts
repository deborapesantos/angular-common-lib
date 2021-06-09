import { Injectable } from '@angular/core';
import {NgbModal,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { HtModalAlertComponent } from './../ht-modal-alert/ht-modal-alert.component';
import { HtModalWarningComponent } from '../ht-modal-warning/ht-modal-warning.component';
import { HtModalConfirmComponent } from './../ht-modal-confirm/ht-modal-confirm.component';
import { HtModalLoadingComponent } from '../ht-modal-loading/ht-modal-loading.component';


@Injectable({
  providedIn: 'root'
})
export class HtModalService {

  component:any;
  model:any;
  defaultOptions:NgbModalOptions={
    backdropClass: 'modal-backdrop',
    backdrop:'static',
    windowClass: 'modal-background',
    size:'lg',
    centered: true ,
    scrollable: true
  }

  constructor(private modalService: NgbModal) {}

  /*
  * abre uma modal de qualquer natureza 
  * onde retorna um resultado 
  * */
  openModalComponent(component:any,model:any, options?: any){

    var ModalAlertOptions = options || { size: 'small' }; 

    this.setDefaultOptions(ModalAlertOptions);
    Object.assign(this.defaultOptions,ModalAlertOptions);

    let modal = this.modalService.open(component,this.defaultOptions)
    modal.componentInstance.model = model;

    return  modal.result;
  }

  /*
  * abre uma modal de qualquer natureza onde não retorna resultado
  * pode ser usada como modal de carregamento
  * */
  openModal(component:any,options?: any){
    
    var ModalAlertOptions = options || { size: 'small' }; 

    this.setDefaultOptions(ModalAlertOptions);
    Object.assign(this.defaultOptions,ModalAlertOptions);

    let modal = this.modalService.open(component,this.defaultOptions);
    return modal;
  }

  /*abre uma modal de erro padrão*/
  openAlert(title:string, message:string, description?:string, options?:any){
    var model={
      title:title,
      message:message,
      description:description
    }

    var ModalAlertOptions = options || { size: 'sm' }; 

    this.setDefaultOptions(ModalAlertOptions);
    Object.assign(this.defaultOptions,ModalAlertOptions);

    let modal = this.modalService.open(HtModalAlertComponent,this.defaultOptions)
    modal.componentInstance.model = model;
    return  modal.result;
  }

  /*abre uma modal de alerta padrão*/
  openWarnig(title:string, message:string,description?:string, options?:any){
    var model={
      title:title,
      message:message,
      description:description
    }
    var ModalWarnigtOptions = options || { size: 'sm' };

    this.setDefaultOptions(ModalWarnigtOptions);
    Object.assign(this.defaultOptions,ModalWarnigtOptions);

    let modal = this.modalService.open(HtModalWarningComponent,this.defaultOptions)
    modal.componentInstance.model = model;
    return  modal.result;
  }

  /*abre uma modal de carregamento padrão*/
  openLoading(carregando?:boolean, options?:any){
    var ModalWarnigtOptions = options || { size: 'sm' };

    this.setDefaultOptions(ModalWarnigtOptions);
    Object.assign(this.defaultOptions,ModalWarnigtOptions);

    let modal = this.modalService.open(HtModalLoadingComponent,this.defaultOptions)
    modal.componentInstance.model = carregando;
    return  modal;
  }

  /*abre uma modal de confirmação padrão*/
  openConfirm(title:string, message:string,description?:string, options?:any,textoFechar?:string,textoConfirmar?:string){
    var model={
      title:title,
      message:message,
      description:description,
      textoFechar:textoFechar,
      textoConfirmar:textoConfirmar
    }
    var ModalConfirmOptions = options || { size: 'sm' };

    this.setDefaultOptions(ModalConfirmOptions);
    Object.assign(this.defaultOptions,ModalConfirmOptions);

    let modal = this.modalService.open(HtModalConfirmComponent,this.defaultOptions)
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
