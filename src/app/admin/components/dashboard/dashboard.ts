import { Component, OnInit } from '@angular/core';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from '../../../services/common/signal-r';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hub-url';
import { Alertify, MessageType, Position } from '../../../services/admin/alertify';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard extends Base implements OnInit
{
  constructor(spinner:NgxSpinnerService,private signalRService:SignalRService,private alertify:Alertify)
  {
  
    super(spinner)
    signalRService.start(HubUrls.OrderHub)
      this.signalRService.on(ReceiveFunctions.OrderCreatedMessage,message=>{

   this.alertify.message(message,{
    messageType:MessageType.Notify
    
   })

      })
     
  }
   ngOnInit(){
    
  }
}
