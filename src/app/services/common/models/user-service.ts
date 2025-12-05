
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { UserRegister } from '../../../entities/userRegister';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUserResponse } from '../../../contracts/users/create_user_response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClientService) {

  }

  async create(user: UserRegister):Promise<CreateUserResponse> {
     const result=this.httpClient.post< CreateUserResponse| UserRegister>({
      controller: "users"
    }, user);
    return await firstValueFrom(result) as CreateUserResponse;
   
  }
  async login(usernameOrEmail:string,password:string)
  {
    return await firstValueFrom(this.httpClient.post({
      controller:"users",
      action:"login"
    },{usernameOrEmail,password}))
  }

}
