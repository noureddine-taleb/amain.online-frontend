import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  public index(){
    return this.http.get('/payments');
  }

  public create(data){
    return this.http.post('/payments',data);
  }

  public delete(id){
    return this.http.delete(`/payments/${id}`);
  }
}
