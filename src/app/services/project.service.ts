import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient ) { }

  index(){
    return this.http.get('/projects');
  }

  create(data: Project){
    return this.http.post('/projects',data);
  }
}
