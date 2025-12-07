
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { UserRegister } from '../../../entities/userRegister';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUserResponse } from '../../../contracts/users/create_user_response';
import { LoginUserResponse } from '../../../contracts/users/login_user_response';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../../ui/custom-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClientService,private toastrService:CustomToastr) {

  }

  async create(user: UserRegister):Promise<CreateUserResponse> {
     const result=this.httpClient.post< CreateUserResponse| UserRegister>({
      controller: "users"
    }, user);
    return await firstValueFrom(result) as CreateUserResponse;
   
  }
  async login(usernameOrEmail:string,password:string,callback:()=>void)
  {
    const result=this.httpClient.post<LoginUserResponse|{ usernameOrEmail:string,password:string}>({
      controller:"users",
      action:"login"
    },{usernameOrEmail,password});
     const token= await firstValueFrom(result) as LoginUserResponse;
    if(token.succeeded)
    {
       localStorage.setItem("accessToken",token.accessToken);
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

}
