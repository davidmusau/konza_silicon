import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {NewproductComponent} from "./newproduct/newproduct.component";

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },{
    path:'newproduct',
    component:NewproductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
