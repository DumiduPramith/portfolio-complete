import { Component, inject } from '@angular/core';
import { TextBoxComponent } from '../../../shared/components/text-box/text-box.component';
import { DragListComponent } from '../../../shared/components/drag-list/drag-list.component';
import { UpdateProfilePicComponent } from '../../../shared/components/update-profile-pic/update-profile-pic.component';
import { FetchHomeService } from '../../services/fetch-home.service';
import { Observable, Subscription } from 'rxjs';
import { HomeFetchResponseInterface } from '../../interfaces/HomeFetchResponse.interface';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextBoxWithActiveComponent } from '../../../shared/components/text-box-with-active/text-box-with-active.component';
import { ChooseFileWithActiveComponent } from '../../../shared/components/choose-file-with-active/choose-file-with-active.component';
import { HomeUpdateService } from '../../services/home-update.service';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormUtilService } from '../../../shared/services/form-util.service';
import { AddFieldComponent } from '../../../shared/components/add-field/add-field.component';
import { ToastServiceService } from '../../../shared/services/toast-service.service';
import { ErrorService } from '../../services/error.service';
import { FormState } from '../../store/reducers/form.reducer';
import { selectHomeFormStatus } from '../../store/selectors/form.selector';
import { updateHomeFormStatus } from '../../store/actions/form.action';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    DragListComponent,
    UpdateProfilePicComponent,
    TextBoxWithActiveComponent,
    ChooseFileWithActiveComponent,
    AddFieldComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  toastService = inject(ToastServiceService);

  homeFetchService = inject(FetchHomeService);
  homeFetchServiceSubscription = Subscription.EMPTY;

  homeUpdateService = inject(HomeUpdateService);
  homeUpdateServiceSubscription = Subscription.EMPTY;

  formUtilService = inject(FormUtilService);
  HomeData: HomeFetchResponseInterface = {
    profilePictureUrl: '',
    brandName: '',
    firstName: '',
    lastName: '',
    professions: [
      {
        professionName: '',
        isActive: true,
        index: 0,
      },
    ],
    socialMedias: [
      {
        name: '',
        url: '',
        iconUrl: '',
        isActive: true,
      },
    ],
    resume: {
      resumeUrl: '',
      isActive: true,
    },
    github: {
      githubUrl: '',
      isActive: true,
    },
  };

  homeFormStatus$!: Observable<boolean>;
  homeFormStatus: boolean = false;
  homeFormStatusSubscription = Subscription.EMPTY;

  errorService = inject(ErrorService);

  homeForm!: FormGroup;

  constructor(private store: Store<{ form: FormState }>) {
    this.homeFormStatus$ = this.store.pipe(select(selectHomeFormStatus));
  }

  ngOnInit() {
    this.homeForm = this.fb.group({
      profilePicture: this.fb.group({
        profilePictureUrl: [''],
        isChanged: [false],
      }),
      brandName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      professions: this.fb.array([]),
      resumeFile: this.fb.group({
        resumeUrl: [''],
        isActive: [true],
        isChanged: [false],
      }),
      github: this.fb.group({
        url: ['', Validators.required],
        isActive: [true],
      }),
      socialMedias: this.fb.array([]),
    });
    this.homeFetchServiceSubscription = this.homeFetchService
      .fetchHome()
      .subscribe({
        next: (response) => {
          console.log(response);
          this.HomeData = response;
          this.setFormValues(response);
        },
        error: (error) => {
          console.error(error);
          this.errorService.setError('Error fetching home data', {});
        },
        complete: () => {
          this.formUtilService.disableForm(this.homeForm);
        },
      });

    this.homeFormStatusSubscription = this.homeFormStatus$.subscribe(
      (status) => {
        this.homeFormStatus = status;
        if (status) {
          this.formUtilService.enableForm(this.homeForm);
        } else {
          this.formUtilService.disableForm(this.homeForm);
        }
      }
    );
  }

  onChangeFormStatus() {
    this.store.dispatch(updateHomeFormStatus(!this.homeFormStatus));
  }

  async onSubmit() {
    if (this.homeForm.get('resumeFile')?.get('isChanged')?.value) {
      const file: File = this.homeForm
        .get('resumeFile')
        ?.get('resumeUrl')?.value;
      try {
        const base64String = await this.convertFileToDataURL(file);
        this.homeForm
          .get('resumeFile')
          ?.get('resumeUrl')
          ?.patchValue(base64String);
      } catch (e) {
        console.error(e);
      }
    }
    console.log(this.homeForm.value);
    const homeUpdateRequest = this.homeForm.value;
    this.homeUpdateServiceSubscription = this.homeUpdateService
      .updateHome(homeUpdateRequest)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.toastService.showToast('Home updated', 'Success');
        },
        error: (error) => {
          console.error(error);
          this.toastService.showToast('Error updating home', 'Error');
        },
        complete: () => {
          this.onChangeFormStatus();
          this.router.navigate([this.router.url]);
        },
      });
  }

  setFormValues(value: HomeFetchResponseInterface): void {
    this.homeForm.patchValue({
      brandName: value.brandName,
      firstName: value.firstName,
      lastName: value.lastName,
    });

    const formArray = this.homeForm.get('professions') as FormArray;
    value.professions.forEach((profession) => {
      formArray.push(
        this.fb.group({
          professionName: profession.professionName,
          isActive: profession.isActive,
          index: profession.index,
        })
      );
    });

    this.homeForm.get('profilePicture')?.patchValue({
      profilePictureUrl: value.profilePictureUrl,
    });

    this.homeForm.get('github')?.patchValue({
      url: value.github.githubUrl,
      isActive: value.github.isActive,
    });

    this.homeForm.get('resumeFile')?.patchValue({
      resumeUrl: value.resume.resumeUrl,
      isActive: value.resume.isActive,
    });

    this.buildSocialMediaFormArray();
  }

  buildSocialMediaFormArray() {
    const formArray = this.homeForm.get('socialMedias') as FormArray;
    this.HomeData.socialMedias.forEach((socialMedia) => {
      formArray.push(
        this.fb.group({
          name: socialMedia.name,
          url: socialMedia.url,
          iconUrl: socialMedia.iconUrl,
          isActive: socialMedia.isActive,
        })
      );
    });
  }

  get professions(): FormArray {
    return this.homeForm.get('professions') as FormArray;
  }

  get profilePictureFormGroup(): FormGroup {
    return this.homeForm.get('profilePicture') as FormGroup;
  }

  get githubFormGroup(): FormGroup {
    return this.homeForm.get('github') as FormGroup;
  }

  get resumeFormGroup(): FormGroup {
    return this.homeForm.get('resumeFile') as FormGroup;
  }

  get socialMediasFormArray(): FormArray {
    return this.homeForm.get('socialMedias') as FormArray;
  }

  ngOnDestroy() {
    if (this.homeFetchServiceSubscription) {
      this.homeFetchServiceSubscription.unsubscribe();
    }
    if (this.homeUpdateServiceSubscription) {
      this.homeUpdateServiceSubscription.unsubscribe();
    }
    if (this.homeFormStatusSubscription) {
      this.homeFormStatusSubscription.unsubscribe();
    }
  }

  private convertFileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Send the full data URL (including the prefix)
        const dataURL = reader.result as string;
        resolve(dataURL);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      // Read the file as a data URL (base64)
      reader.readAsDataURL(file);
    });
  }
}
