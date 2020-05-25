import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ValidatorFn, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private injector: Injector) { }

  login(data){
    return this.http.post('/login', data).pipe( tap(res => {
      localStorage.setItem('token',  res["data"]["token"] );
      localStorage.setItem('user', JSON.stringify( res["data"]["user"] ));
    })
    );
  }

  create(data){
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

  upload(data){
    return this.http.post('/upload', data, { reportProgress: true , observe: 'events'});
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
