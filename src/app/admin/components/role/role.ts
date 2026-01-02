import { Component, ViewChild } from '@angular/core';
import { List } from './list/list';

@Component({
  selector: 'app-role',
  standalone: false,
  templateUrl: './role.html',
  styleUrl: './role.scss',
})
export class Role {
  @ViewChild(List) listComponent:List
   async createdRole(createdRole:string)
    {
      await this.listComponent.getRoles();

    }
}
