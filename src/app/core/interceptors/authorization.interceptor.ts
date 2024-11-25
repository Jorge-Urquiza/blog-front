import { catchError, EMPTY, throwError } from 'rxjs';
import HTTP_ERROR_CODES from './http-error-codes';
import { HttpInterceptorFn } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { InternalError } from './error.interface';
import { AuthService } from '@core/services/auth.service';
import { inject } from '@angular/core';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  const userAuthenticated = authService.getCurrentUser();
  if (userAuthenticated && userAuthenticated?.token) {
    const authHeader = req.clone({
      setHeaders: {
        Authorization: userAuthenticated.token,
      },
    });
    return next(authHeader).pipe(
      catchError((e) => {
        const error: InternalError = e.error;
        const { ACCESS_DENIED, EXPIRED_TOKEN, INVALID_HEADER } =
          HTTP_ERROR_CODES;
        switch (error.message) {
          case EXPIRED_TOKEN.MESSAGE:
            messageService.clear();
            messageService.add({
              severity: 'warn',
              summary: 'Sesión',
              detail:
                'credenciales expirados por favor inicia sesión nuevamente',
            });
            setTimeout(() => {
              authService.logout();
            }, 3000);
            return EMPTY;
          case ACCESS_DENIED.MESSAGE:
            messageService.clear();
            messageService.add({
              severity: 'error',
              summary: 'credenciales',
              detail: 'credenciales no válidos por favor inicia sesión',
            });
            setTimeout(() => {
              authService.logout();
            }, 3000);
            return EMPTY;
          case INVALID_HEADER.MESSAGE:
            messageService.clear();
            messageService.add({
              severity: 'error',
              summary: 'credenciales',
              detail: 'credenciales no válidos por favor inicia sesión',
            });
            setTimeout(() => {
              authService.logout();
            }, 3000);
            return EMPTY;
          default:
            messageService.add({
              severity: error.title || 'error',
              summary: 'Error',
              detail: `${
                error.message ??
                'Ocurrio un error inesperado por favor intenta nuevamente'
              }`,
            });
            return throwError(() => e);
        }
      })
    );
  }
  return next(req);
};
