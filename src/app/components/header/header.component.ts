import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Router, RouterLink } from '@angular/router';
import { SearchResultsComponent } from '../../pages/search-results/search-results.component';
import { SearchService } from '../../utils/services/search.service';
import {
  TranslocoDirective,
  TranslocoPipe,
  TranslocoService,
} from '@jsverse/transloco';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'ca-header',
  standalone: true,
  imports: [
    SearchComponent,
    RouterLink,
    SearchResultsComponent,
    TranslocoPipe,
    TranslocoDirective,
    LogoComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private searchService = inject(SearchService);
  private router = inject(Router);
  private translocoService = inject(TranslocoService);

  currentLanguage = signal<string>(this.translocoService.getActiveLang());
  availableLanguages = signal(this.translocoService.getAvailableLangs());

  typeSearchTerm(term: string) {
    if (term.trim() === '') {
      this.router.navigate(['/']);
    } else {
      this.searchService.setSearchTerm(term);
      this.router.navigate(['/search-results'], {
        queryParams: { term: term },
      });
    }
  }

  changeLanguage(language: string) {
    this.currentLanguage.set(language);
    this.translocoService.setActiveLang(language);
  }
}
