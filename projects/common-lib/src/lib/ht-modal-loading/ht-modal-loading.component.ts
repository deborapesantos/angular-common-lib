import { Component, OnInit,Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ht-modal-loadingg',
  templateUrl: './ht-modal-loading.component.html',
  styleUrls: ['./ht-modal-loading.component.scss']
})
export class HtModalLoadingComponent implements OnInit {
  
  @Input() model:boolean;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    document.getElementById('loading').parentElement.parentElement.parentElement.style.width = "253px";
    if(this.model == true){
      this.activeModal.close();
    }
  }

  close() {
    this.activeModal.close();
  }
}
