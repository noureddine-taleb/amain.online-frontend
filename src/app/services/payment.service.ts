import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  public index(){
    return this.http.get('/payments');
  }

  public create(data: Payment){
    return this.http.post('/payments',data);
  }
}
