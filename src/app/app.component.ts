import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './core/components/side-nav/side-nav.component';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { LoginComponent } from './feature/components/login/login.component';
import { AuthCheckService } from './shared/services/auth-check.service';
import { ErrorService } from './core/services/error.service';
import { ErrorPageComponent } from './core/components/error-page/error-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SideNavComponent,
    ToolbarComponent,
    LoginComponent,
    ErrorPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoggedIn = false;
  private authCheck = inject(AuthCheckService);
  private errorService = inject(ErrorService);

  errorMessage$ = this.errorService.getErrorMessage();

  ngOnInit() {
    if (this.authCheck.checkAuth()) {
      this.isLoggedIn = true;
    }
  }
  onLoginSuccess() {
    this.isLoggedIn = true;
  }
}
