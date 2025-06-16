import { OktaAuth } from '@okta/okta-auth-js';

export const oktaConfig_S = {
  clientId: 'CLIENT ID',
  issuer: 'https://YOUR_OKTA_DOMAIN/oauth2/default',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  tokenManager: {
    storage: 'localStorage'
  }
};

export const oktaAuth1 = new OktaAuth(oktaConfig_S);
