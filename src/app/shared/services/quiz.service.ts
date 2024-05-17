import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }
  getAllData(path:any){
   return this.http.get<any>(path).pipe();
  }
  getAllCategory(){
    return this.http.get<any>( `assets/category.json`).pipe();
   }
}
