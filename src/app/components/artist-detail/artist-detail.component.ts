import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetailComponent {}
