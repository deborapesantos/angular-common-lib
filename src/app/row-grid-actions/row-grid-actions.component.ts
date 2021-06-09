import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {GridOptions} from "ag-grid-community";
@Component({
  selector: 'app-row-grid-actions',
  templateUrl: './row-grid-actions.component.html',
  styleUrls: ['./row-grid-actions.component.scss']
})
export class RowGridActionsComponent implements OnInit {
  params;
  gridOptions;
  @Output() objSendEventEditClick = new EventEmitter<any>();
  constructor() {
  }

  ngOnInit() {
  }
  
  agInit(params: any): void {
    this.params = params;
  }

  openEdit(params){
    this.params.context.componentParent.edit("editar",params.value);
  }

}
