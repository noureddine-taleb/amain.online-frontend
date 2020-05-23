import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  public index(){
    return this.http.get('/bills');
  }

  public create(data){
    return this.http.post('/bills', data);
  }

  public download(id){
    return this.http.get(`/bills/${id}?pdf=true`,{ responseType : 'blob' });
  }
}
