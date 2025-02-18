import { Component, inject } from '@angular/core';
import { TextFieldComponent } from '../../../shared/components/text-field/text-field.component';
import { SkillCardComponent } from '../../../shared/components/skill-card/skill-card.component';
import { UpdateSkillCardComponent } from '../../../shared/components/update-skill-card/update-skill-card.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FetchAboutService } from '../../services/fetch-about.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DragDropModule,
    TextFieldComponent,
    SkillCardComponent,
    UpdateSkillCardComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  fb = inject(FormBuilder);
  aboutFetchService = inject(FetchAboutService);
  aboutFetchServiceSubscription = Subscription.EMPTY;

  aboutForm!: FormGroup;
  ngOnInit() {
    this.aboutForm = this.fb.group({
      paragraph1: ['', Validators.required],
      paragraph2: ['', Validators.required],
      techStack: this.fb.array([]),
      tools: this.fb.array([]),
    });

    this.aboutFetchServiceSubscription = this.aboutFetchService
      .fetchAbout()
      .subscribe({
        next: (data) => {
          this.setFormValues(data);
        },
        error(err) {
          console.error('Error fetching about data: ', err);
        },
      });
  }

  setFormValues(data: any) {
    this.aboutForm.patchValue({
      paragraph1: data.paragraph1,
      paragraph2: data.paragraph2,
    });

    this.setTechStack(data.techStack);
    this.setTools(data.tools);
  }

  setTechStack(techStack: any) {
    const techStackFormArray = this.techFormArray;
    techStack.forEach((tech: any) => {
      techStackFormArray.push(
        this.fb.group({
          iconUrl: tech.iconUrl,
          name: tech.name,
          description: tech.description,
          isActive: tech.isActive,
          index: tech.index,
        })
      );
    });
  }

  setTools(tools: any) {
    const toolsFormArray = this.toolsFormArray;
    tools.forEach((tool: any) => {
      toolsFormArray.push(
        this.fb.group({
          iconUrl: tool.iconUrl,
          name: tool.name,
          description: tool.description,
          isActive: tool.isActive,
          index: tool.index,
        })
      );
    });
  }

  onDrop(event: CdkDragDrop<FormGroup[]>, formArray: FormArray) {
    const control = formArray.at(event.previousIndex);
    formArray.removeAt(event.previousIndex);
    formArray.insert(event.currentIndex, control);
    this.updatePositions(formArray);
  }

  private updatePositions(formArray: FormArray) {
    formArray.controls.forEach((control, index) => {
      control.patchValue({ index });
    });
  }

  get paragraph1FormController(): FormControl {
    return this.aboutForm.get('paragraph1') as FormControl;
  }

  get paragraph2FormController(): FormControl {
    return this.aboutForm.get('paragraph2') as FormControl;
  }

  get techFormArray(): FormArray {
    return this.aboutForm.get('techStack') as FormArray;
  }

  get toolsFormArray(): FormArray {
    return this.aboutForm.get('tools') as FormArray;
  }

  getFormGroup(formGroup: any): FormGroup {
    return formGroup;
  }

  ngOnDestroy() {
    if (this.aboutFetchServiceSubscription) {
      this.aboutFetchServiceSubscription.unsubscribe();
    }
  }
}
