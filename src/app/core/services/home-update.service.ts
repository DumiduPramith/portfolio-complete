import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomeUpdateRequestInterface } from '../interfaces/HomeUpdateRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeUpdateService {
  private homeUpdateUrl = `/api/admin/home/update`;
  constructor(private http: HttpClient) {}

  updateHome(homeUpdateRequest: HomeUpdateRequestInterface) {
    return this.http.put(this.homeUpdateUrl, homeUpdateRequest);
  }
}
