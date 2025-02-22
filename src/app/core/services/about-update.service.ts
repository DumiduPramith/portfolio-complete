import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AboutUpdateRequestInterface } from '../interfaces/AboutUpdateRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AboutUpdateService {
  private aboutUpdateUrl = '/api/about/update';
  constructor(private http: HttpClient) {}

  updateAbout(about: AboutUpdateRequestInterface) {
    return this.http.put(this.aboutUpdateUrl, about);
  }
}
