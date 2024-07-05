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
      import('./components/artist-list/artist-list.component').then(
        (m) => m.ArtistListComponent,
      ),
    /*children: [
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('./artist-detail/artist-detail.component').then(
            (m) => m.ArtistDetailComponent,
          ),
      },
    ],*/
  },
  {
    path: 'compare-artists',
    loadComponent: () =>
      import('./components/compare-artists/compare-artists.component').then(
        (m) => m.CompareArtistsComponent,
      ),
  },
  {
    path: 'search-results',
    loadComponent: () =>
      import('./components/search-results/search-results.component').then(
        (m) => m.SearchResultsComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
