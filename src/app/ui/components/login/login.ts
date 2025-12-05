import { Component } from '@angular/core';
import { UserService } from '../../../services/common/models/user-service';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login extends Base {

  constructor(private userService:UserService, spinner:NgxSpinnerService)
  {
   super(spinner)
  }
 async LoginUser(usernameOrEmail:string,password:string)
  {
    this.showSpinner(SpinnerTypeNames.SquareJellyBox);
     await this.userService.login(usernameOrEmail,password).then(()=>{
      this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
     });
  }
}
