import { Component, input, signal } from '@angular/core';
import { Artist } from '../../interfaces/artist.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
})
export class ListItemComponent {
  artist = input<Artist>();
}
