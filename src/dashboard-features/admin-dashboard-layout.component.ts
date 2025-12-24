import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MobileSidebarComponent } from './mobile-sidebar/mobile-sidebar.component';

@Component({
    selector: 'app-admin-dashboard-layout',
    standalone: true,
    templateUrl: './admin-dashboard-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, AdminSidebarComponent, HeaderComponent, MobileSidebarComponent]
})
export class AdminDashboardLayoutComponent {
    mobileSidebarOpen = signal(false);

    toggleMobileSidebar() {
        this.mobileSidebarOpen.update(value => !value);
    }
}