import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastServiceService {
  private _snackBar = inject(MatSnackBar);

  showToast(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
