import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorMessageSubject = new BehaviorSubject<string | null>(null);
  private lastState = null;

  setError(message: string, lastState: any) {
    this.lastState = lastState;
    this.errorMessageSubject.next(message);
  }

  clearError() {
    this.errorMessageSubject.next(null);
  }

  getErrorMessage() {
    return this.errorMessageSubject.asObservable();
  }

  getLastState() {
    return this.lastState;
  }
}
