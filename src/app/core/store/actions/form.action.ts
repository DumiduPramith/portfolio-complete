import { createAction } from '@ngrx/store';

export const updateHomeFormStatus = createAction(
  '[form] Update Home Form Status',
  (status: boolean) => ({ status })
);

export const updateAboutFormStatus = createAction(
  '[form] Update About Form Status',
  (status: boolean) => ({ status })
);

export const updatePortfolioFormStatus = createAction(
  '[form] Update Portfolio Form Status',
  (status: boolean) => ({ status })
);

export const updateContactFormStatus = createAction(
  '[form] Update Contact Form Status',
  (status: boolean) => ({ status })
);
