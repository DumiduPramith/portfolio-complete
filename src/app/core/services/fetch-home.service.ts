import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HomeFetchResponseInterface } from '../interfaces/HomeFetchResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchHomeService {
  private apiUrl = environment.apiUrl;
  private fetchHomeUrl = `/api/admin/home/retrieve`;

  constructor(private http: HttpClient) {}

  fetchHome() {
    return this.http.get<HomeFetchResponseInterface>(this.fetchHomeUrl);
  }
}
