import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  @Output() createUser:EventEmitter<any>=new EventEmitter();

  create()
  {
        this.createUser.emit()

  }
}
