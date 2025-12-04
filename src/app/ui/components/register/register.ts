import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { group } from 'console';
import { UserService } from '../../../services/common/models/user-service';
import { UserRegister } from '../../../entities/userRegister';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../../../services/ui/custom-toastr';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  form:FormGroup;
   constructor(private formBuilder:FormBuilder,private userService:UserService,private toastrService:CustomToastr)
   {

   }
   ngOnInit(): void {
     this.form=this.formBuilder.group({
      nameSurname:["",[Validators.required,Validators.maxLength(100),Validators.minLength(3)]],
      userName:["",[Validators.required,Validators.maxLength(100),Validators.minLength(3)]],
      email:["",[Validators.required,Validators.email]],
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
  async onSubmit(user: UserRegister) {
    this.submitted = true;

    if (this.form.invalid)
     {
          return
     }
    const result = await this.userService.create(user);
    if(result.succeeded){
         this.toastrService.message(result.message,"Başarılı",{
          messageType:ToastrMessageTypes.Success,
          position:ToastrPositions.TopRight
         })
    }
    else
    {
       this.toastrService.message(result.message,"HATA",{
        messageType:ToastrMessageTypes.Error,
        position:ToastrPositions.TopRight
       })
    }
  }
}
