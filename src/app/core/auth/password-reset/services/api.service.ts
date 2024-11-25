import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { PasswordResetRequestDto } from '../models/password-reset-request.dto';
import { PasswordResetDto } from '../models/password-reset.dto';
import { PasswordResetValidationDto } from '../models/password-reset-validation.dto';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = `${environment.apiUrl}/authentication`;
  // private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  requestPasswordReset(
    body: PasswordResetRequestDto
  ): Observable<ApiResponse<PasswordResetRequestDto>> {
    return this.http.post<ApiResponse<PasswordResetRequestDto>>(
      `${this.apiUrl}/request-password-reset`,
      body
    );
  }

  validateConfirmationCode(
    body: PasswordResetValidationDto
  ): Observable<ApiResponse<PasswordResetDto>> {
    return this.http.post<ApiResponse<PasswordResetDto>>(
      `${this.apiUrl}/validate-confirmation-code`,
      body
    );
  }

  updatePassword(body: PasswordResetDto): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.apiUrl}/update-password`,
      body
    );
  }
}
