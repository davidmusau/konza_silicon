import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth-guard.service";

const routes: Routes = [
  {
    path:'dashboard',
    redirectTo:'/dashboard',
    pathMatch: 'full'
  },
  // {
  //   path: 'login',
  //   loadChildren: async () => ( await import('./auth/auth.module')).AuthModule
  // },
  {
    path:'dashboard',
    loadChildren:async () =>  ( await import('./components/dashboard/dashboard.module')).DashboardModule,
    canActivate: [AuthGuard]
  },
  {
    path:'category',
    loadChildren:async ()=> (await import('./components/categories/categories.module')).CategoriesModule,
    canActivate: [AuthGuard]

  },{
  path:'products',
    loadChildren:async ()=> ( await import('./components/products/products.module')).ProductsModule,
    canActivate: [AuthGuard]

  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
