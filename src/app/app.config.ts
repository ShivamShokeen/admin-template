import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideToastr({
      timeOut: 1000,
      preventDuplicates: true,
    }),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
};
