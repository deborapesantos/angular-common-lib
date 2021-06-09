import { Component, OnInit } from '@angular/core';
import { HtGridComponent } from './ht-grid/ht-grid.component'
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'ht-common-lib',
  template: `
    <p>
      common-lib works!
    </p>
  `,
  styles: []
})
export class CommonLibComponent implements OnInit {

  constructor() { }

  ngOnInit() {

   

  }

}
