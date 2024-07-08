import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ca-compare-artists',
  standalone: true,
  imports: [],
  templateUrl: './compare-artists.component.html',
  styleUrl: './compare-artists.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompareArtistsComponent {}
