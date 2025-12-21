import { AfterViewInit, ChangeDetectorRef, Component, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from './services/ui/custom-toastr';
import { Position } from './services/admin/alertify';
import { Auth } from './services/common/auth';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { LoginTypeName } from './contracts/login_type_name';
import { ComponenetName, DynamicLoadComponenetService } from './services/common/dynamic-load-componenet-service';
import { DynamicLoadComponenetDirective } from './directives/common/dynamic-load-componenet-directive';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {

  @ViewChild(DynamicLoadComponenetDirective,{static:true})
  dynamicLoadComponentDirective:DynamicLoadComponenetDirective;
  constructor(private socialAUthService:SocialAuthService,private toastrService:CustomToastr,protected authService:Auth,private router:Router,
    private changet:ChangeDetectorRef,
    private dynamicLoadComponenetService:DynamicLoadComponenetService)
  {
    authService.identityCheck();
  }
  ngOnInit(): void {
    this.authService.identityCheck();

  }
  signOut()
  {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    if(LoginTypeName.Google==localStorage.getItem("loginTypeName"))
     {
          this.socialAUthService.signOut();
     }
    this.authService.identityCheck();
    this.router.navigate([""])
    this.toastrService.message("Çıkış Yapılmıştır","Çıkış",{
      messageType:ToastrMessageTypes.Warning,
      position:ToastrPositions.TopRight
    })
  }
  loadBasketComponent()
  {
    this.dynamicLoadComponenetService.loadComponenet(ComponenetName.BasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef)

  }
}
