import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from  '../Categories';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {



  apiURL="http://localhost:5555/categories";
  
  constructor(private http:HttpClient) {
  }
 
  ngOnInit()
  {}

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

  getChapters(): Observable<Categories> {
    return this.http.get<Categories>(this.apiURL)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
 }
