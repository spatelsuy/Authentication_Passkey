// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { SunilProfile } from './sunil-profile/sunil-profile';
import { Login } from './login/login';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { Welcome } from './welcome/welcome';

export const routes: Routes = [
  { path: '', component: SunilProfile },
  { path: 'login', component: Login },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'welcome', component: Welcome }
];
