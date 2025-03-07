import { Country } from './../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, of, tap } from 'rxjs';
import { CountryMapper } from '../mapping/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    const url = `${API_URL}/capital/${query}`;

    query = query.toLocaleLowerCase();

    console.log(this.queryCacheCapital);
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    console.log(`Llegando al servidor por ${query} `);

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
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
    console.log(this.queryCacheCountry);
    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }
    console.log(`Llegando al servidor ${query}`);

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((country) => this.queryCacheCountry.set(query, country)),
      catchError((error) => {
        console.log('Error fetching', error);
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
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se pudo obtener el pais con ese codigo ${code}`)
        );
      })
    );
  }

  searchByRegion(region: Region) {
    const url = `${API_URL}/region/${region}`;

    console.log(this.queryCacheRegion);
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    console.log(`Llegando al servidor ${region}`);

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () =>
            new Error(`No se pudo obtener la region con ese boton ${region}`)
        );
      })
    );
  }
}
