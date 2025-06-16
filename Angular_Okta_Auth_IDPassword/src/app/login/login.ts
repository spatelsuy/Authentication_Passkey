import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { inject, Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { NgIf } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css'
})


export class Login {
  loginId: string = '';
  password: string = '';
  errorMessage: string = '';

	constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}
	
	async login() {
    try {
      const transaction = await this.oktaAuth.signInWithCredentials({
        username: this.loginId,
        password: this.password
      });
	  
		if (transaction.status === 'SUCCESS' && transaction.sessionToken) {
			const sessionToken = transaction.sessionToken;
			// Now you can use sessionToken to redirect
			await this.oktaAuth.signInWithRedirect({ sessionToken, originalUri: '/welcome' });
		} else {
			// Handle other transaction statuses (like MFA required, etc.)
			throw new Error('Login failed or additional steps required');
		}
    } catch (error: unknown) {
		if (error instanceof Error) {
			this.errorMessage = error.message;
		} else {
			this.errorMessage = 'Login failed. Please try again.';
		}
	}
  }
	// await this.oktaAuth.signInWithRedirect(); //when to use this?
  clear(): void {
    this.loginId = '';
    this.password = '';
  }
}