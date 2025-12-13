import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterSectionComponent } from './components/ui/footer-section/footer-section.component';

@Component({
    selector: 'app-help',
    standalone: true,
    imports: [CommonModule, NavbarComponent, FooterSectionComponent, RouterLink],
    templateUrl: './help.component.html'
})
export class HelpComponent { }
