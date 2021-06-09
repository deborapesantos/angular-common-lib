import { Component, OnInit ,ViewChild} from '@angular/core';
import { ModalComponent } from './../modal/modal.component';
//import { HtModalService } from 'common-lib';

import { HtModalService } from './../../modal.service';

@Component({
  selector: 'teste-modal',
  templateUrl: './teste-modal.component.html',
  styleUrls: ['./teste-modal.component.scss']
})

export class TesteModalComponent implements OnInit {
  
  constructor(private HtModalService: HtModalService) {}

  

  open() {

    this.HtModalService.openModalComponent(ModalComponent,{name:'Debora',idade:24},{ size: 'sm' })
    .then((result)=>{
      console.log(result)
    },(reason)=>{
      console.log(reason)
    });
  }  


  // alert() {
  //   this.HtModalService.openAlert("Modal de alerta","Esta é uma modal de alerta")
  //   .then((result)=>{
  //     console.log(result)
  //   },(reason)=>{
  //     console.log(reason)
  //   });
  // }  

  // warnig() {
  //   this.HtModalService.openWarnig("Modal de aviso","Esta é uma modal de aviso")
  //   .then((result)=>{
  //     console.log(result)
  //   },(reason)=>{
  //     console.log(reason)
  //   });
  // }  

  // confirm() {
  //   this.HtModalService.openConfirm("Modal de confirmação","Esta é uma modal de confirmação?")
  //   .then((result)=>{
  //     console.log(result)
  //   },(reason)=>{
  //     console.log(reason)
  //   });
  // }  

 
  ngOnInit() {}
}

