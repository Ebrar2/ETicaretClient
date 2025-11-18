import { Component, OnInit } from '@angular/core';
import { Alertify, MessageType, Position } from '../../services/admin/alertify';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit{
  constructor(private alertifyService:Alertify){

  }
   ngOnInit(): void {
    this.alertifyService.message("mesaj",{
      messageType: MessageType.Warning,
      position:Position.BottomRight});
   }
}
