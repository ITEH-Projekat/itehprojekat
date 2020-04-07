import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NekretnineComponent } from './nekretnine/nekretnine.component';
import { HeaderComponent } from './header/header.component';
import { NekretninaElementComponent } from './nekretnine/nekretnina-element/nekretnina-element.component';
import {NekretnineService} from './nekretnine/nekretnine.service';
import { DodajNekretninuComponent } from './nekretnine/dodaj-nekretninu/dodaj-nekretninu.component';

@NgModule({
  declarations: [
    AppComponent,
    NekretnineComponent,
    HeaderComponent,
    NekretninaElementComponent,
    DodajNekretninuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [NekretnineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
