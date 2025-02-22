import { select, Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FormUtilService } from '../../../shared/services/form-util.service';
import { PortfolioCardComponent } from '../../../shared/components/portfolio-card/portfolio-card.component';
import { FetchPorfolioService } from '../../services/fetch-porfolio.service';
import { ErrorService } from '../../services/error.service';
import { FormState } from '../../store/reducers/form.reducer';
import { selectPortfolioFormStatus } from '../../store/selectors/form.selector';
import { updatePortfolioFormStatus } from '../../store/actions/form.action';
import { DynamicFormBuilderService } from '../../../shared/services/dynamic-form-builder.service';
import { AddPortfolioFormComponent } from '../../../feature/components/add-portfolio-form/add-portfolio-form.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ImageUtilService } from '../../../shared/services/image-util.service';
import { ToastServiceService } from '../../../shared/services/toast-service.service';
import { UpdatePortfolioService } from '../../services/update-portfolio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    PortfolioCardComponent,
    AddPortfolioFormComponent,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  fb = inject(FormBuilder);
  formUtilService = inject(FormUtilService);
  imageUtilService = inject(ImageUtilService);

  portfolioForm: FormGroup = this.buildForm();

  portfolioFormStatus$!: Observable<boolean>;
  portfolioFormStatusSubscription = Subscription.EMPTY;
  portfolioFormStatus: boolean = false;

  portfolioFetchService = inject(FetchPorfolioService);
  portfolioFetchServiceSubscription = Subscription.EMPTY;

  private portfolioUpdateService = inject(UpdatePortfolioService);
  private portfolioUpdateServiceSubscription = Subscription.EMPTY;

  imageUrlControllerSubscription: Subscription | undefined = Subscription.EMPTY;

  errorService = inject(ErrorService);
  dynamicFormBuilderService = inject(DynamicFormBuilderService);

  toastService = inject(ToastServiceService);
  private router = inject(Router);

  formArrayLength = 0;

  constructor(private store: Store<{ form: FormState }>) {
    this.portfolioFormStatus$ = this.store.pipe(
      select(selectPortfolioFormStatus)
    );
  }

  ngOnInit() {
    this.portfolioFormStatusSubscription = this.portfolioFormStatus$.subscribe(
      (status: boolean) => {
        this.portfolioFormStatus = status;
        if (status) {
          this.formUtilService.enableForm(this.portfolioForm);
        } else {
          this.formUtilService.disableForm(this.portfolioForm);
        }
      }
    );

    this.portfolioFetchServiceSubscription = this.portfolioFetchService
      .fetchPortfolio()
      .subscribe({
        next: (response) => {
          // console.log(response);
          this.portfolioForm =
            this.dynamicFormBuilderService.createFormGroup(response);
        },
        error: (error) => {
          console.log(error);
          this.errorService.setError(
            'Failed to load Update Portfolio Page',
            {}
          );
        },
        complete: () => {
          console.log(this.portfolioForm);
          this.formUtilService.disableForm(this.portfolioForm);
          this.valueChangeDetection();
        },
      });
  }

  buildForm() {
    return this.fb.group({
      email: this.fb.array([]),
    });
  }

  valueChangeDetection() {
    const projectsFormArray = this.portfolioForm.get('projects') as FormArray;
    this.formArrayLength = projectsFormArray.length;

    this.imageUrlControllerSubscription =
      projectsFormArray.valueChanges.subscribe(async (value) => {
        if (projectsFormArray.length > this.formArrayLength) {
          const lastAddedFormGroup = projectsFormArray.at(
            projectsFormArray.length - 1
          ) as FormGroup;
          const imageUrlController = lastAddedFormGroup.get('image.url');
          if (imageUrlController) {
            const [width, height] =
              await this.imageUtilService.getImageDimensions(
                imageUrlController.value
              );
            lastAddedFormGroup.get('image')?.patchValue({ width, height });
          }
        }
        this.formArrayLength = projectsFormArray.length;
      });
  }

  onChangeFormStatus() {
    this.store.dispatch(updatePortfolioFormStatus(!this.portfolioFormStatus));
  }

  onDrop($event: CdkDragDrop<FormGroup[]>, formArray: FormArray) {
    const control = formArray.at($event.previousIndex);
    formArray.removeAt($event.previousIndex);
    formArray.insert($event.currentIndex, control);
    this.updatePositions(formArray);
  }

  private updatePositions(formArray: FormArray) {
    formArray.controls.forEach((control, index) => {
      control.patchValue({ index });
    });
  }

  get projectsFormArray(): FormArray {
    return this.portfolioForm.get('projects') as FormArray;
  }

  onSubmit() {
    const data = this.portfolioForm.getRawValue();
    console.log(data);
    this.portfolioFetchServiceSubscription = this.portfolioUpdateService
      .updatePortfolio(data)
      .subscribe({
        next: (response) => {
          this.toastService.showToast(
            'Portfolio Updated Successfully',
            'success'
          );
        },
        error: (error) => {
          console.log(error);
          this.toastService.showToast('Failed to Update Portfolio', 'error');
        },
        complete: () => {
          this.router.navigate([this.router.url]);
        },
      });
  }

  ngOnDestroy() {
    if (this.portfolioFormStatusSubscription) {
      this.portfolioFormStatusSubscription.unsubscribe();
    }
    if (this.portfolioFetchServiceSubscription) {
      this.portfolioFetchServiceSubscription.unsubscribe();
    }

    if (this.portfolioUpdateServiceSubscription) {
      this.portfolioUpdateServiceSubscription.unsubscribe();
    }

    if (this.imageUrlControllerSubscription) {
      this.imageUrlControllerSubscription.unsubscribe();
    }
  }
}
