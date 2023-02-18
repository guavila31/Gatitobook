import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensagemModule } from '../componentes/mensagem/mensagem.module';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { SharedModule } from '../shared/shared.module';
import { CabecalhoModule } from '../componentes/cabecalho/cabecalho.module';
import { RodapeModule } from '../componentes/rodape/rodape.module';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NovoUsuarioComponent],
  imports: [CommonModule,
    HomeRoutingModule,
    FormsModule,
    SharedModule,
    RodapeModule,],
  exports: [HomeComponent],
})
export class HomeModule { }
