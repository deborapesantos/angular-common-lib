import { Component, OnInit,Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ht-modal-warning',
  templateUrl: './ht-modal-warning.component.html',
  styleUrls: ['./ht-modal-warning.component.scss']
})
export class HtModalWarningComponent implements OnInit {
  
  @Input() model;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
