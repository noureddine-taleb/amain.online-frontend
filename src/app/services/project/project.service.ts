import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../models/project/project';
import { CRUD } from '../../models/crud/crud';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements CRUD{

  _url = '/projects'
  constructor(private http: HttpClient ) { }

  public getAll(query?: any){
    const queryParams = new URLSearchParams(query)
    return this.http.get(`${this._url}?${queryParams}`)
  }

  public create(data: Project){
    return this.http.post(this._url, data);
  }
}
