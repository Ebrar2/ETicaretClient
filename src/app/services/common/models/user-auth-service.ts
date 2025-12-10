import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginUserResponse } from '../../../contracts/users/login_user_response';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../../ui/custom-toastr';
import { SocialUser } from '@abacritt/angularx-social-login';
import { LoginTypeName } from '../../../contracts/login_type_name';
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
 async loginWithGoogle(user:SocialUser,callback)
 {
    const result=this.httpClient.post<SocialUser|LoginUserResponse>({
      controller:"auth",
      action:"loginWithGoogle"
    },user);
   const token= await firstValueFrom(result) as LoginUserResponse;
   if(token.succeeded){
    localStorage.setItem("accessToken",token.accessToken);
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
}
