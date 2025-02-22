import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdatePortfolioService {
  private url = '/api/admin/portfolio/update';
  constructor(private http: HttpClient) {}

  updatePortfolio(data: any) {
    return this.http.put(this.url, data);
  }
}
