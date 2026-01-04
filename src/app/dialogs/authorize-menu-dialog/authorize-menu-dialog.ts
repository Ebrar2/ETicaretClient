import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListRole } from '../../contracts/roles/list_role';
import { RoleService } from '../../services/common/models/role-service';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { AuthorizationEndpointService } from '../../services/common/models/authorization-endpoint-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypeNames } from '../../base/base';
import { Alertify, MessageType, Position } from '../../services/admin/alertify';

@Component({
  selector: 'app-authorize-menu-dialog',
  standalone: false,
  templateUrl: './authorize-menu-dialog.html',
  styleUrl: './authorize-menu-dialog.scss',
})
export class AuthorizeMenuDialog extends BaseDialog<AuthorizeMenuDialog> implements OnInit{
   allRoles:{roles:ListRole[],totalCount:number};
   allSelecteds:string[];
   constructor(dialogRef:MatDialogRef<AuthorizeMenuDialog>,@Inject(MAT_DIALOG_DATA)public data:{code:string,name:string,menu:string},
    private roleService:RoleService,
    private authorizeEndpointService:AuthorizationEndpointService,
    private changeRef:ChangeDetectorRef,
    private spinnerService:NgxSpinnerService,
    private alertService:Alertify){
    super(dialogRef)
   }
 async ngOnInit():Promise<void> {
    this.allRoles=await this.roleService.getAllRoles(-1,-1,()=>{},()=>{})
    this.allSelecteds=await this.authorizeEndpointService.getRolesToEndpoint(this.data.menu,this.data.code,()=>{

    },()=>{

    })
  }
 async assignRole(roles:MatSelectionList)
  {
   let allSelectedRoles:string[]=[];
  roles.selectedOptions.selected.forEach(role=>allSelectedRoles.push(role.value))
   await this.authorizeEndpointService.assignRoleEndpoints(allSelectedRoles,this.data.code,this.data.menu,()=>{
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
export enum AuthorizeMenuDialogState
{
  Yes,No
}