import { Injectable } from '@angular/core';
import { CreateProduct } from '../../../contracts/products/create_product';
import { HttpClientService } from '../http-client';
import { Alertify } from '../../admin/alertify';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { ListProduct } from '../../../contracts/products/list_product';
import { ListProductImage } from '../../../contracts/products/list_product_image';
import { error } from 'console';

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
  async read(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage)=>void):Promise<{totalCount:number,products:ListProduct[],baseUrl:string}>
  {
    let data:{totalCount:number,products:ListProduct[],baseUrl:string}=null;
    await firstValueFrom(this.httpClient.get({
      controller:"product",
      queryString:`page=${page}&size=${size}`
     })).then((d:{totalCount:number,products:ListProduct[],baseUrl:string})=>{
      successCallBack()
      data=d;
      
    }
    ).catch((error:HttpErrorResponse)=>{
        errorCallBack(error.message)
     });
     
    return data;
  }
 async readProductImages(id:string,successCallBack?:any,errorCallBack?:any):Promise<ListProductImage[]>
  {
    const getValue:Observable<ListProductImage[]>= this.httpClient.get<ListProductImage[]>({
      action:"getProductImages",
      controller:"product"
     },id);
     return await firstValueFrom(getValue).then((d:ListProductImage[])=>{
      successCallBack()
      return d;
     }).catch((error:HttpErrorResponse)=>{
       return null;
     });
  }
 async deleteProductImage(productId:string,imageId:string,successCallBack?:any)
  {
    
       await firstValueFrom(
         this.httpClient.delete({
          action:"deleteProductImage",
          controller:"product",
          queryString:"imageId="+imageId
        },productId)).then(()=>{
          successCallBack()
        })
  }
  async changeShowcaseProductImage(imageId:string,productId:string,successCallBack?:any)
  {
      await firstValueFrom(
         this.httpClient.get({
          action:"changeShowcaseForProductImage",
          controller:"product",
          queryString:"imageId="+imageId+"&"+"productId="+productId
        })).then(()=>{
          successCallBack()
        })
  }
  async generateQRCode(productId:string)
  {
    const obs:Observable<Blob>=this.httpClient.get({
       controller:"product",
       action:"GenerateQRCodeToProduct",
       responseType:"blob"
     },productId)
     return await firstValueFrom(obs)
  }
  async changeProductStock(productId:string,stock:number,successCallBack?:()=>void,errorCallBack?:(error)=>void)
  {
    const obs=this.httpClient.put({
      controller:"product",
      action:"changeProductStock"
    },{id:productId,stock:stock})
     await firstValueFrom(obs).then(()=>successCallBack()).catch((error)=>errorCallBack(error))
  }
}
