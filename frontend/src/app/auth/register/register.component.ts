import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email: string = ''; // Variable to store the email entered by the user
  password: string = ''; // Variable to store the password entered by the user
  errorMessage: string = ''; // Variable to store any error messages

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.email, this.password).subscribe(
      () => {
        this.errorMessage = '';
      },
      (error: any) => {
        this.errorMessage = error.error;
      }
    );
  }
}
