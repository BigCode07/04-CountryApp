import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/top-menu/country-search-input/country-search-input.component';

@Component({
  selector: 'app-by-capital',
  imports: [CountrySearchInputComponent],
  templateUrl: './by-capital.component.html',
})
export class ByCapitalComponent {}
