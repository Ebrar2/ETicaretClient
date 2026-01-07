import { CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../services/ui/custom-toastr';
import { inject, PLATFORM_ID } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypeNames } from '../base/base';
import { Auth } from '../services/common/auth';
import { isPlatformBrowser } from '@angular/common';



export const authGuard: CanActivateFn = (route, state) => {
  
  const jwtHelper:JwtHelperService = inject(JwtHelperService);
  const router:Router = inject(Router);
  const toastrService:CustomToastr = inject(CustomToastr);
  const spinner :NgxSpinnerService= inject(NgxSpinnerService);
  const authService:Auth=inject(Auth)
  const platformId: object= inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true; 
  }

//authService.identityCheck()
   if(!authService._isAuthenticated())       
   { 

    router.navigate(["/login"],{
        queryParams:{returnUrl:state.url}
       })
     
    toastrService.message("Giriş yapmalısınız","Hata",{
               messageType:ToastrMessageTypes.Warning,
               position:ToastrPositions.TopRight
              })
       
   }
    
   return true;
};
