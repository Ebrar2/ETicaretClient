import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationEndpointService {
  constructor(private httpClientService:HttpClientService){}

  async assignRoleEndpoints(roles:string[],code:string,menu:string,successCallBack?:()=>void,errorCallBack?:()=>void)
  {
      await firstValueFrom( this.httpClientService.post({
      controller:"authorizationEndpoints"
     },{roles:roles,code,menu:menu})).then(()=>successCallBack()).catch(()=>errorCallBack())
  }
  async getRolesToEndpoint(menu:string,code:string,successCallBack?:()=>void,errorCallBack?:()=>void):Promise<string[]>
  {
    const obs=this.httpClientService.get({
      controller:"authorizationEndpoints",
      queryString:"menu="+menu+"&code="+code
    })
    let data:string[]=[]
   await firstValueFrom(obs).then((d:{roles:string[]})=>{
      data=d.roles
      successCallBack()
    }).catch(()=>errorCallBack())
    return data
  }
}
