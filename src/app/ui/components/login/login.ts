import {  Component } from '@angular/core';
import { UserService } from '../../../services/common/models/user-service';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Auth } from '../../../services/common/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleLoginProvider, GoogleSigninButtonModule, SOCIAL_AUTH_CONFIG, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';
import { UserAuthService } from '../../../services/common/models/user-auth-service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
  
})
export class Login extends Base {

  constructor(private userAuthService:UserAuthService, spinner:NgxSpinnerService,private authService:Auth, private activatedRoute: ActivatedRoute, 
    private router: Router,
    private socialAuthService:SocialAuthService)
  {
   super(spinner)
   socialAuthService.authState.subscribe(async(user:SocialUser)=>{
        if(user)
        {
            this.showSpinner(SpinnerTypeNames.SquareJellyBox)
            await userAuthService.loginWithGoogle(user,()=>{
            this.authService.identityCheck();
            this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
     })
        }
   })
  }
  
 async LoginUser(usernameOrEmail:string,password:string)
  {
    this.showSpinner(SpinnerTypeNames.SquareJellyBox);
     await this.userAuthService.login(usernameOrEmail,password,()=>{
  this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe(param=>{
        if(this.authService._isAuthenticated)
        {
            const returnUrl:string= param["returnUrl"]

          if(returnUrl)
          {
            this.router.navigate([returnUrl])
          }
        
        }
      });
      this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
     }) 
         
   }
}
