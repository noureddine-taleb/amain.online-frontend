import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Treasury } from '../../models/treasury/treasury';
import { CRUD } from '../../models/crud/crud';

@Injectable({
  providedIn: 'root'
})
export class TreasuryService implements CRUD {
  
  _url = '/treasuries'
  constructor(private http: HttpClient ) { }

  public create(data: Treasury){
    return this.http.post(this._url, data);
  }
}
