import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FiltroComponent } from './filtro/filtro.component';

const APP_ROUTES: Routes = [
    { path: 'filtro', component: FiltroComponent },
    { path: '', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);