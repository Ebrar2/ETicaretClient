import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './admin/layout/layout';
import { Dashboard } from './admin/components/dashboard/dashboard';
import { Home } from './ui/components/home/home';
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  {path:"admin",component:Layout,children:[
    {path:"",component:Dashboard,canActivate:[authGuard]},
    {path:"customers",loadChildren:()=>import("./admin/components/customer/customer-module").then(module=>module.CustomerModule),canActivate:[authGuard]},
    {path:"orders",loadChildren:()=>import("./admin/components/order/order-module").then(module=>module.OrderModule),canActivate:[authGuard]},
    {path:"products",loadChildren:()=>import("./admin/components/products/products-module").then(module=>module.ProductsModule),canActivate:[authGuard]}    
  ],canActivate:[authGuard]
  },
  {path:"",component:Home},
  {path:"basket",loadChildren:()=>import("./ui/components/baskets/baskets-module").then(m=>m.BasketsModule)},
  {path:"products",loadChildren:()=>import("./ui/components/products/products-module").then(m=>m.ProductsModule)},
  {path:"products/:pageNo",loadChildren:()=>import("./ui/components/products/products-module").then(m=>m.ProductsModule)},
  {path:"register",loadChildren:()=>import("./ui/components/register/register-module").then(m=>m.RegisterModule)},
  {path:"login",loadChildren:()=>import("./ui/components/login/login-module").then(m=>m.LoginModule)},
  {path:"password-reset",loadChildren:()=>import("./ui/components/password-reset/password-reset-module").then(m=>m.PasswordResetModule)},
  {path:"password-update/:userId/:resetToken",loadChildren:()=>import("./ui/components/password-update/password-update-module").then(m=>m.PasswordUpdateModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
