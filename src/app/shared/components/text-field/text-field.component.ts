import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutoResizeTextareaDirective } from '../../directives/auto-resize-textarea.directive';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [ReactiveFormsModule, AutoResizeTextareaDirective],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
})
export class TextFieldComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) formController!: FormControl;
}
