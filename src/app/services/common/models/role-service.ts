import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { firstValueFrom, retry } from 'rxjs';
import { ListRole } from '../../../contracts/roles/list_role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
   constructor(private httpClient:HttpClientService){

   }
  async getAllRoles(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(error)=>void):Promise<{totalCount:number,roles:ListRole[]}>
   {
    let data:{totalCount:number,roles:ListRole[]};
   await firstValueFrom(this.httpClient.get<{totalCount:number,roles:ListRole[]}>({
      controller:"roles",
      action:"getAllRoles",
      queryString:`page=${page}&size=${size}`
    })).then((d:{totalCount:number,roles:ListRole[]})=>{
      data=d
      successCallBack()
    }).catch((error)=>errorCallBack(error))
    return data
   }
    async getRoleById(id:string):Promise<ListRole>
   {
    return await firstValueFrom(this.httpClient.get<ListRole>({
      controller:"roles",
      action:"getRoleById"
    },id))
   }
   async createRole(name:string,successCallBack?:(result)=>void,errorCallBack?:()=>void)
   {  
       return await firstValueFrom(this.httpClient.post({
        controller:"roles",
        action:"createRole"
       },{name:name})).then((result)=>successCallBack(result)).catch(()=>errorCallBack())
   }
   async updateRole(id:string,name:string,successCallBack?:()=>void,errorCallBack?:()=>void)
   {
      return await firstValueFrom(this.httpClient.put({
        controller:"roles",
        action:"updateRole"
       },{id:id,name:name})).then(()=>successCallBack()).catch(()=>errorCallBack())
   }
    async deleteRole(name:string)
   {
      return await firstValueFrom(this.httpClient.delete({
        controller:"roles",
        action:"deleteRole"
       },name))
   }
}
