import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NekretninaModel} from '../nekretnina.model';
import {NekretnineService} from '../nekretnine.service';

@Component({
  selector: 'app-nekretnina-detail',
  templateUrl: './nekretnina-detail.component.html',
  styleUrls: ['./nekretnina-detail.component.css']
})
export class NekretninaDetailComponent implements OnInit {

  isLoading = false;
  nekretnina: NekretninaModel;
  id: string;

  constructor(private route: ActivatedRoute,
              private nekretnineService: NekretnineService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(
      (params) => {
        this.id = params.id;
        this.nekretnineService.getNekretnina(this.id)
          .subscribe(data => {
            this.nekretnina = {id: data._id, naslov: data.naslov, slika: data.slika, cena: data.cena, kvadratura: data.kvadratura, opis: data.opis};
          });
        this.isLoading = false;
      }
    );
  }

  // onDeleteNekretnina() {
  //   console.log(this.id);
  //   this.nekretnineService.onDeleteNekretnina(this.id);
  // }

  onDeleteNekretnina(id: string) {
    this.nekretnineService.onDeleteNekretnina(id);
    this.router.navigate(['/nekretnine']);
  }

  onUpdateNekretnina(id: string) {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
