import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapping/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map();

  searchByCapital(query: string): Observable<Country[]> {
    const url = `${API_URL}/capital/${query}`;

    query = query.toLocaleLowerCase();
    // console.log(`Emitiendo valor ${query}`);
    // return of([]);

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se pudo obtener la capital ${query} `)
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const url = `${API_URL}/name/${query}`;

    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),

      catchError((error) => {
        return throwError(
          () => new Error(`No se pudo obtener el pais: ${query}`)
        );
      })
    );
  }

  searchCountryByCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),

      catchError((error) => {
        return throwError(
          () => new Error(`No se pudo obtener el pais con ese codigo ${code}`)
        );
      })
    );
  }
}
