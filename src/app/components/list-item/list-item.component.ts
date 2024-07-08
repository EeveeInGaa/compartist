import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { Artist } from '../../interfaces/artist.interface';
import { DecimalPipe } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { TranslocoDirective, TranslocoPipe } from '@jsverse/transloco';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'ca-list-item',
  standalone: true,
  imports: [
    DecimalPipe,
    CardComponent,
    TranslocoPipe,
    TranslocoDirective,
    TruncatePipe,
  ],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  artist = input<Artist>();
  number = input<number>();
}
