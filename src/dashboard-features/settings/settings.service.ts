import { Injectable, signal, effect, inject } from '@angular/core';

export interface SettingsState {
    profile: {
        name: string;
        email: string;
        bio: string;
    };
    notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
    };
    appearance: {
        theme: 'light' | 'dark';
    };
}

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private readonly STORAGE_KEY = 'zyptenix_settings';

    settings = signal<SettingsState>({
        profile: {
            name: 'Prathamesh',
            email: 'prath@example.com',
            bio: 'Full Stack Developer | Angular Enthusiast'
        },
        notifications: {
            email: true,
            sms: false,
            push: true
        },
        appearance: {
            theme: 'light'
        }
    });

    constructor() {
        this.loadSettings();

        // Effect to apply theme whenever it changes
        effect(() => {
            const theme = this.settings().appearance.theme;
            this.applyTheme(theme);
        });

        // Effect to save settings whenever they change
        effect(() => {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settings()));
        });
    }

    private loadSettings() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.settings.set({ ...this.settings(), ...parsed });
            } catch (e) {
                console.error('Failed to parse settings', e);
            }
        }
    }

    private applyTheme(theme: 'light' | 'dark') {
        const htmlElement = document.documentElement;
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }

    updateProfile(partialProfile: Partial<SettingsState['profile']>) {
        this.settings.update(s => ({
            ...s,
            profile: { ...s.profile, ...partialProfile }
        }));
    }

    updateNotifications(partialNotif: Partial<SettingsState['notifications']>) {
        this.settings.update(s => ({
            ...s,
            notifications: { ...s.notifications, ...partialNotif }
        }));
    }

    updateAppearance(partialAppearance: Partial<SettingsState['appearance']>) {
        this.settings.update(s => ({
            ...s,
            appearance: { ...s.appearance, ...partialAppearance }
        }));
    }
}
