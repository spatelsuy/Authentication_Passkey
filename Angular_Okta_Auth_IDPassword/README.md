## Implementing Secure Authentication with Okta in Angular — A Step Toward Passkey Integration  
Passkeys are becoming the future of secure login experiences.  
The long-term goal is to adopt passkeys within our Angular application. However, as a first step and jurney towards security maturity implementing a robust, standards-based authentication (username and password) flow using Okta and PKCE.  

For this implementtion using OIDC (OpenID Connect) with PKCE (Proof Key for Code Exchange) for secure authentication in the Angular SPA.  
-  Okta as the IAM provider
-  PKCE (Proof Key for Code Exchange)
-  Angular standalone components and routing
  
### 1. Setup Okta and register a SPA application for OIDC authentication  
### 2. Setup Okta in Angular 
```
export const oktaConfig = {
  clientId: 'YOUR_CLIENT_ID',
  issuer: 'https://YOUR_OKTA_DOMAIN/oauth2/default',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  tokenManager: {
    storage: 'localStorage'
  }
};  

export const oktaAuth = new OktaAuth(oktaConfig);
```
### 3. Authentication flow
Since PKCE is enabled, we had two options to perform login:  
-  signInWithRedirect(): Directly redirects to Okta for login.
-  signInWithCredentials(): Authenticates using provided credentials and returns a session token.

I chose the signInWithCredentials() approach because
-  This method validates the username and password.
-  Upon successful authentication, it returns a sessionToken.

Then manually invoke signInWithRedirect({ sessionToken, originalUri: '/welcome' }) to initiate the redirect-based authorization code flow.

```
const transaction = await this.oktaAuth.signInWithCredentials({
  username: this.loginId,
  password: this.password
});
const sessionToken = transaction.sessionToken;
await this.oktaAuth.signInWithRedirect({ sessionToken, originalUri: '/welcome' });
```   

### 4. Callback Handling
After redirection, Okta calls the redirect URI defined in both:
-  the oktaConfig.redirectUri in code
-  and the application settings on the Okta Developer Console.  
Example:
```
http://localhost:4200/login/callback
```

### 5. Routing Setup   
In our Angular route configuration (app.routes.ts), we defined the following routes:
```
export const routes: Routes = [
  { path: '', component: SunilProfile },
  { path: 'login', component: Login },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'welcome', component: Welcome }
];
```  
OktaCallbackComponent is the built-in component provided by the @okta/okta-angular SDK.  
After processing the authentication tokens, OktaCallbackComponent automatically redirects the user to the path defined by originalUri, in our case: /welcome.  

### 6. Accessed Tokens and Claims  
On the welcome page for learning purpose and to understand the format of ID Token, Acces Token and expiry duration of the tokens, displaying the user's ID token, Access token, and claims such as email and name. This ensures the identity of the logged-in user is available for secure API access.
```
this.idToken = await oktaAuth.tokenManager.get('idToken');
this.accessToken = await oktaAuth.tokenManager.get('accessToken');
```
