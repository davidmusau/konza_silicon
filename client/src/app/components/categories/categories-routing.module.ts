import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesComponent} from "./categories/categories.component";
import {NewcategoryComponent} from "./newcategory/newcategory.component";

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },{
    path:'newcategory',
    component:NewcategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
