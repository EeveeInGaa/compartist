import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {}
