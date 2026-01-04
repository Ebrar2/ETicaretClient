import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { ListRole } from '../../contracts/roles/list_role';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../services/common/models/role-service';
import { UserService } from '../../services/common/models/user-service';
import { Alertify, MessageType, Position } from '../../services/admin/alertify';
import { MatSelectionList } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypeNames } from '../../base/base';

@Component({
  selector: 'app-authorize-user-dialog',
  standalone: false,
  templateUrl: './authorize-user-dialog.html',
  styleUrl: './authorize-user-dialog.scss',
})
export class AuthorizeUserDialog extends BaseDialog<AuthorizeUserDialog> implements OnInit {
   allRoles:{roles:ListRole[],totalCount:number};
   allSelecteds:string[];
   constructor(dialogRef:MatDialogRef<AuthorizeUserDialog>,@Inject(MAT_DIALOG_DATA)public data:string,
    private roleService:RoleService,
    private userService:UserService,
    private alertService:Alertify,
     private spinner:NgxSpinnerService){
    super(dialogRef)
   }
 async ngOnInit():Promise<void> {
   this.spinner.show(SpinnerTypeNames.BallScaleMultiple)
    this.allRoles=await this.roleService.getAllRoles(-1,-1,()=>{
    },()=>{})
    this.allSelecteds=await this.userService.getRolesToUser(this.data,()=>{},()=>{})
    this.spinner.hide(SpinnerTypeNames.BallScaleMultiple)
    console.log(this.allSelecteds)
    console.log(this.allRoles)
  }
 async assignRole(roles:MatSelectionList)
  {
   let allSelectedRoles:string[]=[];
  roles.selectedOptions.selected.forEach(role=>allSelectedRoles.push(role.value))
   await this.userService.assignRoleToUser(allSelectedRoles,this.data,()=>{
    this.alertService.message("Rol ekleme işlemi tamamlandı",{
      messageType:MessageType.Success,
      position:Position.TopRight
    })
   },()=>{
     this.alertService.message("Rol ekleme işlemi başarısız",{
      messageType:MessageType.Error,
      position:Position.TopRight
    })
   })

  }
  isSelected(name:string)
  {
   let result=  this.allSelecteds.some(m=>m===name)
   return result
  }
}
