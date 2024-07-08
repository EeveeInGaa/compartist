import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-compare-artists',
  standalone: true,
  imports: [],
  templateUrl: './compare-artists.component.html',
  styleUrl: './compare-artists.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompareArtistsComponent {}
