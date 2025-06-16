import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sunil-profile',
  imports: [],
  templateUrl: './sunil-profile.html',
  styleUrl: './sunil-profile.css'
})
export class SunilProfile {
  protected title = 'sunil kumar patel';
  protected loginIcon = '🔐';
  themeIcon = '🌙';
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    if (isDark) {
      document.body.classList.add('dark-mode');
      this.themeIcon = '☀️';
    }
  }

  toggleTheme(): void {
    document.body.classList.toggle('dark-mode');
    const darkModeOn = document.body.classList.contains('dark-mode');
    this.themeIcon = darkModeOn ? '☀️' : '🌙';
    localStorage.setItem('theme', darkModeOn ? 'dark' : 'light');
  }
  Login() {
	this.router.navigate(['/login']);
  }
}