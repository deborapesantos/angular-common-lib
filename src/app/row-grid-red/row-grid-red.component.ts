import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-row-grid-red',
  templateUrl: './row-grid-red.component.html',
  styleUrls: ['./row-grid-red.component.scss']
})
export class RowGridRedComponent implements OnInit {
  params;

  constructor() { }

  ngOnInit() {
  }

  agInit(params: any): void {
    this.params = params;
    this.params.value = new Date();
  }

}
