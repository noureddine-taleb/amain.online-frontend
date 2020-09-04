import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {

  newReq: HttpRequest<unknown>;

  constructor(private userService: UserService, private injector: Injector) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let url: string

    if(req.url != "/graphql"){
      url = `${environment.BACKEND_API_URL}${req.url}`
    }else {
      url = `${environment.BACKEND_URL}${req.url}`
    }

    this.newReq = req.clone({
      url,
      setHeaders: { Authorization: `Bearer ${this.userService.getAuthorizationToken()}`},
    });

    return next.handle(this.newReq).pipe(
      catchError((err: any) => {

        if (err instanceof HttpErrorResponse){

          const router = this.injector.get(Router);

          if (err.status == 401){
            this.userService.logout()
            router.navigate(['auth'])
          }
        }

        return throwError(err)
      })
    );
  }
}
