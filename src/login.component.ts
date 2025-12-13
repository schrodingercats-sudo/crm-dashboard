import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class LoginComponent {
  private router = inject(Router);

  login(): void {
    // In a real application, this would involve authentication logic.
    // For this demo, we'll navigate directly to the dashboard.
    this.router.navigate(['/dashboard']);
  }
}
