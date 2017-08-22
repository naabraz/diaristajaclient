import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

import { HomeModule } from './home/home.module';
import { FiltroModule } from './filtro/filtro.module';
import { FiltroResultadoModule } from './filtro-resultado/filtro-resultado.module';
import { DiaristaCadastroModule } from './diarista-cadastro/diarista-cadastro.modules';
import { DiaristaDetalheModule } from './diarista-detalhe/diarista-detalhe.module';

import { routing } from './app.routes';
import { LoginComponent } from './login/login.component';
import { RestricoesModule } from "app/restricoes/restricoes.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeModule,
    FiltroModule,
    FiltroResultadoModule,
    DiaristaCadastroModule,
    DiaristaDetalheModule,
    RestricoesModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
