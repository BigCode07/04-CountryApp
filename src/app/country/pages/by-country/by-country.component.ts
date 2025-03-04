import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country.component.html',
})
export class ByCountryComponent {
  countryService = inject(CountryService);
  query = signal('');

  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.query)
  //     );
  //   },
  // });

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.countryService.searchByCountry(request.query);
    },
  });
}

// Inyecta el servicio CountryService en la clase para poder usarlo. Esto significa que la clase podrá acceder a las funciones definidas en CountryService
// Crea una señal (signal), que es una forma reactiva de manejar datos en Angular. Inicialmente, la señal query tiene un valor vacío ('').
// Define un recurso (resource), que es una forma de manejar datos asíncronos de manera reactiva en Angular.
