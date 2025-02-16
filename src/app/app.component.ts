import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './core/components/side-nav/side-nav.component';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { LoginComponent } from './feature/components/login/login.component';
import { AuthCheckService } from './shared/services/auth-check.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SideNavComponent,
    ToolbarComponent,
    LoginComponent,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoggedIn = false;
  private authCheck = inject(AuthCheckService);
  ngOnInit() {
    if (this.authCheck.checkAuth()) {
      this.isLoggedIn = true;
    }
  }
  onLoginSuccess() {
    this.isLoggedIn = true;
  }
}
