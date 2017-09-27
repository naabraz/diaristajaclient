import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

import { HomeModule } from './home/home.module';
import { FiltroModule } from './filtro/filtro.module';
import { DiaristaCadastroModule } from './diarista-cadastro/diarista-cadastro.modules';
import { DiaristaDetalheModule } from './diarista-detalhe/diarista-detalhe.module';

import { routing } from './app.routes';
import { LoginComponent } from './login/login.component';
import { RestricoesModule } from "app/restricoes/restricoes.module";
import { InvestidorComponent } from './investidor/investidor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    InvestidorComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeModule,
    FiltroModule,
    DiaristaCadastroModule,
    DiaristaDetalheModule,
    RestricoesModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
