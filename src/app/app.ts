import { AfterViewInit, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from './services/ui/custom-toastr';
import { Position } from './services/admin/alertify';
import { Auth } from './services/common/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(private toastrService:CustomToastr,protected authService:Auth,private router:Router,private changet:ChangeDetectorRef)
  {
    authService.identityCheck();
  }
  ngOnInit(): void {
    this.authService.identityCheck();

  }
  signOut()
  {

    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""])
    this.toastrService.message("Çıkış Yapılmıştır","Çıkış",{
      messageType:ToastrMessageTypes.Warning,
      position:ToastrPositions.TopRight
    })
  }
}
