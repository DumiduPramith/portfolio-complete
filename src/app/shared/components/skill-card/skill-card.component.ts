import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faEyeSlash,
  faGripVertical,
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
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faGripVertical = faGripVertical;

  ngOnInit() {
    console.log(this.skillFormGroup);
  }

  toggleVisibility(formGroup: FormGroup) {
    const isVisibleControl = formGroup.get('isActive');
    isVisibleControl?.setValue(!isVisibleControl.value);
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
