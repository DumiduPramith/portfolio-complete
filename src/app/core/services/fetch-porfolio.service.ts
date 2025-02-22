import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PortfolioFetchResponseInterface } from '../interfaces/PortfolioFetchResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchPorfolioService {
  private fetchPortfolioUrl = '/api/admin/portfolio/retrieve';
  constructor(private http: HttpClient) {}

  fetchPortfolio() {
    return this.http.get<PortfolioFetchResponseInterface>(
      this.fetchPortfolioUrl
    );
  }
}
