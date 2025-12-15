import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterSectionComponent } from './components/ui/footer-section/footer-section.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pricing',
    templateUrl: './pricing.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavbarComponent, FooterSectionComponent, RouterLink],
})
export class PricingComponent { }
