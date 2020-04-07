import {Component, Input, OnInit} from '@angular/core';
import {NekretninaModel} from '../nekretnina.model';

@Component({
  selector: 'app-nekretnina-element',
  templateUrl: './nekretnina-element.component.html',
  styleUrls: ['./nekretnina-element.component.css']
})
export class NekretninaElementComponent implements OnInit {

  @Input() nekretnina: NekretninaModel;

  constructor() { }

  ngOnInit(): void {
  }

}
