import { Injectable } from '@angular/core';
import { CreateProduct } from '../../../contracts/products/create_product';
import { HttpClientService } from '../http-client';
import { Alertify } from '../../admin/alertify';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { ListProduct } from '../../../contracts/products/list_product';
import { ListProductImage } from '../../../contracts/products/list_product_image';
import { error } from 'console';
import { UpdateProductList } from '../../../contracts/products/update_product_list';
import { UpdateProduct } from '../../../contracts/products/update_product';
import { FilterProductItem } from '../../../ui/components/products/filter-product/filter-product';
import { FilterProductParameter } from '../../../ui/components/products/list/list';
import { GetProductDetails } from '../../../contracts/products/get_product_details';

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
  async read(page:number=0,size:number=5,filterProduct?:FilterProductParameter,successCallBack?:()=>void,errorCallBack?:(errorMessage)=>void):Promise<{totalCount:number,products:ListProduct[],baseUrl:string}>
  {
    let data:{totalCount:number,products:ListProduct[],baseUrl:string}=null;
    await firstValueFrom(this.httpClient.post<{}>({
      controller:"product",
      action:"getAll"
     // queryString:`page=${page}&size=${size}`
     },{page:page,size:size,filterCategories:filterProduct.filter?filterProduct.filter.categories:null,maxPrice:filterProduct.filter?filterProduct.filter.price:null
      ,isAscending:filterProduct.filter?filterProduct.filter.isAscending:null,
      name:filterProduct.name
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
  async getById(id:string,successCallBack?:()=>void,errorCallBack?:(error)=>void):Promise<UpdateProductList>
  {
   const obs=this.httpClient.get<UpdateProductList>({
      controller:"product",
    },id)
    let data:UpdateProductList;
     await firstValueFrom(obs).then((d)=>{
      data=d
      successCallBack()} ).catch((error)=>errorCallBack(error))
    return data;

  }
  async updateProduct(product:Partial<UpdateProduct>,successCallBack?:()=>void,errorCallBack?:(error)=>void)
  {
      const obs=this.httpClient.put({
      controller:"product",
    },product)
     await firstValueFrom(obs).then((d)=>{
      successCallBack()} ).catch((error)=>errorCallBack(error))

  }
  async getProductDetails(id:string)
  {
     const getValue:Observable<GetProductDetails>= this.httpClient.get<GetProductDetails>({
      action:"getProductDetails",
      controller:"product"
     },id);
     return await firstValueFrom(getValue)
  }
}
