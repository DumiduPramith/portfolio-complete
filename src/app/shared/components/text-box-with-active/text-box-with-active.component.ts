import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-box-with-active',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-box-with-active.component.html',
  styleUrl: './text-box-with-active.component.scss',
})
export class TextBoxWithActiveComponent {
  @Input({ required: true }) type: string = 'text';
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) formGroup_!: FormGroup;
  @Input({ required: true }) formControlName_!: string;
}
