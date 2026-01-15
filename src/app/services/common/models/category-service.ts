
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { firstValueFrom, Observable } from 'rxjs';
import { ListCategory } from '../../../contracts/categories/list_category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
   constructor(private httpClientService:HttpClientService)
   {

   }
   async getAll(page:number,pageSize:number,successCallback?:()=>void,errorCallback?:(errorMessage)=>void)
   {
     const obs = this.httpClientService.get<{ categories: ListCategory[], totalCount: number }>({
       controller: "categories",
       action: "getAllCategories",
       queryString:"page="+page+"&size="+pageSize
     })
     let data: { categories: ListCategory[], totalCount: number };
     await firstValueFrom(obs).then((d: { categories: ListCategory[], totalCount: number }) => {
       data = d
       successCallback()

     }).catch((errorMessage) => errorCallback(errorMessage))
     return data;
   }
   async create(name:string,successCallback?:()=>void,errorCallback?:(errorMessage)=>void)
   {
     await firstValueFrom(this.httpClientService.post({
       controller:"categories",
       action:"createCategory"
     },{name:name})).then(()=>successCallback()).catch((errorMessage)=>errorCallback(errorMessage))
   }
   async update(name:string,id:string,successCallback?:()=>void,errorCallback?:(errorMessage)=>void)
   {
     await firstValueFrom(this.httpClientService.put({
       controller:"categories"
     },{name:name,id:id})).then(()=>successCallback()).catch((errorMessage)=>errorCallback(errorMessage))
   }
}
