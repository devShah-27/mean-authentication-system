import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // Sample data for the dashboard
  username: string = 'John Doe'; // This can be dynamically fetched from API or JWT
  email: string = 'john.doe@example.com'; // This can be dynamically fetched from API or JWT

  constructor(private router: Router) {}

  // Method to handle logout
  logout() {
    // Clear local storage to remove tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Redirect to login page after logging out
    this.router.navigate(['/login']);
  }
}
