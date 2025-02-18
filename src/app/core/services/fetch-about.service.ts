import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FetchAboutService {
  private fetchAboutUrl = '/api/about/retrieve';

  constructor(private http: HttpClient) {}

  fetchAbout() {
    return this.http.get(this.fetchAboutUrl);
  }
}
