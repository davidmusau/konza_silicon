import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {AuthRouteModule} from "./auth-route.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {AuthService} from "../services/authservice/auth.service";
import {AuthGuard} from "../guards/auth-guard.service";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations:[
    LoginComponent],
  imports:[
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
    FormsModule,
    AuthRouteModule,
    MatCheckboxModule
  ],
  providers:[AuthService,AuthGuard,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}

  ]
})
export class AuthModule{
  constructor() {
  }
}
