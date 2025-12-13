import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterSectionComponent } from './components/ui/footer-section/footer-section.component';

@Component({
    selector: 'app-changelog',
    standalone: true,
    imports: [CommonModule, NavbarComponent, FooterSectionComponent],
    templateUrl: './changelog.component.html'
})
export class ChangelogComponent { }
