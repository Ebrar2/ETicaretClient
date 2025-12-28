import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginUserResponse } from '../../../contracts/users/login_user_response';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../../ui/custom-toastr';
import { SocialUser } from '@abacritt/angularx-social-login';
import { LoginTypeName } from '../../../contracts/login_type_name';
import { HttpError } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
    constructor(private httpClient: HttpClientService,private toastrService:CustomToastr) {
  
    }
    async login(usernameOrEmail:string,password:string,callback:()=>void)
  {
    const result=this.httpClient.post<LoginUserResponse|{ usernameOrEmail:string,password:string}>({
      controller:"auth",
      action:"login"
    },{usernameOrEmail,password});
     const token= await firstValueFrom(result) as LoginUserResponse;
    if(token.succeeded)
    {
       localStorage.setItem("accessToken",token.accessToken);
      localStorage.setItem("loginTypeName",LoginTypeName.Standart);
       localStorage.setItem("refreshToken",token.refreshToken);
       this.toastrService.message(token.message,"Başarılı",{
        messageType:ToastrMessageTypes.Success,
        position:ToastrPositions.TopRight
       })

    }
    else
    {
         this.toastrService.message(token.message,"Hata",{
        messageType:ToastrMessageTypes.Error,
        position:ToastrPositions.TopRight
       })
    }

    callback()
  }
  async loginWithRefreshToken(refreshToken:string)
  {
    const result=this.httpClient.post<LoginUserResponse|string>({
      controller:"auth",
      action:"loginWithRefreshToken"
    },{refreshToken});
     const token=await firstValueFrom(result) as LoginUserResponse;
    if(token.succeeded)
    {
      localStorage.setItem("accessToken",token.accessToken);
      localStorage.setItem("refreshToken",token.refreshToken);
   return true;
    }
    return false;
  
  }
 async loginWithGoogle(user:SocialUser,callback?)
 {
    const result=this.httpClient.post<SocialUser|LoginUserResponse>({
      controller:"auth",
      action:"loginWithGoogle"
    },user);
   const token= await firstValueFrom(result) as LoginUserResponse;
   if(token.succeeded){
    localStorage.setItem("accessToken",token.accessToken);
    localStorage.setItem("refreshToken",token.refreshToken);
    localStorage.setItem("loginTypeName",LoginTypeName.Google);
    this.toastrService.message(token.message,"Başarılı", {
      messageType:ToastrMessageTypes.Success,
      position:ToastrPositions.TopRight
    })
   }
   else
   {
    this.toastrService.message(token.message,"Hata",{
      messageType:ToastrMessageTypes.Error,
      position:ToastrPositions.TopRight
    })
   }
   callback();
 }
 async resetPassword(email:string,callback?:()=>void)
 {
  await firstValueFrom(this.httpClient.post(
    {
      controller:"auth",
      action:"resetPassword"
    },{email}
  ))
  callback()
 }
 async verifyResetToken(userId:string,resetToken:string,callback?:()=>void):Promise<boolean>
 {
  const observable=this.httpClient.post<{isVerified} | {userId,resetToken}>({
    controller:"auth",
    action:"verifyResetToken"
  },{userId,resetToken});
  let state:{isVerified:boolean}=await firstValueFrom(observable) as {isVerified:boolean}
   callback() 

   return state.isVerified as boolean
 
 }
 
}
