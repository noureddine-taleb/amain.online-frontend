import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill } from '../../core/models/bill/bill';
import { CRUD } from '../../core/models/crud/crud';

@Injectable({
  providedIn: 'root'
})
export class BillService implements CRUD {

 _url = '/bills'
  constructor(private http: HttpClient) { }

  public getAll(query?: any){
    const queryParams = new URLSearchParams(query)
    return this.http.get(`${this._url}${queryParams.toString() && '?'}${queryParams}`);
  }

  public create(data: Bill){
    return this.http.post(this._url, data);
  }

  public download(id: string){
    return this.http.get(`${this._url}/${id}?pdf=true`, { responseType : 'blob' });
  }
}
