import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NekretnineComponent } from './nekretnine/nekretnine.component';
import { HeaderComponent } from './header/header.component';
import { NekretninaElementComponent } from './nekretnine/nekretnina-element/nekretnina-element.component';
import {NekretnineService} from './nekretnine/nekretnine.service';
import { DodajNekretninuComponent } from './nekretnine/dodaj-nekretninu/dodaj-nekretninu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { JumboComponent } from './jumbo/jumbo.component';
import {ReactiveFormsModule} from '@angular/forms';
import { NekretninaDetailComponent } from './nekretnine/nekretnina-detail/nekretnina-detail.component';
import { NekretnineListComponent } from './nekretnine/nekretnine-list/nekretnine-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NekretnineComponent,
    HeaderComponent,
    NekretninaElementComponent,
    DodajNekretninuComponent,
    PageNotFoundComponent,
    JumboComponent,
    NekretninaDetailComponent,
    NekretnineListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [NekretnineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
