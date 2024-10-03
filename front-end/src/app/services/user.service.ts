// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './api-response.model'; // Importa desde el archivo correcto

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://peticiones.online/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
}
