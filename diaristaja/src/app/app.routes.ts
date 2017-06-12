import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FiltroComponent } from './filtro/filtro.component';
import { FiltroResultadoComponent } from './filtro-resultado/filtro-resultado.component';
import { LoginComponent } from './login/login.component';
import { DiaristaCadastroComponent } from './diarista-cadastro/diarista-cadastro.component';


const APP_ROUTES: Routes = [
    { path: 'diarista/filtro', component: FiltroComponent },
    { path: 'diarista/filtro-resultado', component: FiltroResultadoComponent },
    { path: 'diarista/login', component: LoginComponent },
    { path: 'diarista/cadastro', component: DiaristaCadastroComponent },

    { path: 'diarista', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);