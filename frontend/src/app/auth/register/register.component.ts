import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email: string = ''; // Variable to store the email entered by the user
  password: string = ''; // Variable to store the password entered by the user
  confirmPassword: string = ''; // Variable to store the confirmed password entered by the user
  errorMessage: string = ''; // Variable to store any error messages

  constructor(private authService: AuthService) {}

  register() {
    //Basic client-side validation
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.errorMessage = ''; // Clear any previous error messages
      },
      error: (error: any) => {
        this.errorMessage = error.error; // Display error message from the backend
      },
    });
  }
}
