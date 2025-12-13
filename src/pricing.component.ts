import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pricing',
    templateUrl: './pricing.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavbarComponent, FooterComponent, RouterLink],
})
export class PricingComponent { }
