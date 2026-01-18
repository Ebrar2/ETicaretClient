import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from '../../../services/common/signal-r';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hub-url';
import { Alertify, MessageType, Position } from '../../../services/admin/alertify';
import Chart from 'chart.js/auto'
import { ListDashboardData } from '../../../contracts/orders/list_dashboard_datas';
import { DashboardService } from '../../../services/common/models/dashboard-service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard extends Base implements OnInit 
{

  months=[5,8,10];

  constructor(spinner:NgxSpinnerService,private signalRService:SignalRService,private alertify:Alertify,private dashboardService:DashboardService)
  {
  
    super(spinner)
  
  
     
  }
   month:number=5;
  async ngOnInit(){
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
     await this.getDashboardDatas()

  }
  async getDashboardDatas()
  {
      const datas=await this.dashboardService.getDashboardDatas(this.month);
      this.data=datas
      console.log(datas)
      this.createChart();
  }
  data:ListDashboardData[]
  chart:Chart;
  createChart() {
  if (this.chart) {
    this.chart.destroy();
  }
   this.chart= new Chart('acquisitions', {
      type: 'bar',
      data: {
        labels:this.data.map(x => x.month),
        datasets: [
          {
            label: 'Aylık Satış Grafiği',
            data:this.data.map(x => x.revenue),
            backgroundColor: '#0d6efd'
          },  {
            label: 'Ürün Sayısı',
            data:this.data.map(x => x.totalProductCount),
            backgroundColor: '#0dfd99'
          }
        ]
      }
    });

  }
  setDropDownValue(item:number)
  {
     this.month=item
     this.getDashboardDatas()
  }

}


