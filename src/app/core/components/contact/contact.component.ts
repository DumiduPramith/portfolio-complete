import { select, Store } from '@ngrx/store';
import { Component, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormUtilService } from '../../../shared/services/form-util.service';
import { CommonModule } from '@angular/common';
import { FetchContactService } from '../../services/fetch-contact.service';
import { ContactFetchResponseInterface } from '../../interfaces/ContactFetchResponse.interface';
import { DragListComponent } from '../../../shared/components/drag-list/drag-list.component';
import { AddFieldComponent } from '../../../shared/components/add-field/add-field.component';
import { ContactUpdateService } from '../../services/contact-update.service';
import { Router } from '@angular/router';
import { ToastServiceService } from '../../../shared/services/toast-service.service';
import { ErrorService } from '../../services/error.service';
import { FormState } from '../../store/reducers/form.reducer';
import { selectContactFormStatus } from '../../store/selectors/form.selector';
import { updateContactFormStatus } from '../../store/actions/form.action';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, DragListComponent, AddFieldComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  fb = inject(FormBuilder);
  router = inject(Router);

  toastService = inject(ToastServiceService);

  fetchContactService = inject(FetchContactService);
  fetchContactServiceSubscription = Subscription.EMPTY;

  updateContactService = inject(ContactUpdateService);
  updateContactServiceSubscription = Subscription.EMPTY;

  formUtilService = inject(FormUtilService);

  contactForm = this.buildForm();

  contactFormData!: ContactFetchResponseInterface;

  contactFormStatus$!: Observable<boolean>;
  contactFormStatus: boolean = false;
  contactFormStatusSubscription = Subscription.EMPTY;

  errorService = inject(ErrorService);

  constructor(private store: Store<{ form: FormState }>) {
    this.contactFormStatus$ = this.store.pipe(select(selectContactFormStatus));
  }

  ngOnInit() {
    this.fetchContactServiceSubscription = this.fetchContactService
      .fetchContact()
      .subscribe({
        next: (response) => {
          this.contactFormData = response;
        },
        error: (error) => {
          console.error('Error fetching contact', error);
          this.errorService.setError('Error fetching contact', {});
        },
        complete: () => {
          this.addToForm();
          this.formUtilService.disableForm(this.contactForm);
        },
      });

    this.contactFormStatusSubscription = this.contactFormStatus$.subscribe(
      (status: boolean) => {
        this.contactFormStatus = status;
        if (status) {
          this.formUtilService.enableForm(this.contactForm);
        } else {
          this.formUtilService.disableForm(this.contactForm);
        }
      }
    );
  }

  buildForm(): FormGroup {
    return this.fb.group({
      emails: this.fb.array([]),
    });
  }

  addToForm() {
    const emailsFormArray = this.contactForm.get('emails') as FormArray;
    this.contactFormData.emails.forEach((email) => {
      emailsFormArray.push(
        this.fb.group({
          emailAddress: [email.emailAddress],
          isActive: [email.isActive],
          index: [email.index],
        })
      );
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.updateContactServiceSubscription = this.updateContactService
        .updateContact(this.contactForm.value)
        .subscribe({
          next: (response) => {
            console.log('Contact updated', response);
            this.toastService.showToast('Contact updated', 'Success');
          },
          error: (error) => {
            console.error('Error updating contact', error);
            this.toastService.showToast('Error updating contact', 'Error');
          },
          complete: () => {
            this.onChangeFormStatus();
            this.router.navigate([this.router.url]);
          },
        });
    }
  }

  onChangeFormStatus() {
    this.store.dispatch(updateContactFormStatus(!this.contactFormStatus));
  }

  get emailsFormArray() {
    return this.contactForm.get('emails') as FormArray;
  }

  ngOnDestroy() {
    if (this.contactFormStatusSubscription) {
      this.contactFormStatusSubscription.unsubscribe();
    }
    if (this.fetchContactServiceSubscription) {
      this.fetchContactServiceSubscription.unsubscribe();
    }
    if (this.updateContactServiceSubscription) {
      this.updateContactServiceSubscription.unsubscribe();
    }
  }
}
