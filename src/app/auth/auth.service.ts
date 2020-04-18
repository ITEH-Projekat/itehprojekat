import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthPodaciModel} from './auth-podaci.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {}

  private token: string;

  getToken() {
    return this.token;
  }

  createUser(email: string, password: string) {
    const user: AuthPodaciModel = {email, password};
    this.http.post('http://localhost:3000/api/users/signup', user)
      .subscribe(podaci => {
        console.log(podaci);
      });
  }

  login(email: string, password: string) {
    const user: AuthPodaciModel = {email, password};
    this.http.post<{token: string}>('http://localhost:3000/api/users/login', user)
      .subscribe(podaci => {
        const token = podaci.token;
        this.token = token;
      });
  }

}
