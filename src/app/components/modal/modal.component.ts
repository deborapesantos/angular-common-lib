import { Component, OnInit ,Input,EventEmitter,Output} from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() { 
   
  }

  close(){
   this.activeModal.close()
     console.log("fechow c");

  }

  dismiss(){
    this.activeModal.dismiss()
    console.log("fechow d");
  }

}
