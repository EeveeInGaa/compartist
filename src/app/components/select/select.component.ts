import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Countries } from '../../utils/interfaces/countries.interface';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'ca-select',
  imports: [FormsModule, TranslocoPipe],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  selectedCountry = input.required<string>();
  countries = input.required<Countries[]>();
  selectCountry = output<string>();

  onSelectCountry(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectCountry.emit(value);
  }
}
