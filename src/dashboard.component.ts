import { Component, inject, signal, ElementRef } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardTestimonialsComponent } from './components/dashboard-testimonials/dashboard-testimonials.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, DashboardTestimonialsComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  isSidebarCollapsed = signal(true);
  isProfileDropdownOpen = signal(false);
  isMobileSidebarOpen = signal(false);

  toggleProfileDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isProfileDropdownOpen.update(isOpen => !isOpen);
  }

  toggleMobileSidebar(event: MouseEvent): void {
    event.stopPropagation();
    this.isMobileSidebarOpen.update(isOpen => !isOpen);
  }

  onDocumentClick(event: MouseEvent): void {
    // Close dropdown if click is outside
    if (this.isProfileDropdownOpen() && !this.elementRef.nativeElement.querySelector('[data-profile-dropdown]')?.contains(event.target)) {
      this.isProfileDropdownOpen.set(false);
    }
    // Close mobile sidebar if click is outside
    if (this.isMobileSidebarOpen() && !this.elementRef.nativeElement.querySelector('[data-sidebar]')?.contains(event.target)) {
      this.isMobileSidebarOpen.set(false);
    }
  }

  logout(): void {
    this.isProfileDropdownOpen.set(false);
    this.isMobileSidebarOpen.set(false);
    this.router.navigate(['/login']);
  }
}