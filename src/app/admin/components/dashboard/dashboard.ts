import { Component, OnInit } from '@angular/core';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from '../../../services/common/signal-r';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hub-url';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard extends Base implements OnInit
{
  constructor(spinner:NgxSpinnerService,private signalRService:SignalRService)
  {
    super(spinner)
    signalRService.start(HubUrls.ProductHub);
  }
   ngOnInit(): void {
    this.signalRService.on(ReceiveFunctions.ProdcutAddedMessage,(message)=>{alert(message)})
     this.showSpinner(SpinnerTypeNames.BallScaleMultiple);
   }
}
