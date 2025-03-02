import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-by-country',
  imports: [],
  templateUrl: './by-country.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryComponent { }
