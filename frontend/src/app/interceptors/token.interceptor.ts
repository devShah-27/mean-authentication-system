import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Using the inject function for dependency injection

  const accessToken = localStorage.getItem('accessToken'); // Get the access token from the service

  if (accessToken) {
    // Clone the request and add the access token to the headers
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return next(cloneReq).pipe(
      catchError((error) => {
        // If the access token is expired, try to refresh it
        if (error.status === 401) {
          return authService.refreshToken().pipe(
            switchMap((newToken: any) => {
              // Update the access token in the local storage and retry the request
              localStorage.setItem('accessToken', newToken.accessToken);
              const clonedReqWithNewToken = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken.accessToken}`,
                },
              });
              return next(clonedReqWithNewToken);
            }),
            catchError((refreshError) => {
              // If refreshing the token fails, log out the user
              authService.logout();
              return throwError(() => refreshError);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
