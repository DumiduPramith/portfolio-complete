import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilService {
  checkDisabled(control: AbstractControl, parentKey: string = '') {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach((key) => {
        this.checkDisabled(
          control.controls[key],
          parentKey ? `${parentKey}.${key}` : key
        );
      });
    } else if (control instanceof FormArray) {
      control.controls.forEach((childControl, index) => {
        this.checkDisabled(childControl, `${parentKey}[${index}]`);
      });
    } else {
      console.log(`${parentKey} is disabled: `, control.disabled);
    }
  }

  disableForm(control: AbstractControl, emitEvent: boolean = true) {
    if (control instanceof FormGroup || control instanceof FormArray) {
      // Disable the group/array itself
      control.disable({ emitEvent });

      // Recursively disable all children
      Object.values(control.controls).forEach((childControl) => {
        this.disableForm(childControl, false);
      });
    } else {
      // Disable individual FormControl
      control.disable({ emitEvent });
    }
  }

  enableForm(control: AbstractControl, emitEvent: boolean = true) {
    if (control instanceof FormGroup || control instanceof FormArray) {
      // Enable the group/array itself
      control.enable({ emitEvent });

      // Recursively enable all children
      Object.values(control.controls).forEach((childControl) => {
        this.enableForm(childControl, false);
      });
    } else {
      // Enable individual FormControl
      control.enable({ emitEvent });
    }
  }

  getFormArray(control: any): FormArray {
    return control as FormArray;
  }

  getFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  getFormControl(control: any): FormControl {
    return control as FormControl;
  }
}
