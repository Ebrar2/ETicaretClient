import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../services/common/models/application-service';
import { Action, Menu } from '../../../contracts/application-configurations/menu';
import { Console } from 'console';
import { Dialog } from '../../../services/common/dialog';
import { AuthorizeMenuDialog, AuthorizeMenuDialogState } from '../../../dialogs/authorize-menu-dialog/authorize-menu-dialog';

@Component({
  selector: 'app-authorize-menu',
  standalone: false,
  templateUrl: './authorize-menu.html',
  styleUrl: './authorize-menu.scss'
})
export class AuthorizeMenu implements OnInit {
  constructor(private applicationService:ApplicationService,private change:ChangeDetectorRef,private dialogService:Dialog){}


 dataSource: TreeNode[] = [];


  async ngOnInit() {
    const menus = await this.applicationService.getAuthorizedDefinitionEndpoints();

    this.dataSource = menus.map(menu => ({
      label: menu.name,
      children: menu.actions.map(action => ({
        label: action.definition,
        code:action.code
      }))
    }));
     this.change.detectChanges()
  }

  childrenAccessor = (node: TreeNode) => node.children ?? [];

  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;

  assignRole(code:string,name:string)
  {
    this.dialogService.openDialog({
      compenent:AuthorizeMenuDialog,
      data:{code:code,name:name},
       options:{
        width:'1400px'
      }
    })
  }
}
export interface TreeNode {
  label: string;
  children?: TreeNode[];
  code?:string;
}
