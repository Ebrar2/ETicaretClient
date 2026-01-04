
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { UserRegister } from '../../../entities/userRegister';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUserResponse } from '../../../contracts/users/create_user_response';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../../ui/custom-toastr';
import { error } from 'console';
import { ListUser } from '../../../contracts/users/list_user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClientService,private toastrService:CustomToastr) {

  }
  async getAllUsers(page:number,size:number,successCallBack?:()=>void,errorCallBack?:(error)=>void)
  {
     const obs=this.httpClient.get({
      controller:"users",
      queryString:"page="+page+"&size="+size
     })
     const promise= firstValueFrom(obs);
     promise.then(()=>successCallBack()).catch((error)=>errorCallBack(error)) 
     return await promise as {users:ListUser[],totalCount:number}
  }
  async create(user: UserRegister):Promise<CreateUserResponse> {
     const result=this.httpClient.post< CreateUserResponse| UserRegister>({
      controller: "users"
    }, user);
    return await firstValueFrom(result) as CreateUserResponse;
   
  }
 async updatePassword(newPassword:string,userId:string,resetToken:string,successCallBack?:()=>void,errorCallBack?:(error)=>void)
 {
    const observable=this.httpClient.post({
      controller:"users",
      action:"updatePassword"
    },{password:newPassword,userId:userId,resetToken:resetToken})
     await firstValueFrom(observable).then(()=>successCallBack()).catch((error)=>errorCallBack(error))
 }
 async getRolesToUser(id:string,successCallBack?:()=>void,errorCallBack?:(error)=>void):Promise<string[]>
 {
   const observable=this.httpClient.get({
      controller:"users",
      action:"getRolesToUser"
    },id)
    let roles:string[]=[]
    await firstValueFrom(observable) .then((data: {roles:string[]})=>{
        roles=data.roles
       successCallBack()}).catch((error)=>errorCallBack(error))
   return roles

 }
 async assignRoleToUser(roles:string[],id:string,successCallBack?:()=>void,errorCallBack?:(error)=>void)
 {
     const observable=this.httpClient.post({
      controller:"users",
      action:"assignRoleToUser"
    },{id:id,roles:roles})
    await firstValueFrom(observable).then(()=>{
       successCallBack()}).catch((error)=>errorCallBack(error))
 }
}
