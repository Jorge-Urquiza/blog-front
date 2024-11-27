import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Post } from '../models/post';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  public create(post: Post): Observable<Post> {
    return this.http
      .post<Post>(this.apiUrl, post)
      .pipe(catchError(this.handleError));
  }


  public update(id: number, post: Post): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Post>(url, post).pipe(catchError(this.handleError));
  }

  public getPostsWithFilters(categories: number[], tags: number[]): Observable<any> {
    const requestBody = {
      categories: categories,
      tags: tags
    };
    const url = `${this.apiUrl}/filters`;
    return this.http.post<any>(url, requestBody);
  }

  public getPostById(id: number): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Post>(url).pipe(catchError(this.handleError));
  }


  public delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('PostService Error:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred';
    return throwError(() => new Error(errorMessage));
  }
}
