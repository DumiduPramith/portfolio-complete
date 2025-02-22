import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormBuilderService {
  fb = inject(FormBuilder);

  createFormGroup(data: any): FormGroup {
    const group = this.fb.group({});
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        group.addControl(key, this.createFormArray(data[key]));
      } else if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
        group.addControl(key, this.createFormGroup(data[key]));
      } else {
        group.addControl(key, new FormControl(data[key]));
      }
    });
    return group;
  }

  createFormArray(array: any[]): FormArray<FormGroup | FormControl> {
    const formArray = new FormArray<FormGroup | FormControl>([]); // Explicitly define the allowed types
    array.forEach((item) => {
      if (typeof item === 'object' && !Array.isArray(item)) {
        formArray.push(this.createFormGroup(item) as FormGroup);
      } else {
        formArray.push(new FormControl(item));
      }
    });
    return formArray;
  }
}
