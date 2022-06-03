import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Product} from "../../models/product";
import {environment} from "../../../environments/environment";
import {catchError, map, retry} from "rxjs/operators";
import {AuthService} from "../authservice/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private authService:AuthService) {
  }

  //get all products list

  productList(): Observable<Product[]> {
    return this.http.get<any>(environment.apiUrl + '/products/product-list').pipe(map(res => res.results as Product[]), catchError(this.handleError))
  }

  //add a single product
  addProduct(data: { images: any; quantity: any; price: any; description: any; title: any; category: any }): Observable<any> {

    return this.http.post<any>(environment.apiUrl + '/products/product-create',data, this.authService.getHttpOptions())
      .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  /***
   * Upload image function
   * **/
   uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<any>(environment.apiUrl + '/fileupload/upload-image', formData, this.authService.getHttpOptions())
  }





  /***
   * Error handling
   * **/
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
