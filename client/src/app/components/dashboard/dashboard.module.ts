import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {CommonModule} from "@angular/common";
import {ProductService} from "../../services/products/product.service";
import {NewproductComponent} from "../products/newproduct/newproduct.component";
import {CategoriesComponent} from "../categories/categories/categories.component";
import {ProductsModule} from "../products/products.module";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {MatDividerModule} from "@angular/material/divider";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    RouterModule,
    SharedModule,
    MatDividerModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    ProductsModule,
    MatCardModule,
    MatDialogModule,
  ],
  declarations:[
    DashboardComponent
  ],
  providers:[
    ProductService
  ],
  entryComponents: [NewproductComponent, CategoriesComponent]
})
export class DashboardModule {}
