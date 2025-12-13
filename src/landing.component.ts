import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { QuoteBannerComponent } from './components/quote-banner/quote-banner.component';
import { FeaturesTrioComponent } from './components/features-trio/features-trio.component';
import { StatsMissionComponent } from './components/stats-mission/stats-mission.component';
import { DataModelFeatureComponent } from './components/data-model-feature/data-model-feature.component';
import { FaqComponent } from './components/faq/faq.component';
import { CtaFooterComponent } from './components/cta-footer/cta-footer.component';
import { FooterSectionComponent } from './components/ui/footer-section/footer-section.component';
import { FeaturesComponent } from './components/features/features.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroSectionComponent,
    QuoteBannerComponent,
    FeaturesTrioComponent,
    StatsMissionComponent,
    DataModelFeatureComponent,
    FaqComponent,
    CtaFooterComponent,
    FooterSectionComponent,
    FeaturesComponent,
  ],
})
export class LandingComponent { }