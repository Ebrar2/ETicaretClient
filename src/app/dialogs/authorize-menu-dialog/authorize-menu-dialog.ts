import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListRole } from '../../contracts/roles/list_role';
import { RoleService } from '../../services/common/models/role-service';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-authorize-menu-dialog',
  standalone: false,
  templateUrl: './authorize-menu-dialog.html',
  styleUrl: './authorize-menu-dialog.scss',
})
export class AuthorizeMenuDialog extends BaseDialog<AuthorizeMenuDialog> implements OnInit{
   allRoles:{roles:ListRole[],totalCount:number};
   constructor(dialogRef:MatDialogRef<AuthorizeMenuDialog>,@Inject(MAT_DIALOG_DATA)public data:{code:string,name:string},
    private roleService:RoleService){
    super(dialogRef)
   }
 async ngOnInit() {
    const result:{roles:ListRole[],totalCount:number}=await this.roleService.getAllRoles(-1,-1,()=>{},()=>{})
    this.allRoles=result
  }
  assignRole(roles:MatSelectionList)
  {
    console.log(roles._value)
  }
  
}
export enum AuthorizeMenuDialogState
{
  Yes,No
}