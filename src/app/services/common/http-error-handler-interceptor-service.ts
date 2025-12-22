import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../ui/custom-toastr';
import { UserAuthService } from './models/user-auth-service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypeNames } from '../../base/base';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor{
  constructor(private toastrService:CustomToastr,private userAuthService:UserAuthService,private router:Router,private spinner:NgxSpinnerService){}
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch(error.status)
      {
        case HttpStatusCode.Unauthorized:
          if(localStorage.getItem("refreshToken"))
          {
            this.userAuthService.loginWithRefreshToken(localStorage.getItem("refreshToken")).then((state)=>{
            console.log(state)
          if(!state)
          {
            const url = this.router.url;
            if (url == "/products") {
              this.toastrService.message("Sepete ürün ekleme işlemi başarısız.Lütfen Oturum Açınız!!!", "Oturum Açınız", {
                messageType: ToastrMessageTypes.Warning,
                position: ToastrPositions.TopRight
              })
            }
            else {
             // localStorage.removeItem("accessToken");
              //localStorage.removeItem("refreshToken");
              if (url == "/products") {
                this.toastrService.message("Oturum Açınız!!!", "Oturum Açınız", {
                  messageType: ToastrMessageTypes.Warning,
                  position: ToastrPositions.TopRight
                })
              }
            }
          }

         });
          }
          else
          {
              const url = this.router.url;
            if (url == "/products") {
              this.toastrService.message("Sepete ürün ekleme işlemi başarısız.Lütfen Oturum Açınız!!!", "Oturum Açınız", {
                messageType: ToastrMessageTypes.Warning,
                position: ToastrPositions.TopRight
              })
            }
            else {
              if (url == "/products") {
                this.toastrService.message("Oturum Açınız!!!", "Oturum Açınız", {
                  messageType: ToastrMessageTypes.Warning,
                  position: ToastrPositions.TopRight
                })
              }
            }
          }
          break;
        case HttpStatusCode.InternalServerError:
           this.toastrService.message("Sunucuya erişilemiyor!!","Sunucu Hatası", {
            messageType:ToastrMessageTypes.Warning,
            position:ToastrPositions.BottomFullWidth
          });
          break;
        case HttpStatusCode.BadRequest:
           this.toastrService.message("Geçersiz istek yapıldı!!","Geçersiz istek", {
            messageType:ToastrMessageTypes.Warning,
            position:ToastrPositions.BottomFullWidth
          });
          break;
        case HttpStatusCode.NotFound:
           this.toastrService.message("Sayfa bulunamadı!!","Sayfa bulunamadı", {
            messageType:ToastrMessageTypes.Warning,
            position:ToastrPositions.BottomFullWidth
          });
          break;
        default:
          if(error.status!=0)
          {
              this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir!!","Hata", {
            messageType:ToastrMessageTypes.Warning,
            position:ToastrPositions.BottomFullWidth
          });
          }
          break;

      }
      
      return of(error)
    }))
  }
  
}
