import {
  Component,
  ElementRef,
  forwardRef,
  inject,
  Input,
  Renderer2,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-text-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextBoxComponent),
      multi: true,
    },
  ],
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.scss',
})
export class TextBoxComponent {
  @Input({ required: true }) type: string = 'text';
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) label: string = '';
  @Input() required: boolean = false;
  @Input({ required: true }) formControl_!: FormControl;

  value: string = '';
}
