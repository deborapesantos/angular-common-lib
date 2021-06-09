import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})

export class ModalWindowComponent implements OnInit {
  @Input()   title:string;
  @Output() close = new EventEmitter();
  @Output() dismiss = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() { 
   
  }

  c(){
    this.close.emit()
  }

  d(){
    this.dismiss.emit()
  }
}