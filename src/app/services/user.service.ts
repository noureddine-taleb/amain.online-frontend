import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ValidatorFn, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public phoneRegexp = /^(05|06|07)(\d{2}){4}$/
  public nameRegexp = /^[a-zA-Z ]+$/
  public imageRegexp = /\.jpe?g$/gi

  constructor(private http: HttpClient, private injector: Injector) { }

  login(data: User){
    return this.http.post('/login', data).pipe( tap(res => {
      localStorage.setItem('token',  res["data"]["token"] );
      localStorage.setItem('user', JSON.stringify( res["data"]["user"] ));
    })
    );
  }

  create(data: User){
    return this.http.post('/users',data);
  }

  isAuth(): boolean{
    return this.getAuthorizationToken() ? true : false;
  }
  
  isAdmin(): boolean{
    return !! JSON.parse(localStorage.getItem('user')).is_admin;
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user'));
  }
  
  logout(){
    localStorage.clear();
    this.injector.get(Router).navigate(["/auth", "login-form"]);
  }

  getAuthorizationToken(){
    return localStorage.getItem('token');
  }

  upload(data: File){

    let formData = new FormData();
    formData.append("image",data);
    return this.http.post('/upload', formData, { reportProgress: true , observe: 'events'});
  }

  public index(){
    return this.http.get('/users');
  }

  public bills(userId){
    return this.http.get(`/users/${userId}/bills`);
  }

  public matchValues(matchTo: string ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return (
        !!control.parent 
        && !!control.parent.value 
        && control.value === control.parent.controls[matchTo].value 
        ? null : { "confirmation": true }
        );
  };
}
  public fileValidator(RegExp: RegExp,el: HTMLElement): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if( (<HTMLInputElement>el).files[0]?.size > 3e6)
        return {"size" : true};

      return (RegExp.test( control.value ) ? null : {"type" : true});
    }
  }

  public getImage(url){
    
    return this.http.get(url,{ responseType: 'blob'});
  }
}
