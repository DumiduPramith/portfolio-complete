import { createReducer, on } from '@ngrx/store';
import {
  updateAboutFormStatus,
  updateContactFormStatus,
  updateHomeFormStatus,
  updatePortfolioFormStatus,
} from '../actions/form.action';

export interface FormState {
  homeForm: boolean;
  aboutForm: boolean;
  portfolioForm: boolean;
  contactForm: boolean;
}

export const initialState: FormState = {
  homeForm: false,
  aboutForm: false,
  portfolioForm: false,
  contactForm: false,
};

export const formReducer = createReducer(
  initialState,
  on(updateHomeFormStatus, (state, { status }) => {
    return {
      ...state,
      homeForm: status,
    };
  }),
  on(updateAboutFormStatus, (state, { status }) => {
    return {
      ...state,
      aboutForm: status,
    };
  }),
  on(updatePortfolioFormStatus, (state, { status }) => {
    return {
      ...state,
      portfolioForm: status,
    };
  }),
  on(updateContactFormStatus, (state, { status }) => {
    return {
      ...state,
      contactForm: status,
    };
  })
);
