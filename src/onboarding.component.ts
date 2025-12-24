import { ChangeDetectionStrategy, Component, computed, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';
import { ToastService } from './toast.service';

interface OnboardingState {
  step: number;
  fullName: string;
  email: string;
  password: string;
  teamSize: string | null;
  role: string | null;
  goal: string | null;
  company: string;
  jobTitle: string;
  phone: string;
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
    company: '',
    jobTitle: '',
    phone: '',
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

  private router = inject(Router);
  private authService = inject(AuthService);
  private supabaseService = inject(SupabaseService);
  private toastService = inject(ToastService);

  isLoading = signal<boolean>(false);

  constructor() {
    // Check if user is already authenticated and has completed onboarding
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.checkOnboardingStatus(currentUser.uid);
    }
  }

  private async checkOnboardingStatus(userId: string) {
    try {
      const hasCompleted = await this.supabaseService.hasCompletedOnboarding(userId);
      if (hasCompleted) {
        // User has already completed onboarding, redirect to dashboard
        const user = this.authService.currentUser();
        if (user && user.email) {
          if (this.authService.isAdmin(user.email)) {
            this.router.navigate(['/admin/dashboard/overview']);
          } else {
            this.router.navigate(['/user/dashboard/overview']);
          }
        }
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  }

  async nextStep(): Promise<void> {
    if (!this.isCurrentStepValid()) return;

    // If we're on step 1 and user is not authenticated, create account first
    if (this.state().step === 1 && !this.authService.currentUser()) {
      await this.signUp();
      return; // signUp will handle navigation after successful account creation
    }

    if (this.state().step < 4) {
      this.state.update((s) => ({ ...s, step: s.step + 1 }));
    } else {
      // Finish onboarding and save data to Supabase
      this.completeOnboarding();
    }
  }

  async completeOnboarding() {
    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      this.toastService.show('Please log in to complete onboarding', 'error');
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading.set(true);
    
    try {
      const onboardingData = {
        full_name: this.state().fullName,
        company: this.state().teamSize, // Using teamSize as company size for now
        job_title: this.state().role,
        phone: this.state().phone || '',
        // Store additional onboarding info in a structured way
        onboarding_data: {
          teamSize: this.state().teamSize,
          role: this.state().role,
          goal: this.state().goal
        }
      };

      await this.supabaseService.completeOnboarding(currentUser.uid, onboardingData);
      
      this.toastService.show('Onboarding completed successfully!', 'success');
      
      // Navigate to appropriate dashboard
      if (this.authService.isAdmin(currentUser.email)) {
        this.router.navigate(['/admin/dashboard/overview']);
      } else {
        this.router.navigate(['/user/dashboard/overview']);
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      this.toastService.show('Failed to complete onboarding. Please try again.', 'error');
    } finally {
      this.isLoading.set(false);
    }
  }

  async signUpWithGoogle() {
    this.isLoading.set(true);
    try {
      const user = await this.authService.loginWithGoogle('signup');
      // After Google signup, user will be redirected here if onboarding is not complete
      // Pre-fill the form with Google data
      if (user) {
        this.state.update(s => ({
          ...s,
          fullName: user.displayName || '',
          email: user.email || ''
        }));
      }
    } catch (error) {
      console.error('Google signup error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async signUp() {
    const { email, password, fullName } = this.state();
    this.isLoading.set(true);
    try {
      const user = await this.authService.signUpWithEmail(email, password);
      // After email signup, user will be redirected here if onboarding is not complete
      // Move to next step since account creation was successful
      if (user) {
        this.state.update(s => ({ ...s, step: 2 }));
      }
    } catch (error) {
      console.error('Email signup error:', error);
      // Error is already handled by AuthService, just reset loading state
    } finally {
      this.isLoading.set(false);
    }
  }

  prevStep(): void {
    if (this.state().step > 1) {
      this.state.update((s) => ({ ...s, step: s.step - 1 }));
    }
  }

  selectOption(field: 'teamSize' | 'role' | 'goal', value: string): void {
    this.state.update((s) => ({ ...s, [field]: value }));
    // Automatically move to next step after selection for a smoother UX
    setTimeout(() => this.nextStep(), 200);
  }

  onInput(field: 'fullName' | 'email' | 'password' | 'company' | 'jobTitle' | 'phone', event: Event): void {
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
