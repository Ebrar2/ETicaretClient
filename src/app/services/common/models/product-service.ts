import { Injectable } from '@angular/core';
import { CreateProduct } from '../../../contracts/create-product';
import { HttpClientService } from '../http-client';
import { Alertify } from '../../admin/alertify';
import { HttpErrorResponse } from '@angular/common/http';

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
}
