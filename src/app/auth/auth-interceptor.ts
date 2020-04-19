import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = this.authService.getToken();
    // const modifiedReq = req.clone({
    //   headers: req.headers.set('Authorization', 'Beared ' + token)
    // });
    // return next.handle(modifiedReq);
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.getToken())});
        // const modifiedReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + user.getToken())})
        return next.handle(modifiedReq);
      }));
  }

}
