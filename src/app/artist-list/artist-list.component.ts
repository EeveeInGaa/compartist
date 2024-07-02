import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListItemComponent } from '../list-item/list-item.component';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [RouterLink, ListItemComponent, SelectComponent],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css',
})
export class ArtistListComponent {
  items = [
    { id: 1, name: 'Artist 1' },
    { id: 2, name: 'Artist 2' },
    { id: 3, name: 'Artist 3' },
  ];
}
