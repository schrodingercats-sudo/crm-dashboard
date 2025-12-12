import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  opacity = input<number>(1);
  translateY = input<number>(0);
}