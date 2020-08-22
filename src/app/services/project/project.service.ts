import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../core/models/project/project';
import { CRUD } from '../../core/models/crud/crud';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements CRUD{

  _url = '/projects'
  constructor(private http: HttpClient ) { }

  public getAll(query?: any){
    const queryParams = new URLSearchParams(query)
    return this.http.get(`${this._url}${queryParams.toString() && '?'}${queryParams}`)
  }

  public create(data: Project){
    return this.http.post(this._url, data);
  }
}
