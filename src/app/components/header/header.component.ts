import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Router, RouterLink } from '@angular/router';
import { SearchService } from '../../utils/services/search.service';
import {
  TranslocoPipe,
  TranslocoService,
} from '@jsverse/transloco';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'ca-header',
  imports: [SearchComponent, TranslocoPipe, LogoComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly translocoService = inject(TranslocoService);

  readonly currentLanguage = signal(this.translocoService.getActiveLang());

  readonly availableLanguages = signal(
    this.translocoService.getAvailableLangs(),
  );

  typeSearchTerm(value: string): void {
    const term = value.trim();

    if (!term) {
      void this.router.navigate(['/']);
      return;
    }

    void this.router.navigate(['/search-results'], {
      queryParams: { term },
    });
  }

  changeLanguage(language: string): void {
    this.currentLanguage.set(language);
    this.translocoService.setActiveLang(language);
  }
}
