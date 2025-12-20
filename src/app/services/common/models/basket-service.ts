import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { defaultIfEmpty, firstValueFrom } from 'rxjs';
import { ListBasketItems } from '../../../contracts/baskets/list_basketItems';
import { CreateBasketItem } from '../../../contracts/baskets/create_basketItem';
import { UpdateQuantityBasketItem } from '../../../contracts/baskets/update_quantity_basketItem';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';


@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private httpClientService:HttpClientService) {}
  async  getBasketItems():Promise<ListBasketItems[]>
  {
   return await firstValueFrom( this.httpClientService.get({
      controller:"baskets"
    }))
  }
  async addBasketItem(createBasketItem:Partial<CreateBasketItem>)
  {
    await firstValueFrom(this.httpClientService.post({


     controller:"baskets"

    },createBasketItem));
  }
  async updateQuantityBasketItem(updateQuantityBasketItem:Partial<UpdateQuantityBasketItem>)
  {
    await firstValueFrom(this.httpClientService.put({
      controller:"baskets"
    },updateQuantityBasketItem));
  }
  async deleteBasketItem(basketItemId:string)
  {
   await firstValueFrom(this.httpClientService.delete({
    controller:"baskets"
   },basketItemId));
  }
}
