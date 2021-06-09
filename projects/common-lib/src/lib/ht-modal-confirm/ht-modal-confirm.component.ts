import { Component, OnInit,Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ht-modal-confirm',
  templateUrl: './ht-modal-confirm.component.html',
  styleUrls: ['./ht-modal-confirm.component.scss']
})
export class HtModalConfirmComponent implements OnInit {
  @Input() model;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    if(!this.model.textoFechar){
      this.model.textoFechar= "Fechar";
    }

    if(!this.model.textoConfirmar){
      this.model.textoConfirmar= "Confirmar";
    }
  }

}
