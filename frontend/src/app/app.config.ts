import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: tokenInterceptor,
      multi: true,
    },
    importProvidersFrom(HttpClientModule), // Provide HttpClientModule
    provideRouter(routes),
  ],
};
