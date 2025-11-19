import { Component, OnInit, signal } from '@angular/core';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from './services/ui/custom-toastr';
import { Position } from './services/admin/alertify';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('ETicaretClient');
  constructor(private toastrService:CustomToastr)
  {
  

  }
  ngOnInit(): void {
     
  }
}
