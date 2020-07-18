import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill } from '../models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  public index(){
    return this.http.get('/bills');
  }

  public create(data: Bill){
    return this.http.post('/bills', data);
  }

  public download(id){
    return this.http.get(`/bills/${id}?pdf=true`,{ responseType : 'blob' });
  }
}
