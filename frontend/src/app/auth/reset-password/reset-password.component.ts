import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  token: string = ''; // Variable to store the reset token
  newPassword: string = ''; // Variable to store the new password
  errorMessage: string = ''; // Variable to store any error messages

  constructor(private authService: AuthService) {}

  resetPassword() {
    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      () => {
        this.errorMessage = '';
      },
      (error: any) => {
        this.errorMessage = error.error;
      }
    );
  }
}
