import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUD } from '../../models/crud/crud';

@Injectable({
  providedIn: 'root'
})
export class ReportService implements CRUD{

  _url = '/reports'
  constructor(private http: HttpClient ) { }

  public getAll(){
    return this.http.get(this._url);
  }
}
