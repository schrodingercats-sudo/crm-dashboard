import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Facebook, Instagram, Youtube, Linkedin, Frame } from 'lucide-angular';

interface FooterLink {
  title: string;
  href: string;
  icon?: any;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <footer class="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
      <div class="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur"></div>

      <div class="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <div class="space-y-4 flex flex-col items-center text-center">
          <lucide-icon [name]="FrameIcon" class="size-8"></lucide-icon>
          <p class="text-muted-foreground mt-8 text-sm md:mt-0">
            © {{ currentYear }} Asme. All rights reserved.
          </p>
        </div>

        <div class="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          <div *ngFor="let section of footerLinks" class="mb-10 md:mb-0 flex flex-col items-center text-center">
            <h3 class="text-xs font-semibold">{{ section.label }}</h3>
            <ul class="text-muted-foreground mt-4 space-y-2 text-sm flex flex-col items-center">
              <li *ngFor="let link of section.links">
                <a
                  [href]="link.href"
                  class="hover:text-foreground inline-flex items-center transition-all duration-300"
                >
                  <lucide-icon *ngIf="link.icon" [name]="link.icon" class="me-1 size-4"></lucide-icon>
                  {{ link.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterSectionComponent {
  currentYear = new Date().getFullYear();
  readonly FrameIcon = Frame;

  footerLinks: FooterSection[] = [
    {
      label: 'Product',
      links: [
        { title: 'Features', href: '#features' },
        { title: 'Pricing', href: '#pricing' },
        { title: 'Testimonials', href: '#testimonials' },
        { title: 'Integration', href: '/' },
      ],
    },
    {
      label: 'Company',
      links: [
        { title: 'FAQs', href: '/faqs' },
        { title: 'About Us', href: '/about' },
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Services', href: '/terms' },
      ],
    },
    {
      label: 'Resources',
      links: [
        { title: 'Blog', href: '/blog' },
        { title: 'Changelog', href: '/changelog' },
        { title: 'Brand', href: '/brand' },
        { title: 'Help', href: '/help' },
      ],
    },
    {
      label: 'Social Links',
      links: [
        { title: 'Facebook', href: '#', icon: Facebook },
        { title: 'Instagram', href: '#', icon: Instagram },
        { title: 'Youtube', href: '#', icon: Youtube },
        { title: 'LinkedIn', href: '#', icon: Linkedin },
      ],
    },
  ];
}
