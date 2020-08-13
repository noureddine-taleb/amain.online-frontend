import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../../models/payment/payment';
import { CRUD } from '../../models/crud/crud';

@Injectable({
  providedIn: 'root'
})
export class PaymentService implements CRUD {

 _url = '/payments'
  constructor(private http: HttpClient) { }

  public getAll(query?){
    const queryParams = new URLSearchParams(query)
    return this.http.get(`${this._url}${queryParams.toString() && '?'}${queryParams}`)
  }

  public create(data: Payment){
    return this.http.post(this._url, data);
  }
}
