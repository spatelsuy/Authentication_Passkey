import { Component, inject } from '@angular/core';
import { OktaAuth, IDToken, AccessToken } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import { NgIf } from '@angular/common'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, NgIf],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})

export class Welcome {
  private oktaAuth = inject<OktaAuth>(OKTA_AUTH);

  idToken: IDToken | null = null;
  accessToken: AccessToken | null = null;
  userInfo: any = null;
  idTokenStr: string | null = null;
  accessTokenStr: string | null = null;
  idTokenLife: string | null = null;
  accessTokenLife: string | null = null;

  async ngOnInit() {
    const myToken = await this.oktaAuth.tokenManager.get('idToken');
	this.idTokenStr = myToken ? (myToken as IDToken).idToken : null;
	if (myToken) {
		this.idToken = myToken as IDToken;
		this.idTokenLife = new Date(myToken.expiresAt * 1000).toLocaleTimeString();
	} else {
		this.idToken = null;
	}
    const myAccessToken = await this.oktaAuth.tokenManager.get('accessToken');
	this.accessTokenStr = myAccessToken ? (myAccessToken as AccessToken).accessToken : null;
	if (myAccessToken) {
		this.accessToken = myAccessToken as AccessToken;
		this.accessTokenLife = new Date(myAccessToken.expiresAt * 1000).toLocaleTimeString();
	} else {
		this.accessToken = null;
	}	

    this.userInfo = await this.oktaAuth.getUser(); // based on idToken

    console.log('ID Token:', this.idToken);
    console.log('Access Token:', this.accessToken);
    console.log('User Info:', this.userInfo);
  }
  decodeJwt(token: string): any {
	const payload = token.split('.')[1];
	return JSON.parse(atob(payload));
  }
  
  logout(): void {
    const oktaDomain = 'https://dev-09971645.okta.com';
    const postLogoutRedirectUri = encodeURIComponent('http://localhost:4200'); // Change as needed
    const logoutUrl = `${oktaDomain}/oauth2/default/v1/logout?id_token_hint=${this.idTokenStr}&post_logout_redirect_uri=${postLogoutRedirectUri}`;

    // Optional: clear local storage or token services
    localStorage.clear(); 

    // Redirect to Okta logout
    window.location.href = logoutUrl;
  }
}
