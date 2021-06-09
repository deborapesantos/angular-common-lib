import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { Routing } from './config/app.route';
import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { RowGridRedComponent } from './row-grid-red/row-grid-red.component';
import { RowGridActionsComponent } from './row-grid-actions/row-grid-actions.component';
import { HttpClientModule } from "@angular/common/http";
import { InfiniteGridApiMaestraComponent } from './components/infinite-grid-api-maestra/infinite-grid-api-maestra.component';


import { TesteGridComponent } from './components/teste-grid/teste-grid.component';
import { ModalComponent } from './components/modal/modal.component';
import { TesteModalComponent } from './components/teste-modal/teste-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
//import { CommonLibModule,HtModalAlertComponent,HtModalConfirmComponent,HtModalWarningComponent } from 'common-lib';

//import { HtModalService } from './modal.service';
import { OtherGridComponent } from './components/other-grid/other-grid.component';
import { SimpleGridComponent } from './simple-grid/simple-grid.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';



@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    RowGridRedComponent,
    RowGridActionsComponent,
    InfiniteGridApiMaestraComponent,
  
    TesteGridComponent,
    ModalComponent,
    TesteModalComponent,
    OtherGridComponent,
    SimpleGridComponent,
   ModalWindowComponent,
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([
      RowGridRedComponent,
      RowGridActionsComponent
    ]),
    HttpClientModule,
    Routing,
    NgbModule,
 // CommonLibModule.forRoot()
  ],
  entryComponents: [
    ModalComponent,
   // HtModalAlertComponent,
//HtModalConfirmComponent,
  //  HtModalWarningComponent
    
  ],
  providers: [
   // HtModalService
  ],
 schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
		NO_ERRORS_SCHEMA
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
