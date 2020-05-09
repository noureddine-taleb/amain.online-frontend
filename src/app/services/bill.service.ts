import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  index(){
    return this.http.get('/bills');
  }

  create(data){
    return this.http.post('/bills', data);
  }
}
