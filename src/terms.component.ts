import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavbarComponent, FooterComponent],
})
export class TermsComponent { }
