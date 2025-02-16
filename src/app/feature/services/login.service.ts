import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginResponseInterface } from '../interfaces/loginResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;
  private loginUrl = `${this.apiUrl}/api/auth/login`;

  login(email: string, password: string) {
    return this.http.post<LoginResponseInterface>(this.loginUrl, {
      email,
      password,
    });
  }
}
