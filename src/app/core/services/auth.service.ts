import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  IStorageInterface,
  IloginData,
  IloginResponse,
} from '@core/auth/interfaces/login.interface';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) {}

  public getCurrentUser(): IStorageInterface | null {
    var user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  public removeCurrentUser(): void {
    localStorage.removeItem('user');
  }

  public logout(): void {
    this.removeCurrentUser();
    this.router.navigate(['/auth']);
  }

  public getContractorCompany(): number {
    return this.getCurrentUser()?.contractorCompanyId ?? 0;
  }
  public getUserId(): number {
    return this.getCurrentUser()?.id ?? 0;
  }
  public setCurrentUser(user: IStorageInterface): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  public isAuhenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  public login(loginData: IloginData): Observable<IloginResponse> {
    return this.httpClient.post<IloginResponse>(
      `${this.apiUrl}/authentication/login`,
      { ...loginData }
    );
  }
}
