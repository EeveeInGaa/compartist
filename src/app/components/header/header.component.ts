import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';
import { SearchService } from '../../utils/services/search.service';
import {
  TranslocoPipe,
  TranslocoService,
} from '@jsverse/transloco';
import { LogoComponent } from '../logo/logo.component';

@Component({
    selector: 'ca-header',
    imports: [
        SearchComponent,
        TranslocoPipe,
        LogoComponent,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
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
