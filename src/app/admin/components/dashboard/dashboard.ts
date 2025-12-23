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
  
  
     
  }
   ngOnInit(){
      this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProdcutAddedMessage, message => {

       this.alertify.message(message, {
         messageType: MessageType.Notify

       })

     })
     this.signalRService.on(HubUrls.OrderHub,ReceiveFunctions.OrderCreatedMessage, message => {

       this.alertify.message(message, {
         messageType: MessageType.Notify

       })

     })
  }
}
