import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {catchError, map} from "rxjs/operators";

export interface TokenData{
  refresh:string
  access:string
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService()

   constructor( private httpClient: HttpClient,  private  router: Router) {
    this.loadUserInfo();
  }
  /**
   * User login
   * email and password
   * ***/
   userLogin(user:User):Observable<boolean | any>{

     return this.httpClient.post<TokenData>(environment.apiUrl + '/auth/login/', user)
      .pipe(
        map(
           (receivedData: TokenData) => {
            if (receivedData) {
              localStorage.setItem("access_token", receivedData.access);
              localStorage.setItem("refresh_token", receivedData.refresh);
              const decryptUser = this.jwtHelper.decodeToken(receivedData.access)
              const data = {
                access_token: receivedData.access,
                refresh_token: receivedData.refresh,
                username: decryptUser.email,
                userid: decryptUser.user_id,
                tokenExpiration: decryptUser.exp
              };
              this.getHttpOptions();
             this.userInfo.next(data);
             return true;
            }
            return false;

          }
        )
      );
  }



  /***
   *
   * Get user information
   * **/

async loadUserInfo(){
  const userData = await this.userInfo.getValue();
    if(!userData){
      const accessToken =await  localStorage.getItem("access_token");
      const refreshToken = await localStorage.getItem("refresh_token");

      if (accessToken) {
        const decryptUser = await this.jwtHelper.decodeToken(accessToken)
        const data = {
          access_token: accessToken,
          refresh_token: refreshToken,
          username: decryptUser.email,
          userid: decryptUser.user_id,
          tokenExpiration: decryptUser.exp
        };
        await  this.userInfo.next(data)
      }
    }
}

/***
 *
 * Get refresh token
 * **/

callRefreshToken(tokenPayload: any):Observable<any>{
  return this.httpClient.post(environment.apiUrl+'auth/login/refresh/',tokenPayload)

}

  /***
   *
   * Remove token from memory
   * **/
  async removeToken(){
    await localStorage.removeItem("access_token")
    await localStorage.removeItem("refresh_token")
    return true;
  }
  /***
   *
   * Logout user
   * **/

  async logout() {
    await this.userInfo.next(null);
    //remove token
    await this.removeToken();
    await this.router.navigate(['/login']);
    return true;
  }

  /**
   * check if user is logged in
   * **/


  userAuthenticated(): boolean{
    const accessToken =  localStorage.getItem("access_token")
    return accessToken != null
  }

  getHttpOptions(){
     return {
      headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }

      )
    }
  }


}
