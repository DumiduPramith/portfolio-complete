import { Component, inject } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
})
export class ErrorPageComponent {
  private errorService = inject(ErrorService);
  private errorServiceSubscription = Subscription.EMPTY;

  errorMessage: string | null = '';

  ngOnInit() {
    this.errorService.getErrorMessage().subscribe((message) => {
      this.errorMessage = message;
    });
  }

  reload() {
    const lastState = this.errorService.getLastState();
    if (lastState) {
      this.errorService.clearError();
    }
  }

  ngOnDestroy() {
    if (this.errorServiceSubscription) {
      this.errorServiceSubscription.unsubscribe();
    }
  }
}
