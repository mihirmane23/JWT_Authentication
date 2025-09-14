import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    console.log('Submitting:', { username: this.username, password: this.password }); // Debug log
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.error = '';
        this.router.navigate(['/protected']);
      },
      error: (err) => {
        this.error = err.error || 'Login failed';
        console.error('Login error:', err);
      }
    });
  }
}
