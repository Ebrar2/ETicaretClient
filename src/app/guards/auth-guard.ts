import { CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../services/ui/custom-toastr';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypeNames } from '../base/base';
import { Auth } from '../services/common/auth';



export const authGuard: CanActivateFn = (route, state) => {
  
  const jwtHelper:JwtHelperService = inject(JwtHelperService);
  const router:Router = inject(Router);
  const toastrService:CustomToastr = inject(CustomToastr);
  const spinner :NgxSpinnerService= inject(NgxSpinnerService);
  const authService:Auth=inject(Auth)
   spinner.show(SpinnerTypeNames.BallScaleMultiple)
authService.identityCheck()
   if(!authService._isAuthenticated())       
   { spinner.hide(SpinnerTypeNames.SquareJellyBox)
    router.navigate(["/login"],{
        queryParams:{returnUrl:state.url}
       })
     
    toastrService.message("Giriş yapmalısınız","Hata",{
               messageType:ToastrMessageTypes.Warning,
               position:ToastrPositions.TopRight
              })
       
   }
    
  spinner.hide(SpinnerTypeNames.BallScaleMultiple)
   return true;
};
