import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Tag } from 'primeng/tag';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private readonly apiUrl = `${environment.apiUrl}/tags`;

  constructor(private http: HttpClient) {}

  public create(tag: Tag): Observable<Tag> {
    return this.http
      .post<Tag>(this.apiUrl, tag)
      .pipe(catchError(this.handleError));
  }

  public update(id: number, tag: Tag): Observable<Tag> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Tag>(url, tag).pipe(catchError(this.handleError));
  }

  public getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  public getTagById(id: number): Observable<Tag> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Tag>(url).pipe(catchError(this.handleError));
  }

  public delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('TagService Error:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred';
    return throwError(() => new Error(errorMessage));
  }
}
