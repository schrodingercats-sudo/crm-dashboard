import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LucideAngularModule, Map, Calendar } from 'lucide-angular';
import { CardComponent, CardHeaderComponent, CardContentComponent } from '../ui/card/card.component';
import { cn } from '../../lib/utils';

@Component({
  selector: 'app-card-decorator',
  standalone: true,
  template: `
    <span class="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
    <span class="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
    <span class="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
    <span class="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
  `
})
export class CardDecoratorComponent { }

@Component({
  selector: 'app-dual-mode-image',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <img
        [ngSrc]="darkSrc"
        [class]="cn('hidden dark:block', className)"
        [alt]="alt + ' dark'"
        [width]="width"
        [height]="height"
    />
    <img
        [ngSrc]="lightSrc"
        [class]="cn('shadow dark:hidden', className)"
        [alt]="alt + ' light'"
        [width]="width"
        [height]="height"
    />
  `
})
export class DualModeImageComponent {
  @Input() darkSrc!: string;
  @Input() lightSrc!: string;
  @Input() alt!: string;
  @Input() width!: number;
  @Input() height!: number;
  @Input() className: string = '';

  cn = cn;
}

@Component({
  selector: 'app-circular-ui',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="className">
        <div class="bg-gradient-to-b from-border size-fit rounded-2xl to-transparent p-px">
            <div class="bg-gradient-to-b from-background to-muted/25 relative flex aspect-square w-fit items-center -space-x-4 rounded-[15px] p-4">
                <div *ngFor="let circle of circles"
                    [class]="getCircleClasses(circle)"
                ></div>
            </div>
        </div>
        <span class="text-muted-foreground mt-1.5 block text-center text-sm">{{ label }}</span>
    </div>
  `
})
export class CircularUIComponent {
  @Input() label!: string;
  @Input() circles: { pattern: 'none' | 'border' | 'primary' | 'blue' }[] = [];
  @Input() className: string = '';

  getCircleClasses(circle: { pattern: string }) {
    return cn('size-7 rounded-full border sm:size-8', {
      'border-primary': circle.pattern === 'none',
      'border-primary bg-[repeating-linear-gradient(-45deg,hsl(var(--border)),hsl(var(--border))_1px,transparent_1px,transparent_4px)]': circle.pattern === 'border',
      'border-primary bg-background bg-[repeating-linear-gradient(-45deg,hsl(var(--primary)),hsl(var(--primary))_1px,transparent_1px,transparent_4px)]': circle.pattern === 'primary',
      'bg-background z-1 border-blue-500 bg-[repeating-linear-gradient(-45deg,theme(colors.blue.500),theme(colors.blue.500)_1px,transparent_1px,transparent_4px)]': circle.pattern === 'blue',
    });
  }
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,

    CardDecoratorComponent,
    DualModeImageComponent,
    CircularUIComponent
  ],
  template: `
    <section class="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
      <div class="mx-auto max-w-2xl px-6 lg:max-w-5xl">
        <div class="mx-auto grid gap-4 lg:grid-cols-2">
          
          <!-- Feature 1 -->
          <app-card class="group relative rounded-none shadow-zinc-950/5">
            <app-card-decorator></app-card-decorator>
            <app-card-header class="pb-3">
              <div class="p-6 flex flex-col items-center text-center">
                <span class="text-muted-foreground flex items-center gap-2 justify-center">
                  <lucide-icon [name]="MapIcon" class="size-4"></lucide-icon>
                  Real time location tracking
                </span>
                <p class="mt-8 text-2xl font-semibold">Advanced tracking system, Instantly locate all your assets.</p>
              </div>
            </app-card-header>

            <div class="relative mb-6 border-t border-dashed sm:mb-0">
              <div class="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,hsl(var(--muted)),white_125%)]"></div>
              <div class="aspect-[76/59] p-1 px-6">
                 <app-dual-mode-image
                    darkSrc="https://tailark.com/_next/image?url=%2Fpayments.png&w=3840&q=75"
                    lightSrc="https://tailark.com/_next/image?url=%2Fpayments-light.png&w=3840&q=75"
                    alt="payments illustration"
                    [width]="1207"
                    [height]="929"
                ></app-dual-mode-image>
              </div>
            </div>
          </app-card>

          <!-- Feature 2 -->
          <app-card class="group relative rounded-none shadow-zinc-950/5">
            <app-card-decorator></app-card-decorator>
            <app-card-header class="pb-3">
               <div class="p-6 flex flex-col items-center text-center">
                <span class="text-muted-foreground flex items-center gap-2 justify-center">
                  <lucide-icon [name]="CalendarIcon" class="size-4"></lucide-icon>
                  Advanced Scheduling
                </span>
                <p class="mt-8 text-2xl font-semibold">Scheduling system, Instantly locate all your assets.</p>
              </div>
            </app-card-header>

            <app-card-content>
              <div class="relative mb-6 sm:mb-0">
                <div class="absolute -inset-6 [background:radial-gradient(50%_50%_at_75%_50%,transparent,hsl(var(--background))_100%)]"></div>
                <div class="aspect-[76/59] border">
                  <app-dual-mode-image
                        darkSrc="https://tailark.com/_next/image?url=%2Forigin-cal-dark.png&w=3840&q=75"
                        lightSrc="https://tailark.com/_next/image?url=%2Forigin-cal.png&w=3840&q=75"
                        alt="calendar illustration"
                        [width]="1207"
                        [height]="929"
                    ></app-dual-mode-image>
                </div>
              </div>
            </app-card-content>
          </app-card>

          <!-- Feature 3 -->
          <app-card class="group relative rounded-none shadow-zinc-950/5 p-6 lg:col-span-2">
            <app-card-decorator></app-card-decorator>
            <p class="mx-auto my-6 max-w-md text-balance text-center text-2xl font-semibold">Smart scheduling with automated reminders for maintenance.</p>

            <div class="flex justify-center gap-6 overflow-hidden">
               <app-circular-ui
                    label="Inclusion"
                    [circles]="[{ pattern: 'border' }, { pattern: 'border' }]"
                ></app-circular-ui>

                <app-circular-ui
                    label="Inclusion"
                    [circles]="[{ pattern: 'none' }, { pattern: 'primary' }]"
                ></app-circular-ui>

                <app-circular-ui
                    label="Join"
                    [circles]="[{ pattern: 'blue' }, { pattern: 'none' }]"
                ></app-circular-ui>

                <app-circular-ui
                    label="Exclusion"
                    [circles]="[{ pattern: 'primary' }, { pattern: 'none' }]"
                    class="hidden sm:block"
                ></app-circular-ui>
            </div>
          </app-card>

        </div>
      </div>
    </section>
  `
})
export class FeaturesComponent {
  readonly MapIcon = Map;
  readonly CalendarIcon = Calendar;
}
