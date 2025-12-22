import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { firstValueFrom } from 'rxjs';
import { CreateOrder } from '../../../contracts/orders/create_order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient:HttpClientService)
  {

  }
 async createOrder( createOrder:CreateOrder)
  {
    await firstValueFrom(this.httpClient.post({
      controller:"orders"
    },createOrder))
  }
}
