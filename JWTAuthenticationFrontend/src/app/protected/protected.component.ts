import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-protected',
  imports: [CommonModule],
  templateUrl: './protected.component.html',
  styleUrl: './protected.component.css'
})
export class ProtectedComponent {
  data = '';

  constructor(private http: HttpClient, private authService: AuthService) {
    // Specify responseType: 'text' since backend returns plain text
    this.http.get('https://localhost:7124/api/protected/data', { responseType: 'text' }).subscribe({
      next: (res) => {
        console.log('Got response:', res);
        this.data = res;
        console.log('Data property is now:', this.data);
      },
      error: (err) => console.error(err)
    });
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}
