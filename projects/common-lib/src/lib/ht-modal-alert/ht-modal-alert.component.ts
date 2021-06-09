import { Component, OnInit,Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ht-modal-alert',
  templateUrl: './ht-modal-alert.component.html',
  styleUrls: ['./ht-modal-alert.component.scss']
})
export class HtModalAlertComponent implements OnInit {

  @Input() model;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
