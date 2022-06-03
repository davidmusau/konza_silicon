import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../authservice/auth.service";
import {Injectable} from "@angular/core";
import {switchMap} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthTokenInterceptors implements HttpInterceptor{
  jwtHelper = new JwtHelperService()

  constructor(private  authService:AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    if (req.url.indexOf("refresh_token")> -1){
      return next.handle(req)
    }

   // let userData = this.authService.userInfo.getValue();
    let userData = this.authService.userInfo.value
    console.log('userdata', userData);
    if (userData && userData.userid){
      //expiration of user token
      if (Date.now()< Number(userData.tokenExpiration) * 1000){
        const newReq = req.clone({
            setHeaders: {
              'Content-Type' : 'application/json',
               'Authorization' : `Bearer  ${userData.access_token}`
            }
          },

        //   {
        //   headers: req.headers.set('Authorization', `bearer ${userData.access_token}`)
        // }
        );
       // console.log('Authentication token',newReq)
        return next.handle(newReq);

      }
      //get refresh token from the server
      const tokenPayload ={
        access_token:userData.access_token,
        token_refresh: userData.refresh_token
      }
      return this.authService.callRefreshToken(tokenPayload)
        .pipe(
          switchMap((newTokenPayload: any)=>{
            localStorage.setItem("access_token",newTokenPayload.access);
            localStorage.setItem("refresh_token",newTokenPayload.refresh);
            const decryptUser = this.jwtHelper.decodeToken(newTokenPayload.access)
            const data = {
              access_token: newTokenPayload.access,
              refresh_token: newTokenPayload.refresh,
              username: decryptUser.email,
              userid: decryptUser.user_id,
              tokenExpiration: decryptUser.exp
            };
            this.authService.userInfo.next(data)

//resume a previous request
            const newReq = req.clone({
              setHeaders: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer realm=  '${userData.access_token}'`
              }
             // headers: req.headers.set('Authorization', `bearer ${newTokenPayload.access_token}`)
            });

            return next.handle(newReq);

          })
        )
    }

    return next.handle(req);
  }

}
