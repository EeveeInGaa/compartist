import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'artist-list',
  },
  {
    path: 'artist-list',
    title: 'Artists | Compartist',
    loadComponent: () =>
      import('./pages/artist-list/artist-list.component').then(
        (m) => m.ArtistListComponent,
      ),
  },
  {
    path: 'artist-list/detail/:name',
    title: 'Artist details | Compartist',
    loadComponent: () =>
      import('./pages/artist-detail/artist-detail.component').then(
        (m) => m.ArtistDetailComponent,
      ),
  },
  {
    path: 'search-results',
    title: 'Search results | Compartist',
    loadComponent: () =>
      import('./pages/search-results/search-results.component').then(
        (m) => m.SearchResultsComponent,
      ),
  },
  {
    path: '**',
    title: 'Page not found | Compartist',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
