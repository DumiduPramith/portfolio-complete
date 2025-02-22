import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faEyeSlash,
  faGripVertical,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss',
})
export class SkillCardComponent {
  @Input({ required: true }) skillFormGroup!: FormGroup;
  @Input({ required: true }) skillFormArray!: FormArray;

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faTrash = faTrash;
  faGripVertical = faGripVertical;

  toggleVisibility(formGroup: FormGroup) {
    const isVisibleControl = formGroup.get('isActive');
    isVisibleControl?.setValue(!isVisibleControl.value);
  }

  removeSkill(formGroup: FormGroup) {
    const index = this.skillFormArray.controls.indexOf(formGroup);
    this.skillFormArray.removeAt(index);

    // re-index the form array
    this.skillFormArray.controls.forEach((control, i) => {
      (control as FormGroup).patchValue({ index: i });
    });
  }

  get iconUrl(): FormControl {
    return this.skillFormGroup.get('iconUrl')?.value;
  }

  get name(): FormControl {
    return this.skillFormGroup.get('name')?.value;
  }

  get description(): FormControl {
    return this.skillFormGroup.get('description')?.value;
  }
}
