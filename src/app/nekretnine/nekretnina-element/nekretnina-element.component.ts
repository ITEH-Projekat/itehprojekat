import {Component, Input, OnInit} from '@angular/core';
import {NekretninaModel} from '../nekretnina.model';
import {Router} from '@angular/router';
import {NekretnineService} from '../nekretnine.service';

@Component({
  selector: 'app-nekretnina-element',
  templateUrl: './nekretnina-element.component.html',
  styleUrls: ['./nekretnina-element.component.css']
})
export class NekretninaElementComponent implements OnInit {

  @Input() nekretnina: NekretninaModel;
  @Input() index: string;

  constructor(private router: Router, private nekretnineService: NekretnineService) { }

  ngOnInit(): void {
  }


  onDeleteNekretnina(id: string) {
    this.nekretnineService.onDeleteNekretnina(id);
  }

  getNekretnina() {
    this.nekretnineService.getNekretnina(this.index)
      .subscribe(data => {
        // tslint:disable-next-line:max-line-length
        this.nekretnina = {id: data._id, naslov: data.naslov, slika: data.slika, cena: data.cena, kvadratura: data.kvadratura, opis: data.opis, user: data.user};
      });
    this.router.navigate(['/nekretnine', this.index]);
  }
}
