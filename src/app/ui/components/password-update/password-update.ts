import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/common/models/user-service';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../../../services/ui/custom-toastr';

@Component({
  selector: 'app-password-update',
  standalone: false,
  templateUrl: './password-update.html',
  styleUrl: './password-update.scss',
})
export class PasswordUpdate extends Base{
  form:FormGroup;
   constructor(private formBuilder:FormBuilder,spinner:NgxSpinnerService,private authService:UserAuthService,
    private activatedRoute:ActivatedRoute,
    private changer:ChangeDetectorRef,
    private userService:UserService,
    private toastr:CustomToastr,
    private router:Router
   )
   {
     super(spinner)
   }
   state:boolean
   userId:string
   resetToken:string
   ngOnInit(): void {
  
   

      this.activatedRoute.params.subscribe(async params=>{
        this.showSpinner(SpinnerTypeNames.SquareJellyBox);
     this.userId=params["userId"]
     this. resetToken=params["resetToken"]
     this.state=await this.authService.verifyResetToken(this.userId,this.resetToken,()=>{
        this.hideSpinner(SpinnerTypeNames.SquareJellyBox);
     
      })
        this.changer.detectChanges()
      }
      )
  
     this.form=this.formBuilder.group({
      password:["",[Validators.required]],
      confirmPassword:["",[Validators.required]]
     },{
       validators:(group:AbstractControl):ValidationErrors|null=>{
        let password=group.get("password").value;
        let confirmPassword=group.get("confirmPassword").value;
        return password==confirmPassword?null:{notSame:true}
       }
     })
   }
   get component()
   {
    return this.form.controls;
 
   }
   submitted: boolean = false;
  async onSubmit(newPassword:ResetPassword) {
    this.submitted = true;

    if (this.form.invalid)
     {
          return
     }
     this.showSpinner(SpinnerTypeNames.SquareJellyBox)
   await this.userService.updatePassword(newPassword.password,this.userId,this.resetToken,()=>{
     this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
     this.toastr.message("Şifre değiştirme işlemi başarılı","Şifre Değiştirme",{
      messageType:ToastrMessageTypes.Success,
      position:ToastrPositions.TopRight
     })
    this.router.navigate(["/login"])
   },(error)=>{
     this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
     this.toastr.message(error,"Şifre Değiştirme",{
      messageType:ToastrMessageTypes.Error,
      position:ToastrPositions.TopRight
     })
 
   })
  }
}
export class ResetPassword
{
    password:string
    passwordConfirm:string
}