import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactFetchResponseInterface } from '../interfaces/ContactFetchResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactUpdateService {
  private contactUpdateUrl = '/api/admin/contact/update';

  constructor(private http: HttpClient) {}

  updateContact(contact: ContactFetchResponseInterface) {
    return this.http.put(this.contactUpdateUrl, contact);
  }
}
