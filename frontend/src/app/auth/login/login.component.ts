import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = ''; // Variable to store the email entered by the user
  password: string = ''; // Variable to store the password entered by the user
  errorMessage: string = ''; // Variable to store the error message displayed to the user

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        if (response) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.router.navigate(['/dashboard']);
        }
      },
      (error: any) => {
        this.errorMessage = error.error;
      }
    );
  }
}
