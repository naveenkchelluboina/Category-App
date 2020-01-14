import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserService {

   selectedCategory= new Subject<any>();
  constructor() { }
}
