loginId: string = '';
password: string = '';

onLogin(event: Event) {
  event.preventDefault();
  // TODO: Call your IAM system with loginId & password
}

onPasskeyLogin() {
  // TODO: Trigger passkey (WebAuthn) flow here
}
