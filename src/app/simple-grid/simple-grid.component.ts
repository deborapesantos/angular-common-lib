import { Component, OnInit,ViewChild} from '@angular/core';
//import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { IHtBaseGrid,HTGridOptions } from 'common-lib';
import { RowGridRedComponent } from './../row-grid-red/row-grid-red.component';
import { RowGridActionsComponent } from './../row-grid-actions/row-grid-actions.component';

@Component({
  selector: 'app-simple-grid',
  templateUrl: './simple-grid.component.html',
  styleUrls: ['./simple-grid.component.scss']
})
export class SimpleGridComponent implements IHtBaseGrid {
  @ViewChild(RowGridRedComponent, {static: false}) child: RowGridRedComponent; 
  @ViewChild(RowGridActionsComponent, {static: false}) childActions: RowGridActionsComponent; 
  dataIsLoaded: boolean=false;
  gridOptions: HTGridOptions;

  constructor() { }

  ngOnInit() {

    this.gridOptions={
      list:[
        {id: 1, name:'Debora',date:new Date() },
        {id: 2, name:'Rafael',date:new Date() }
      ],
      htcolumnDefs: [
        {headerName: 'Id', field: 'id'},
        {headerName: 'Nome', field: 'name'},
        {headerName: 'Date', field: 'date',cellRendererFramework: RowGridRedComponent},
        {headerName: 'Opções', field: 'id',cellRendererFramework: RowGridActionsComponent}
      ]
    }
    this.dataIsLoaded = true;

  }

  getData(){}

}
