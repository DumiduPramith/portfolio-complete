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
export class TextBoxComponent implements ControlValueAccessor {
  @Input({ required: true }) type: string = 'text';
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) label: string = '';

  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  value: string = '';

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onInputChange(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
  }

  setDisabledState(isDisabled: boolean): void {
    const inputElement = this.el.nativeElement.querySelector('input');
    if (inputElement) {
      this.renderer.setProperty(inputElement, 'disabled', isDisabled);
    }
  }
}
