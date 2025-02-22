import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-skill-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-skill-card.component.html',
  styleUrl: './update-skill-card.component.scss',
})
export class UpdateSkillCardComponent {
  @Input({ required: true }) FormArray!: FormArray;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  fb = inject(FormBuilder);
  cardFormGroup = this.createCardFormGroup();
  formGroupArrayStatusSubscription: Subscription = Subscription.EMPTY;

  createCardFormGroup() {
    return this.fb.group({
      name: [''],
      description: [''],
      iconUrl: [''],
      isActive: [true],
      index: [0],
    });
  }

  ngAfterViewInit() {
    this.formGroupArrayStatusSubscription =
      this.FormArray.statusChanges.subscribe(() => {
        if (this.FormArray.status === 'DISABLED') {
          this.cardFormGroup.disable();
        } else {
          this.cardFormGroup.enable();
        }
      });
  }

  addCard() {
    const nextIndex = this.FormArray.length;
    this.cardFormGroup.patchValue({ index: nextIndex });
    this.FormArray.push(this.cardFormGroup);

    this.clearCard();
    this.cardFormGroup = this.createCardFormGroup();
  }

  clearCard() {
    this.fileInput.nativeElement.value = '';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.cardFormGroup.patchValue({ iconUrl: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
