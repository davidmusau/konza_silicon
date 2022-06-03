import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/authservice/auth.service";
import {AuthTokenInterceptors} from "./services/Interceptors/auth.token.interceptors";
import {AuthGuard} from "./guards/auth-guard.service";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SharedModule} from "./shared/shared.module";

@NgModule({
    declarations: [
        AppComponent
    ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    MatSidenavModule



  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptors,
    multi: true
  },
    AuthService,AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
}
