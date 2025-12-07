import { ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from '../../../services/common/models/user-service';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Auth } from '../../../services/common/auth';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login extends Base {

  constructor(private userService:UserService, spinner:NgxSpinnerService,private changeDetectator:ChangeDetectorRef,private authService:Auth, private activatedRoute: ActivatedRoute, private router: Router)
  {
   super(spinner)
  }
 async LoginUser(usernameOrEmail:string,password:string)
  {
    this.showSpinner(SpinnerTypeNames.SquareJellyBox);
     await this.userService.login(usernameOrEmail,password,()=>{
  this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe(param=>{
        const returnUrl:string= param["returnUrl"]

        if(returnUrl)
        {
          this.router.navigate([returnUrl])
        }
        else
        {
          this.router.navigate(["/admin"])
        }
      });
      this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
     }) 
         
   }
}
