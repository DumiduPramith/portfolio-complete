import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-field',
  standalone: true,
  imports: [],
  templateUrl: './add-field.component.html',
  styleUrl: './add-field.component.scss',
})
export class AddFieldComponent {
  @Input({ required: true }) formArray!: FormArray;
  @Input({ required: true }) valueControllerName!: string | null;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) type!: string;

  onClick(input: HTMLInputElement) {
    const newValue = input.value.trim();
    if (newValue) {
      // this.visibleHideAll();
      let isValid = true;
      if (this.type === 'email') {
        const valueController = new FormControl(newValue, Validators.email);
        isValid = valueController.valid;
      }
      if (isValid && this.valueControllerName) {
        const position = this.formArray.length;
        this.formArray.push(
          new FormGroup({
            [this.valueControllerName]: new FormControl(newValue),
            isActive: new FormControl(true),
            index: new FormControl(position),
          })
        );
        input.value = '';
      } else {
        input.setCustomValidity('Invalid email');
        input.reportValidity();
      }
    }
    console.log(this.formArray);
  }

  visibleHideAll() {
    this.formArray.controls.forEach((control) => {
      control.get('isActive')?.setValue(false);
    });
  }
}
