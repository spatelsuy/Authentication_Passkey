import { Component } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { OktaAuthModule, OKTA_AUTH } from '@okta/okta-angular';
import { oktaAuth1 } from './login/okta-config/okta-config';
import { SunilProfile } from './sunil-profile/sunil-profile';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SunilProfile, OktaAuthModule],
  providers: [
    { provide: OKTA_AUTH, useValue: oktaAuth1 }
  ],

  template: `<router-outlet></router-outlet>`
})

export class App {
}

