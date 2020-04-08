import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NekretnineComponent} from './nekretnine/nekretnine.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {DodajNekretninuComponent} from './nekretnine/dodaj-nekretninu/dodaj-nekretninu.component';
import {JumboComponent} from './jumbo/jumbo.component';
import {NekretninaDetailComponent} from './nekretnine/nekretnina-detail/nekretnina-detail.component';


const routes: Routes = [
  {path: '', redirectTo: '/nekretnine', pathMatch: 'full'},
  {path: 'nekretnine', component: NekretnineComponent, children: [
      {path: '', component: JumboComponent},
      {path: 'new', component: DodajNekretninuComponent},
      {path: ':id', component: NekretninaDetailComponent}
    ]},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
