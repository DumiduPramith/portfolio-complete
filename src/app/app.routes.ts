import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { loginGuardGuard } from './shared/guards/login-guard.guard';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [loginGuardGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Home',
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./core/components/about/about.component').then(
            (m) => m.AboutComponent
          ),
        title: 'About',
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./core/components/portfolio/portfolio.component').then(
            (m) => m.PortfolioComponent
          ),
        title: 'Portfolio',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./feature/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./feature/components/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      ),
  },
];
