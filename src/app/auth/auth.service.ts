import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthPodaciModel} from './auth-podaci.model';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';

export interface AuthResponse {
  // email: string;
  // id: string;
  token: string;
  // exp: number;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private router: Router) {}

  private token: string;
  private tokenExpirationTimer: any;

  // getToken() {
  //   if (!this.token) {
  //     this.token = localStorage.getItem('userData');
  //   }
  //   return this.token;
  // }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  createUser(email: string, password: string) {
    const user: AuthPodaciModel = {email, password};
    return this.http.post<AuthResponse>('http://localhost:3000/api/users/signup', user)
      .pipe(catchError(this.handleError), tap(data => {
          // this.handleAuthentication(data.email, data.id, data.token, data.exp);
          this.handleAuthentication(data.token);
      }));
  }

  login(email: string, password: string) {
    const user: AuthPodaciModel = {email, password};
    return this.http.post<AuthResponse>('http://localhost:3000/api/users/login', user)
      .pipe(catchError(this.handleError), tap(data => {
        // this.handleAuthentication(data.email, data.id, data.token, data.exp);
        this.handleAuthentication(data.token);
      }));
      // .subscribe(podaci => {
      //   const token = podaci.token;
      //   this.token = token;
      //   console.log(podaci);
      // });
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Nepoznata greska!';
    if (!errorResponse.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.message) {
      case 'Uneti podaci nisu korektni':
        errorMessage = 'Korisnik sa unetim podacima vec postoji';
        break;
      case 'Autentikacija nije uspela':
        errorMessage = 'Uneti podaci nisu odgovarajuci, molimo pokusajte ponovo';
        break;
    }

    return throwError(errorMessage);
  }

  private handleAuthentication(token: string) {
    const decoded = jwt_decode(token);
    console.log(decoded);
    const expirationDate = new Date(new Date().getTime() +  decoded.exp * 1000);

    const user = new User(decoded.email, decoded.userId, token, expirationDate);
    this.user.next(user);
    // this.autoLogout(decoded.exp * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
  //   const expirationDate = new Date( expiresIn * 1000);
  //   console.log('email: ' + email);
  //   console.log('id: ' + id);
  //   console.log('token: ' + token);
  //   console.log('expires in: ' + expiresIn);
  //   console.log('expirationDuration: ' + expirationDate);
  //   const user = new User(email, id, token, expirationDate);
  //   this.user.next(user);
  //   this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.getToken()) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      console.log('expirationDuration2: ' + expirationDuration);
      // this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

}
