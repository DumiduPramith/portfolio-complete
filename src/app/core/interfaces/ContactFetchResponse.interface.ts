export interface ContactFetchResponseInterface {
  emails: EmailInterface[];
}

interface EmailInterface {
  emailAddress: string;
  isActive: boolean;
  index: number;
}
