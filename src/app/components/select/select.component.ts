import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Countries } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
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
