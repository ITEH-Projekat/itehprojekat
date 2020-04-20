import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NekretnineService} from '../nekretnine.service';
import {ActivatedRoute} from '@angular/router';
import {NekretninaModel} from '../nekretnina.model';

@Component({
  selector: 'app-dodaj-nekretninu',
  templateUrl: './dodaj-nekretninu.component.html',
  styleUrls: ['./dodaj-nekretninu.component.css']
})
export class DodajNekretninuComponent implements OnInit {

  formAdd: FormGroup;
  editMode = false;
  id: string;
  nekretnina: NekretninaModel;
  buttonValue = 'Dodaj';

  constructor(private nekretnineService: NekretnineService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.editMode);
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        this.editMode = true;
        console.log(this.editMode);
        this.id = paramMap.get('id');
        this.nekretnineService.getNekretnina(this.id)
          .subscribe(data => {
            // tslint:disable-next-line:max-line-length
            this.nekretnina = {
              id: data._id,
              naslov: data.naslov,
              slika: data.slika,
              cena: data.cena,
              kvadratura: data.kvadratura,
              opis: data.opis,
              user: data.user
            };

            this.formAdd = new FormGroup({
              naslov: new FormControl(this.nekretnina.naslov, Validators.required),
              opis: new FormControl(this.nekretnina.opis, Validators.required),
              kvadratura: new FormControl(this.nekretnina.kvadratura, Validators.required),
              cena: new FormControl(this.nekretnina.cena, Validators.required),
              slika: new FormControl(this.nekretnina.slika, Validators.required)
            });
          });
      } else {
        console.log(this.editMode);
        this.editMode = false;
        console.log(this.editMode);
        this.id = null;
      }
    });
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
    // nekretnina.id = this.nekretnina.id;
    console.log(nekretnina);
    if (this.editMode === true) {
      console.log('update radimo')
      nekretnina.id = this.nekretnina.id;
      this.nekretnineService.updateNekretnina(nekretnina);
    } else {
      this.nekretnineService.addNekretnina(nekretnina);
    }
    this.formAdd.reset();
  }

}
