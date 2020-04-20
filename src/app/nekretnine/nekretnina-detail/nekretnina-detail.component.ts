import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NekretninaModel} from '../nekretnina.model';
import {NekretnineService} from '../nekretnine.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-nekretnina-detail',
  templateUrl: './nekretnina-detail.component.html',
  styleUrls: ['./nekretnina-detail.component.css']
})
export class NekretninaDetailComponent implements OnInit {

  isLoading = false;
  nekretnina: NekretninaModel;
  id: string;
  isAuthenticated: boolean;

  constructor(private route: ActivatedRoute,
              private nekretnineService: NekretnineService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(
      (params) => {
        this.id = params.id;
        this.nekretnineService.getNekretnina(this.id)
          .subscribe(data => {
            // tslint:disable-next-line:max-line-length
            this.nekretnina = {id: data._id, naslov: data.naslov, slika: data.slika, cena: data.cena, kvadratura: data.kvadratura, opis: data.opis};
          });
        this.isLoading = false;
      }
    );
    this.authService.user.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
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
