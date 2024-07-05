import { Component, inject } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Router, RouterLink } from '@angular/router';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, RouterLink, SearchResultsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private searchService = inject(SearchService);
  private router = inject(Router);

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
}
