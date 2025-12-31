import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client';
import { firstValueFrom } from 'rxjs';
import { Menu } from '../../../contracts/application-configurations/menu';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private httpClinetService:HttpClientService){

  }
  async getAuthorizedDefinitionEndpoints():Promise<Menu[]>
  {
   return  await firstValueFrom(this.httpClinetService.get<Menu[]>({
      controller:"applicationServices",
    })) 
  }
}
