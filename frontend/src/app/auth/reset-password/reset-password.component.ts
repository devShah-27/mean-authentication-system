import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  token: string = '';
  newPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  resetPassword() {
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        this.errorMessage = '';
      },
      error: (error: any) => {
        this.errorMessage = error.error;
      },
    });
  }
}
