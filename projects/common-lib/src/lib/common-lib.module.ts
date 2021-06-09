import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { CommonLibComponent } from './common-lib.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

import { HtModalService } from './ht-modal/ht-modal.service';
import { HtGridComponent } from './ht-grid/ht-grid.component';
import { HtModalAlertComponent } from './ht-modal-alert/ht-modal-alert.component';
import { HtModalConfirmComponent } from './ht-modal-confirm/ht-modal-confirm.component';
import { HtModalWarningComponent } from './ht-modal-warning/ht-modal-warning.component';

import { HtModalLoadingComponent } from './ht-modal-loading/ht-modal-loading.component';

@NgModule({
  declarations: [CommonLibComponent, HtGridComponent, HtModalAlertComponent, HtModalWarningComponent, HtModalConfirmComponent,HtModalLoadingComponent],
  imports: [
    AgGridModule,
    CommonModule
  ],
  exports: [CommonLibComponent,HtGridComponent],
  schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
		NO_ERRORS_SCHEMA
	]
})
export class CommonLibModule { 
  static forRoot (): ModuleWithProviders { 
    return { 
      ngModule: CommonLibModule, 
      providers: [HtModalService],
    } 
  } 

}