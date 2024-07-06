import { Component, inject, signal } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Router, RouterLink } from '@angular/router';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { SearchService } from '../../services/search.service';
import {
  TranslocoDirective,
  TranslocoPipe,
  TranslocoService,
} from '@jsverse/transloco';
import { Artist } from '../../interfaces/artist.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SearchComponent,
    RouterLink,
    SearchResultsComponent,
    TranslocoPipe,
    TranslocoDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
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
