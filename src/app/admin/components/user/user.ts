import { Component, ViewChild } from '@angular/core';
import { List } from './list/list';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  @ViewChild(List) listComponent:List
    createUser()
    {
      this.listComponent.getUsers();

    }
}
