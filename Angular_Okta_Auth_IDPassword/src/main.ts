import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { oktaConfig_Sunil } from './app/login/okta-config/okta-config';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(OktaAuthModule),
    {
      provide: OKTA_CONFIG,
      useValue: { oktaConfig_Sunil }
    }
  ]
});
