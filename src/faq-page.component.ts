import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterSectionComponent } from './components/ui/footer-section/footer-section.component';

@Component({
    selector: 'app-faq-page',
    standalone: true,
    imports: [CommonModule, RouterLink, NavbarComponent, FooterSectionComponent],
    templateUrl: './faq-page.component.html'
})
export class FaqPageComponent { }
