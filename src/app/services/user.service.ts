import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(data){

    return this.http.post('http://api.amain.test/login',data);
  }
  register(data){
    
    return this.http.post('http://api.amain.test/register',data,{ headers: {'Content-Type' : "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2) } });
  }
}
