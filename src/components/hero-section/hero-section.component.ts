import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  imports: [NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
   isMobileMenuOpen = signal(false);

   logos = [
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/asana.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/slack.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/webflow.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/atlassian.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/jira.svg',
  ];

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(isOpen => !isOpen);
  }
}