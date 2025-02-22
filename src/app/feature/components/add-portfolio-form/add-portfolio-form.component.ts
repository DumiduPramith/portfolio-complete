import { Component, inject, Input, ViewChild } from '@angular/core';
import { ChooseFileComponent } from '../../../shared/components/choose-file/choose-file.component';
import { TextFieldComponent } from '../../../shared/components/text-field/text-field.component';
import { TextBoxComponent } from '../../../shared/components/text-box/text-box.component';
import { DragListComponent } from '../../../shared/components/drag-list/drag-list.component';
import { FormArray, FormBuilder } from '@angular/forms';
import { FormUtilService } from '../../../shared/services/form-util.service';
import { TextBoxWithActiveComponent } from '../../../shared/components/text-box-with-active/text-box-with-active.component';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectPortfolioFormStatus } from '../../../core/store/selectors/form.selector';
import { AddFieldComponent } from '../../../shared/components/add-field/add-field.component';

@Component({
  selector: 'app-add-portfolio-form',
  standalone: true,
  imports: [
    ChooseFileComponent,
    TextFieldComponent,
    TextBoxComponent,
    TextBoxWithActiveComponent,
    DragListComponent,
    AddFieldComponent,
  ],
  templateUrl: './add-portfolio-form.component.html',
  styleUrl: './add-portfolio-form.component.scss',
})
export class AddPortfolioFormComponent {
  fb = inject(FormBuilder);
  formUtilService = inject(FormUtilService);

  portfolioFormStatus$!: Observable<boolean>;
  portfolioFormStatusSubscription = Subscription.EMPTY;
  portfolioFormStatus: boolean = false;

  private store = inject(Store);

  newProjectForm = this.createProjectForm();

  @Input({ required: true }) formArray_!: FormArray;
  @ViewChild('chooseFileComponent') chooseFileComponent!: ChooseFileComponent;

  constructor() {
    this.portfolioFormStatus$ = this.store.pipe(
      select(selectPortfolioFormStatus)
    );
  }

  ngOnInit() {
    this.portfolioFormStatusSubscription = this.portfolioFormStatus$.subscribe(
      (status: boolean) => {
        this.portfolioFormStatus = status;
        if (status) {
          this.formUtilService.enableForm(this.newProjectForm);
        } else {
          this.formUtilService.disableForm(this.newProjectForm);
        }
      }
    );
  }

  createProjectForm() {
    return this.fb.group({
      title: [''],
      description: [''],
      image: this.fb.group({
        name: ['portfolio.png'],
        url: [''],
        width: [''],
        height: [''],
        smallUrl: [''],
      }),
      technologies: this.fb.array([]),
      projectUrls: this.fb.array([
        this.fb.group({
          url: [''],
          iconUrl: ['/static/icons/github__.png'],
          iconName: ['github'],
          isActive: [true],
        }),
        this.fb.group({
          url: [''],
          iconUrl: ['/static/icons/open_new_.png'],
          iconName: ['liveUrl'],
          isActive: [true],
        }),
      ]),
      isActive: [true],
      index: [0],
    });
  }

  addCard() {
    this.formArray_.push(this.newProjectForm);
    console.log(this.newProjectForm);
    this.newProjectForm = this.createProjectForm();
    this.chooseFileComponent.ngOnInit();
  }

  clearCard() {
    this.newProjectForm.reset();
  }

  ngOnDestroy() {
    if (this.portfolioFormStatusSubscription) {
      this.portfolioFormStatusSubscription.unsubscribe();
    }
  }
}
