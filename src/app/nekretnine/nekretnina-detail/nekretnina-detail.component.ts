import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NekretninaModel} from '../nekretnina.model';
import {NekretnineService} from '../nekretnine.service';

@Component({
  selector: 'app-nekretnina-detail',
  templateUrl: './nekretnina-detail.component.html',
  styleUrls: ['./nekretnina-detail.component.css']
})
export class NekretninaDetailComponent implements OnInit {

  nekretnina: NekretninaModel;
  id: number;

  constructor(private route: ActivatedRoute, private nekretnineService: NekretnineService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.id = +params.id;
        this.nekretnina = this.nekretnineService.getNekretnina(this.id);
      }
    );
  }

}
