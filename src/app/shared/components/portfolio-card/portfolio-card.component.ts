import { Component, inject, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faEyeSlash,
  faGripHorizontal,
} from '@fortawesome/free-solid-svg-icons';
import { FormUtilService } from '../../services/form-util.service';

@Component({
  selector: 'app-portfolio-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './portfolio-card.component.html',
  styleUrl: './portfolio-card.component.scss',
})
export class PortfolioCardComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) formArray_!: FormArray;

  formUtilService = inject(FormUtilService);

  faGripHorizontal = faGripHorizontal;

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  getControllersAsString(formArray: FormArray): string {
    return formArray.controls
      .map(
        (control: AbstractControl) => (control as FormGroup).get('name')?.value
      )
      .filter((name: string | undefined) => name !== undefined)
      .join(', ');
  }

  toggleVisibility() {
    if (!this.formGroup.disabled) {
      const isVisibleControl = this.formGroup.get('isActive');
      isVisibleControl?.setValue(!isVisibleControl.value);
    }
  }

  onDelete() {
    this.formArray_.removeAt(
      this.formArray_.controls.findIndex(
        (control) => control === this.formGroup
      )
    );
  }

  onUpdate() {}
}
