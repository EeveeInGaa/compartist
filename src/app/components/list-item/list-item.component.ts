import { Component, input, signal } from '@angular/core';
import { Artist } from '../../interfaces/artist.interface';
import { DecimalPipe } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [DecimalPipe, CardComponent],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
})
export class ListItemComponent {
  artist = input<Artist>();
  number = input<number>();
}
