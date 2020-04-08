import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NekretnineService} from '../nekretnine.service';

@Component({
  selector: 'app-dodaj-nekretninu',
  templateUrl: './dodaj-nekretninu.component.html',
  styleUrls: ['./dodaj-nekretninu.component.css']
})
export class DodajNekretninuComponent implements OnInit {

  formAdd: FormGroup;

  constructor(private nekretnineService: NekretnineService) { }

  ngOnInit(): void {
    this.formAdd = new FormGroup({
      naslov: new FormControl(null, Validators.required),
      opis: new FormControl(null, Validators.required),
      kvadratura: new FormControl(null, Validators.required),
      cena: new FormControl(null, Validators.required),
      slika: new FormControl(null, Validators.required)
    });
  }

  onSubmitForm() {
    const nekretnina = this.formAdd.value;
    this.nekretnineService.addNekretnina(nekretnina);
    this.formAdd.reset();
  }

}
