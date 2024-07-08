import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ca-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}
