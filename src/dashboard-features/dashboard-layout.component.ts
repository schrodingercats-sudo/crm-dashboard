
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MobileSidebarComponent } from './mobile-sidebar/mobile-sidebar.component';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    templateUrl: './dashboard-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, SidebarComponent, HeaderComponent, MobileSidebarComponent]
})
export class DashboardLayoutComponent {
    mobileSidebarOpen = signal(false);

    toggleMobileSidebar() {
        this.mobileSidebarOpen.update(value => !value);
    }
}
