import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from './country.interface';

@Injectable({providedIn: 'root'})
export class CountryService {

  private baseUrl = "https://restcountries.com/v3.1";
  private http = inject(HttpClient);

  private _regions = [
    "Africa",
    "America",
    "Asia",
    "Europa",
    "Oceania",
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]>{
    if ( !region ) return of([]);

    console.log({region});

    const url = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCOde(aplhaCode: string): Observable <Country>{

    const url = `${ this.baseUrl }/alpha/${ aplhaCode }?fields=cca3,name,borders`;
    return this.http.get<Country>(url);

  }

  getCountryBorderByCodes( border: string[]){
      const url = `${ this.baseUrl }/border/${ border }?fields=cca3,name,borders`;
      return this.http.get<Country>(url);
  }

}
