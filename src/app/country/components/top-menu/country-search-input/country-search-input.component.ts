import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {
  onSearch(value: string) {
    console.log(value);
  }
}
