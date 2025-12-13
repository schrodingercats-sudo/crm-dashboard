import { ChangeDetectionStrategy, Component, signal, OnInit, OnDestroy } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  imports: [NgOptimizedImage, RouterLink, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = signal(false);
  titleNumber = signal(0);
  titles = ["amazing", "new", "wonderful", "beautiful", "smart"];
  private timeoutId: any;

  logos = [
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/asana.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/slack.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/webflow.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/atlassian.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/jira.svg',
  ];

  ngOnInit() {
    this.startAnimationLoop();
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  startAnimationLoop() {
    this.timeoutId = setTimeout(() => {
      if (this.titleNumber() === this.titles.length - 1) {
        this.titleNumber.set(0);
      } else {
        this.titleNumber.update(n => n + 1);
      }
      this.startAnimationLoop();
    }, 2000);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(isOpen => !isOpen);
  }
}