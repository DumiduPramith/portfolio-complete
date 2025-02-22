import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormState } from '../reducers/form.reducer';

export const selectFormState = createFeatureSelector<FormState>('form');

export const selectHomeFormStatus = createSelector(
  selectFormState,
  (state: FormState) => state.homeForm
);

export const selectAboutFormStatus = createSelector(
  selectFormState,
  (state: FormState) => state.aboutForm
);

export const selectPortfolioFormStatus = createSelector(
  selectFormState,
  (state: FormState) => state.portfolioForm
);

export const selectContactFormStatus = createSelector(
  selectFormState,
  (state: FormState) => state.contactForm
);
