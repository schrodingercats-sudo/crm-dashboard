import { Component, Input, Directive, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../lib/utils';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
    @Input() class: string = '';

    get classes() {
        return cn("rounded-lg border bg-card text-card-foreground shadow-sm", this.class);
    }
}

@Component({
    selector: 'app-card-header',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `
})
export class CardHeaderComponent {
    @Input() class: string = '';

    get classes() {
        return cn("flex flex-col space-y-1.5 p-6", this.class);
    }
}

@Component({
    selector: 'app-card-title',
    standalone: true,
    imports: [CommonModule],
    template: `
    <h3 [class]="classes">
      <ng-content></ng-content>
    </h3>
  `
})
export class CardTitleComponent {
    @Input() class: string = '';

    get classes() {
        return cn("text-2xl font-semibold leading-none tracking-tight", this.class);
    }
}

@Component({
    selector: 'app-card-description',
    standalone: true,
    imports: [CommonModule],
    template: `
    <p [class]="classes">
      <ng-content></ng-content>
    </p>
  `
})
export class CardDescriptionComponent {
    @Input() class: string = '';

    get classes() {
        return cn("text-sm text-muted-foreground", this.class);
    }
}

@Component({
    selector: 'app-card-content',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `
})
export class CardContentComponent {
    @Input() class: string = '';

    get classes() {
        return cn("p-6 pt-0", this.class);
    }
}

@Component({
    selector: 'app-card-footer',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `
})
export class CardFooterComponent {
    @Input() class: string = '';

    get classes() {
        return cn("flex items-center p-6 pt-0", this.class);
    }
}
