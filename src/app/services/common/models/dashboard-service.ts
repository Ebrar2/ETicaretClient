import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { firstValueFrom, Observable } from 'rxjs';
import { ListDashboardData } from '../../../contracts/orders/list_dashboard_datas';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private httpClientService:HttpClientService)
     {
  
     }
   async getDashboardDatas(month:number)
  {
    const observable=this.httpClientService.get<ListDashboardData[]>({
      controller:"dashboard",
      queryString:"month="+month
    });
    return firstValueFrom(observable)

  }
}
