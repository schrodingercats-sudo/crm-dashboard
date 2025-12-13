import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavbarComponent, FooterComponent],
})
export class PrivacyComponent { }
