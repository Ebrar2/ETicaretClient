import { Injectable } from '@angular/core';
import { CreateProduct } from '../../../contracts/create_product';
import { HttpClientService } from '../http-client';
import { Alertify } from '../../admin/alertify';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ListProduct } from '../../../contracts/list_product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient:HttpClientService)
  {

  }
  create(product:CreateProduct,successCallBack?:any,errorCallBack?:(errorMessage:string)=>void)
  {
      this.httpClient.post({
        controller:"product"
      },product).subscribe(
     result=>{
      successCallBack()
     },(errorResponse:HttpErrorResponse)=>{
      const _error:Array<{key:string,value:Array<string>}>=errorResponse.error
      let message="";

      _error.forEach(element => {
        element.value.forEach((_v,index)=>{
          message+=`${_v}<br>`
        })});
        errorCallBack(message);
     });
  }
  async read(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage)=>void):Promise<{totalCount:number,products:ListProduct[]}>
  {
    let data:{totalCount:number,products:ListProduct[]}=null;
    await firstValueFrom(this.httpClient.get({
      controller:"product",
      queryString:`page=${page}&size=${size}`
     })).then((d:{totalCount:number,products:ListProduct[]})=>{
      successCallBack()
      data=d;
    }
    ).catch((error:HttpErrorResponse)=>{
        errorCallBack(error.message)
     });
     
      return data;
  }
}
