import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { firstValueFrom } from 'rxjs';
import { CreateOrder } from '../../../contracts/orders/create_order';
import { ListOrder } from '../../../contracts/orders/list_order';
import { HttpErrorResponse } from '@angular/common/http';

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
  
    async getOrders(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage)=>void):Promise<{totalCount:number,orders:ListOrder[]}>
  {
    let data:{totalCount:number,orders:ListOrder[]}=null;
    await firstValueFrom(this.httpClient.get({
      controller:"orders",
      queryString:`page=${page}&size=${size}`
     })).then((d:{totalCount:number,orders:ListOrder[],baseUrl:string})=>{
      successCallBack()
      data=d;
      
    }
    ).catch((error:HttpErrorResponse)=>{
        errorCallBack(error.message)
     });
     
    return data;
  }
}
