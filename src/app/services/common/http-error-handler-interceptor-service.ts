import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../ui/custom-toastr';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor{
  constructor(private toastrService:CustomToastr){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch(error.status)
      {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Bu işlemi yapmaya yetkiniz yoktur!!","Yetkisiz İşlem", {
            messageType:ToastrMessageTypes.Warning,
            position:ToastrPositions.BottomFullWidth
          });
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
           this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir!!","Hata", {
            messageType:ToastrMessageTypes.Warning,
            position:ToastrPositions.BottomFullWidth
          });
          break;

      }
      return of(error)
    }))
  }
  
}
