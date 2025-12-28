import { Component } from '@angular/core';
import { UserAuthService } from '../../../services/common/models/user-auth-service';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../../../services/ui/custom-toastr';

@Component({
  selector: 'app-password-reset',
  standalone: false,
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.scss',
})
export class PasswordReset extends Base{
  constructor(private authService:UserAuthService,spinner:NgxSpinnerService,private customToastrService:CustomToastr){
     super(spinner)
  }
  async resetPassword(email:HTMLInputElement)
  {
    this.showSpinner(SpinnerTypeNames.SquareJellyBox)
     await  this.authService.resetPassword(email.value,()=>{
        this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
        this.customToastrService.message("Mail Gönderildi!!","Şifre Yenileme Talebi",{
          messageType:ToastrMessageTypes.Info,
          position:ToastrPositions.TopRight
        })
     })
  }
}
