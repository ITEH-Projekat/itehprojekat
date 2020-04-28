import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NekretnineService} from '../nekretnine.service';

@Component({
  selector: 'app-nekretnina-pretraga',
  templateUrl: './nekretnina-pretraga.component.html',
  styleUrls: ['./nekretnina-pretraga.component.css']
})
export class NekretninaPretragaComponent implements OnInit {

  constructor(private nekretnineService: NekretnineService) { }

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      kvadraturaOd: new FormControl(null),
      kvadraturaDo: new FormControl(null),
      cenaOd: new FormControl(null),
      cenaDo: new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.nekretnineService.searchNekretnine(this.form.value);
  }
}
