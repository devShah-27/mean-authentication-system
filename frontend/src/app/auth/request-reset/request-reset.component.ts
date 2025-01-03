import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-request-reset',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './request-reset.component.html',
  styleUrl: './request-reset.component.scss',
})
export class RequestResetComponent {
  email: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  requestReset() {
    this.authService.requestPasswordReset(this.email).subscribe({
      next: () => {
        this.errorMessage = ''; // Clear any previous error messages
      },
      error: (error: any) => {
        this.errorMessage = error.error; // Display error message from the backend
      },
    });
  }
}
