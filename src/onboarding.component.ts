import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface OnboardingState {
  step: number;
  fullName: string;
  email: string;
  password: string;
  teamSize: string | null;
  role: string | null;
  goal: string | null;
}

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class OnboardingComponent {
  state = signal<OnboardingState>({
    step: 1,
    fullName: '',
    email: '',
    password: '',
    teamSize: null,
    role: null,
    goal: null,
  });

  currentStep = computed(() => this.state().step);
  progress = computed(() => ((this.state().step - 1) / 3) * 100);

  teamSizeOptions = ['1-5', '6-20', '21-100', '101-500', '500+ members'];
  roleOptions = ['Founder / C-level', 'Sales', 'Marketing', 'Operations', 'Product / Engineering', 'Other'];
  goalOptions = [
    'Manage my pipeline',
    'Automate workflows',
    'Improve team productivity',
    'Get better reports',
    'Integrate with my tools',
    'Something else',
  ];

  constructor(private router: Router) {}

  nextStep(): void {
    if (!this.isCurrentStepValid()) return;

    if (this.state().step < 4) {
      this.state.update((s) => ({ ...s, step: s.step + 1 }));
    } else {
      // Finish onboarding and navigate to the main app dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  prevStep(): void {
    if (this.state().step > 1) {
      this.state.update((s) => ({ ...s, step: s.step + 1 }));
    }
  }

  selectOption(field: 'teamSize' | 'role' | 'goal', value: string): void {
    this.state.update((s) => ({ ...s, [field]: value }));
    // Automatically move to next step after selection for a smoother UX
    setTimeout(() => this.nextStep(), 200);
  }

  onInput(field: 'fullName' | 'email' | 'password', event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.state.update((s) => ({ ...s, [field]: value }));
  }

  isStep1Valid = computed(() => {
    const { fullName, email, password } = this.state();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      fullName.trim().length > 2 &&
      emailRegex.test(email) &&
      password.length >= 8
    );
  });

  isStep2Valid = computed(() => this.state().teamSize !== null);
  isStep3Valid = computed(() => this.state().role !== null);
  isStep4Valid = computed(() => this.state().goal !== null);

  isCurrentStepValid = computed(() => {
    switch (this.state().step) {
      case 1:
        return this.isStep1Valid();
      case 2:
        return this.isStep2Valid();
      case 3:
        return this.isStep3Valid();
      case 4:
        return this.isStep4Valid();
      default:
        return false;
    }
  });
}
