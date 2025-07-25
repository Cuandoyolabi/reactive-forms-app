import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../services/country.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  fb = inject(FormBuilder);
  countryService = inject(CountryService);
  regions = signal(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ["", Validators.required],
    country: ["", Validators.required],
    border: ["", Validators.required],
  });

  onFormChanged = effect( ( onCleanup ) => {
      const regionSubscription = this.onRegionChanged();

      onCleanup(() => {
        regionSubscription.unsubscribe();
        console.log("Limpio")
      })
  });

  onRegionChanged(){
    return this.myForm.get('region')!.valueChanges.pipe(tap((region) => console.log({region})))
      .subscribe((region) => {});
  }


}
