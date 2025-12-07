import { Injectable, Signal, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private jwtHelper:JwtHelperService){}
  _isAuthenticated=signal<boolean>(false);
  
  identityCheck()
  {
   
  const token:string=localStorage.getItem("accessToken");
   let expired:boolean;
    try{
      expired=this.jwtHelper.isTokenExpired(token)
    }
    catch
    {
      expired=true;
    }
  this. _isAuthenticated.set(token!=null && !expired);

  }
}
