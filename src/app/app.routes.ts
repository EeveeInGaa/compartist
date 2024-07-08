import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'artist-list',
  },
  {
    path: 'artist-list',
    loadComponent: () =>
      import('./pages/artist-list/artist-list.component').then(
        (m) => m.ArtistListComponent,
      ),
  },
  {
    path: 'artist-list/detail/:name',
    loadComponent: () =>
      import('./pages/artist-detail/artist-detail.component').then(
        (m) => m.ArtistDetailComponent,
      ),
  },
  {
    path: 'search-results',
    loadComponent: () =>
      import('./pages/search-results/search-results.component').then(
        (m) => m.SearchResultsComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
