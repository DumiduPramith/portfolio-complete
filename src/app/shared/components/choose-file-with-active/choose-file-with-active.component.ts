import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-choose-file-with-active',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './choose-file-with-active.component.html',
  styleUrl: './choose-file-with-active.component.scss',
})
export class ChooseFileWithActiveComponent {
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) accept: string = '';
  @Input({ required: true }) formGroup!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;

  oldValue: any = '';

  onFileChange(event: any) {
    this.oldValue = this.formGroup.get(this.id)?.value;
    const file = event.target.files[0];
    if (file) {
      this.formGroup.get(this.id)?.setValue(file);
      this.formGroup.get('isChanged')?.setValue(true);
    }
  }
  faTimes = faTimes;
  clearFileInput() {
    this.formGroup.get(this.id)?.setValue(this.oldValue);

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
