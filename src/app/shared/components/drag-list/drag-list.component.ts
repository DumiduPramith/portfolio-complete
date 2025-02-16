import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
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

  @Input() professions!: FormArray;

  toggleVisibility(profession: AbstractControl) {
    const isVisibleCOntrol = profession.get('isActive');
    isVisibleCOntrol?.setValue(!isVisibleCOntrol.value);
  }

  deleteProfession(index: number) {
    this.professions.removeAt(index);
    this.updatePositions();
  }

  drop(event: CdkDragDrop<string[]>) {
    // Update the form array order
    moveItemInArray(
      this.professions.controls,
      event.previousIndex,
      event.currentIndex
    );

    this.updatePositions();
  }

  private updatePositions() {
    this.professions.controls.forEach((control, index) => {
      control.patchValue({ index: index }, { emitEvent: false });
    });
  }

  addProfession(input: HTMLInputElement) {
    const newProfession = input.value.trim();
    if (newProfession) {
      const position = this.professions.length;
      this.professions.push(
        new FormGroup({
          professionName: new FormControl(newProfession),
          isActive: new FormControl(true),
          index: new FormControl(position),
        })
      );
      input.value = '';
    }
  }
  ngOnInit() {
    console.log(this.professions);
  }
}
