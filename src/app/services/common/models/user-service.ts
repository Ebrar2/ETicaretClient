
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { UserRegister } from '../../../entities/userRegister';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUserResponse } from '../../../contracts/users/create_user_response';
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

}
