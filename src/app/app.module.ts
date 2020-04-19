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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NekretninaDetailComponent } from './nekretnine/nekretnina-detail/nekretnina-detail.component';
import { NekretnineListComponent } from './nekretnine/nekretnine-list/nekretnine-list.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthComponent} from './auth/auth.component';
import {AuthInterceptor} from './auth/auth-interceptor';
import {LoadingSpinnerComponent} from './spinner/loading-spinner.component';

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
    NekretnineListComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [NekretnineService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
