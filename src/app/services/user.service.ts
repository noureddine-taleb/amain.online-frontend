import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ValidatorFn, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(data){
    return this.http.post('/login',data).pipe( tap(res => {
      localStorage.setItem('token',res["data"]);
    }) );
  }

  create(data){
    return this.http.post('/users',data);
  }

  isAuth(){
    return this.getAuthorizationToken() ? true : false;
  }
  
  logout(){
    localStorage.removeItem('token');
  }

  getAuthorizationToken(){
    return localStorage.getItem('token');
  }

  upload(data){
    return this.http.post('/upload',data);
  }

  public index(){
    return this.http.get('/users');
  }

  public passwordConfirmValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password').value;
    const confirmation = control.get('password_confirmation').value;
  
    return password === confirmation ? null : { 'confirmation': true };
  }

  public fileTypeValidator(RegExp: RegExp,el: HTMLElement): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if( (<HTMLInputElement>el).files[0]?.size > 3e6)
        return {"size" : true};

      return RegExp.test( control.value ) ? null : {"type" : true};
    }
  }
}
