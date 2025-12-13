import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule, CommonModule],
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  showLastUsed = false;
  email = '';
  password = '';

  ngOnInit() {
    this.showLastUsed = localStorage.getItem('lastUsed') === 'true';
  }

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle('login');
    } catch (error: any) {
      console.error(error);
      if (error.message === "Account does not exist. Please sign up.") {
        this.router.navigate(['/account-not-found']);
      } else {
        alert(error.message);
      }
    }
  }

  async loginWithEmail() {
    if (!this.email || !this.password) return;
    try {
      await this.authService.loginWithEmail(this.email, this.password);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }
}
