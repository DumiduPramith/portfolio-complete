import { Component, EventEmitter, inject, Output } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private LoginService = inject(LoginService);
  private router = inject(Router);
  private LoginServiceSubscription: Subscription = Subscription.EMPTY;

  loginData = { email: '', password: '' };
  errorMessage!: string;
  @Output() OnSuccessLogin = new EventEmitter();

  onClickLogin() {
    this.errorMessage = '';
    this.LoginServiceSubscription = this.LoginService.login(
      this.loginData.email,
      this.loginData.password
    ).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.OnSuccessLogin.emit();
        this.router.navigate(['/']);
      },
      error: (error) => {
        if (error.error instanceof ErrorEvent) {
          console.log('Frontend Error: ', error.error.message);
        } else {
          this.errorMessage = error.error.message;
        }
      },
      complete: () => {
        // console.log('complete');
      },
    });
  }

  onDestroy() {
    if (this.LoginServiceSubscription) {
      this.LoginServiceSubscription.unsubscribe();
    }
  }
}
