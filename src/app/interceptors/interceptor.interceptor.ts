import { Injectable,Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
  
  newReq:HttpRequest<unknown>;

  constructor(private userService: UserService,private injector: Injector) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.newReq = req.clone({
      url: `${environment.api}${environment.apiVersion}${req.url}`,
      setHeaders: { 'Authorization': `Bearer ${this.userService.getAuthorizationToken()}`},
    });
    
    return next.handle(this.newReq).pipe(
      catchError((err:any) => {

        if(err instanceof HttpErrorResponse){
          
          let router = this.injector.get(Router);

          if(err.status == 401){
            this.userService.logout();
            router.navigate(["/auth/login-form"]);
          }
          else if(err.status == 404){
            router.navigate(["/404"]);
          }
          else if(err.status >= 500){
            router.navigate(["/500"]);
          }
        }

        return throwError(err)
      })
    );
  }
}
