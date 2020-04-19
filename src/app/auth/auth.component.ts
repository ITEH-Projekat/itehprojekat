import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponse, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<AuthResponse>

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.createUser(email, password);
    }
    authObs.subscribe(podaci => {
      console.log(podaci);
      this.router.navigate(['/nekretnine']);
    }, errorMessage => {
      this.error = errorMessage;
    });
    authForm.resetForm();
  }
}
