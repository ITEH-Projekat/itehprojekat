import {Component, OnDestroy, OnInit} from '@angular/core';
import {NekretninaModel} from '../nekretnina.model';
import {Subscription} from 'rxjs';
import {NekretnineService} from '../nekretnine.service';

@Component({
  selector: 'app-nekretnine-list',
  templateUrl: './nekretnine-list.component.html',
  styleUrls: ['./nekretnine-list.component.css']
})
export class NekretnineListComponent implements OnInit, OnDestroy {
  nekretnine: NekretninaModel[] = [];
  nekretnineSubscription: Subscription;
  state = 'in';

  constructor(private nekretnineService: NekretnineService) { }

  ngOnInit(): void {
    this.nekretnineSubscription = this.nekretnineService.nekretnineUpdated
      .subscribe((nekretnine) => {
        this.nekretnine = nekretnine;
      });
    this.nekretnine = this.nekretnineService.getNekretnine();
  }

  ngOnDestroy(): void {
    this.nekretnineSubscription.unsubscribe();
  }

}
