import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check if the access token exists in local storage
  const accessToken = localStorage.getItem('accessToken');

  // If no access token, redirect the user to the login page
  if (!accessToken) {
    router.navigate(['/login']);
    return false;
  }

  // If the access token exists, allow the user to access the route
  return true;
};
