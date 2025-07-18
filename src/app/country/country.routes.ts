import { Routes } from "@angular/router";
import { RegisterPageComponent } from "../shared/components/register-page/register-page.component";
import { CountryPageComponent } from "./pages/country-page/country-page.component";



export const countryRoutes: Routes = [

  {
    path: '',
    component: CountryPageComponent,
  },
];
