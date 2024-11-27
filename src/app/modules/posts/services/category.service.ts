import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Category } from '../models/category';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from '@core/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}


  public create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category).pipe(
      catchError(this.handleError)
    );
  }

  public update(id: number, category: Category): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Category>(url, category).pipe(
      catchError(this.handleError)
    );
  }


  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }


  public getCategoryById(id: number): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      catchError(this.handleError)
    );
  }

  public delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('CategoryService Error:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred';
    return throwError(() => new Error(errorMessage));
  }
}
