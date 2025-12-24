import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { ErrorHandlerService } from './error-handler.service';
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
  private errorHandlerService = inject(ErrorHandlerService);

  showLastUsed = false;
  email = '';
  password = '';
  isLoading = false;

  ngOnInit() {
    try {
      this.showLastUsed = localStorage.getItem('lastUsed') === 'true';
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      this.showLastUsed = false;
    }
  }

  async loginWithGoogle() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    try {
      await this.authService.retryAuthOperation(() => 
        this.authService.loginWithGoogle('login')
      );
    } catch (error: any) {
      console.error('Google login error:', error);
      
      if (error.message === "Account does not exist. Please sign up.") {
        this.router.navigate(['/account-not-found']);
      } else {
        this.errorHandlerService.handleAuthError(error, {
          component: 'LoginComponent',
          operation: 'Google login'
        });
      }
    } finally {
      this.isLoading = false;
    }
  }

  async loginWithEmail() {
    if (!this.email || !this.password || this.isLoading) return;
    
    this.isLoading = true;
    try {
      await this.authService.retryAuthOperation(() => 
        this.authService.loginWithEmail(this.email, this.password)
      );
    } catch (error: any) {
      console.error('Email login error:', error);
      this.errorHandlerService.handleAuthError(error, {
        component: 'LoginComponent',
        operation: 'email login',
        userEmail: this.email
      });
    } finally {
      this.isLoading = false;
    }
  }

  // Getter to expose auth service loading state
  get authLoading() {
    return this.authService.isLoading();
  }

  // Getter to expose auth service error state
  get authError() {
    return this.authService.authError();
  }
}
