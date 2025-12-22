import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AdminModule } from './admin/admin-module';
import { UiModule } from './ui/ui-module';
import { ToastrModule } from 'ngx-toastr';
import { Base } from './base/base';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {JwtModule}from '@auth0/angular-jwt'
import { GoogleLoginProvider, GoogleSigninButtonModule, SOCIAL_AUTH_CONFIG, SocialLoginModule } from '@abacritt/angularx-social-login';
import { Login } from './ui/components/login/login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor-service';
import { DynamicLoadComponenetDirective } from './directives/common/dynamic-load-componenet-directive';
import { CdkNoDataRow } from "@angular/cdk/table";
@NgModule({
  declarations: [
    App,Login, DynamicLoadComponenetDirective
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    SocialLoginModule, GoogleSigninButtonModule,
    HttpClientModule, JwtModule.forRoot({
        config: {
            tokenGetter: () => localStorage.getItem("accessToken"),
            allowedDomains: ["localhost:7160"]
        }
    }),
    CdkNoDataRow
],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    {provide:"baseUrl",useValue:"https://localhost:7160/api",multi:true},
    {provide:"baseSignalRUrl",useValue:"https://localhost:7160/",multi:true},
    {provide:SOCIAL_AUTH_CONFIG,
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("319438112970-qvb0of57h0uuuqh33nh3v2fd0da1cjsc.apps.googleusercontent.com",{
              prompt:'select_account'
            })
          }
        ],
        onError: err => console.log(err)
      }},
      {provide:HTTP_INTERCEPTORS,useClass:HttpErrorHandlerInterceptorService,multi:true}
  ],
  bootstrap: [App]
})
export class AppModule { }
