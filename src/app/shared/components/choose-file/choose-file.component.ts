import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImageUtilService } from '../../services/image-util.service';

@Component({
  selector: 'app-choose-file',
  standalone: true,
  imports: [],
  templateUrl: './choose-file.component.html',
  styleUrl: './choose-file.component.scss',
})
export class ChooseFileComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) accept!: string;
  @Input({ required: true }) formControl_!: FormControl;
  @ViewChild('fileInput') fileInput!: ElementRef;

  private formControlSubscription = Subscription.EMPTY;
  private imageUtilService = inject(ImageUtilService);

  ngOnInit() {
    this.clearFileInput();
    this.formControlSubscription = this.formControl_.valueChanges.subscribe(
      (value) => {
        if (value === null) {
          this.clearFileInput();
        }
      }
    );
  }

  onFileChange($event: any) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formControl_.setValue(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  clearFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  ngOnDestroy() {
    this.formControlSubscription.unsubscribe();
  }
}
