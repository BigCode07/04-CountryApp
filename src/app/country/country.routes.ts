import { Routes } from '@angular/router';
import { ByCapitalComponent } from './pages/by-capital/by-capital.component';
import { CountryLayoutComponent } from './layouts/CountryLayout/CountryLayout.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalComponent,
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      },
    ],
  },
];

export default countryRoutes;
