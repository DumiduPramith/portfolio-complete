import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faEyeSlash,
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, DragDropModule],
  templateUrl: './drag-list.component.html',
  styleUrl: './drag-list.component.scss',
})
export class DragListComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faGripVertical = faGripVertical;

  @Input({ required: true }) formArray!: FormArray;
  @Input({ required: true }) valueControllerName!: string;
  @Input({ required: true }) label!: string;
  @Input() activeOne: boolean = false;

  toggleVisibility(profession: AbstractControl) {
    if (this.formArray.disabled) {
      return;
    }
    const isVisibleCOntrol = profession.get('isActive');
    if (this.activeOne) {
      this.visibleHideAll();
      isVisibleCOntrol?.setValue(true);
    } else {
      isVisibleCOntrol?.setValue(!isVisibleCOntrol.value);
    }
  }

  visibleHideAll() {
    this.formArray.controls.forEach((control) => {
      control.get('isActive')?.setValue(false);
    });
  }

  deleteProfession(index: number) {
    this.formArray.removeAt(index);
    this.updatePositions();
    if (this.activeOne && this.formArray.length > 0) {
      this.formArray.controls[0].get('isActive')?.setValue(true);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    // Update the form array order
    moveItemInArray(
      this.formArray.controls,
      event.previousIndex,
      event.currentIndex
    );

    this.updatePositions();
  }

  private updatePositions() {
    this.formArray.controls.forEach((control, index) => {
      control.patchValue({ index: index }, { emitEvent: false });
    });
  }

  ngOnInit() {
    console.log(this.formArray);
  }
}
