import { Component, inject, ViewChild } from '@angular/core';
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
import { Observable, Subscription } from 'rxjs';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { SpacerComponent } from '../../../shared/components/spacer/spacer.component';
import { AboutUpdateService } from '../../services/about-update.service';
import { FormUtilService } from '../../../shared/services/form-util.service';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { ToastServiceService } from '../../../shared/services/toast-service.service';
import { ErrorService } from '../../services/error.service';
import { FormState } from '../../store/reducers/form.reducer';
import { selectAboutFormStatus } from '../../store/selectors/form.selector';
import { updateAboutFormStatus } from '../../store/actions/form.action';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    TextFieldComponent,
    SkillCardComponent,
    UpdateSkillCardComponent,
    SpacerComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  fb = inject(FormBuilder);
  router = inject(Router);

  toastService = inject(ToastServiceService);

  aboutFetchService = inject(FetchAboutService);
  formUtilService = inject(FormUtilService);

  aboutFetchServiceSubscription = Subscription.EMPTY;
  aboutUpdateService = inject(AboutUpdateService);
  abountUpdateServiceSubscription = Subscription.EMPTY;

  isUpdate = false;
  aboutForm!: FormGroup;

  aboutFormStatus$!: Observable<boolean>;
  aboutFormStatus!: boolean;
  aboutFormStatusSubscription = Subscription.EMPTY;

  errorService = inject(ErrorService);

  constructor(private store: Store<{ form: FormState }>) {
    this.aboutFormStatus$ = this.store.pipe(select(selectAboutFormStatus));
  }

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
        error: (err) => {
          console.error('Error fetching about data: ', err);
          this.errorService.setError(
            'Error fetching about data',
            this.router.url
          );
        },
        complete: () => {
          this.formUtilService.disableForm(this.aboutForm);
          // this.formUtilService.checkDisabled(this.aboutForm);
        },
      });
    this.aboutFormStatusSubscription = this.aboutFormStatus$.subscribe(
      (status) => {
        this.aboutFormStatus = status;
        if (status) {
          this.formUtilService.enableForm(this.aboutForm);
        } else {
          this.formUtilService.disableForm(this.aboutForm);
        }
      }
    );
  }

  onChangeFormStatus() {
    this.store.dispatch(updateAboutFormStatus(!this.aboutFormStatus));
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

  onSubmit() {
    console.log(this.aboutForm.value);
    this.abountUpdateServiceSubscription = this.aboutUpdateService
      .updateAbout(this.aboutForm.value)
      .subscribe({
        next: (data) => {
          console.log('About data updated successfully: ', data);
          this.toastService.showToast(
            'About data updated successfully',
            'Close'
          );
        },
        error: (err) => {
          console.error('Error updating about data: ', err);
          this.toastService.showToast('Error updating about data', 'Close');
        },
        complete: () => {
          this.onChangeFormStatus();
          this.router.navigate([this.router.url]);
        },
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

  ngOnDestroy() {
    if (this.aboutFetchServiceSubscription) {
      this.aboutFetchServiceSubscription.unsubscribe();
    }

    if (this.abountUpdateServiceSubscription) {
      this.abountUpdateServiceSubscription.unsubscribe();
    }
  }
}
