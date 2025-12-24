import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MobileSidebarComponent } from './mobile-sidebar/mobile-sidebar.component';

@Component({
    selector: 'app-user-dashboard-layout',
    standalone: true,
    templateUrl: './user-dashboard-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, UserSidebarComponent, HeaderComponent, MobileSidebarComponent]
})
export class UserDashboardLayoutComponent {
    mobileSidebarOpen = signal(false);

    toggleMobileSidebar() {
        this.mobileSidebarOpen.update(value => !value);
    }
}