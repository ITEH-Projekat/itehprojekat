import {Component, Input, OnInit} from '@angular/core';
import {NekretninaModel} from '../nekretnina.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nekretnina-element',
  templateUrl: './nekretnina-element.component.html',
  styleUrls: ['./nekretnina-element.component.css']
})
export class NekretninaElementComponent implements OnInit {

  @Input() nekretnina: NekretninaModel;
  @Input() index: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickDetalji() {
    this.router.navigate(['/nekretnine', this.nekretnina.id]);
  }

}
