import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Category} from "../../models/category";
import {environment} from "../../../environments/environment";
import {catchError, map, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  /** getall category **/

  categoryList(): Observable<Category[]> {
    return this.http.get<any>(environment.apiUrl + '/category/category-list').pipe(map(res => res.results as Category[]), catchError(this.handleError))
  }

  /** post/add new category **/
  addCategory(name: string): Observable<Category> {
    let params = new HttpParams().set('name', name);
    return this.http.post<any>(environment.apiUrl + '/category/create-category', params)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )

  }


  /** Error handling **/
  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      /**  Get client-side error **/
      errorMessage = error.error.message;
    } else {
      /**  Get server-side error **/
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
