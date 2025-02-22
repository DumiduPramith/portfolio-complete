import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactFetchResponseInterface } from '../interfaces/ContactFetchResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchContactService {
  private fetchContactUrl = '/api/admin/contact/retrieve';
  constructor(private http: HttpClient) {}

  fetchContact() {
    return this.http.get<ContactFetchResponseInterface>(this.fetchContactUrl);
  }
}
