import {NekretninaModel} from './nekretnina.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class NekretnineService {

  nekretnineUpdated = new Subject<NekretninaModel[]>();

  constructor(private http: HttpClient) {
  }

  nekretnine: NekretninaModel[] = [];

  // nekretnine: NekretninaModel[] = [
  //   {
  //     id: 0,
  //     naslov: 'Stan Kontic',
  //     cena: 255000,
  //     kvadratura: 55,
  //     opis: 'Jednosoban stan u centru Beograda.',
  //     slika: 'https://garsonjere-kragujevac.rs/images/blog/povoljni-stanovi-za-izdavanje-kragujevac-velika-4abdc74095.jpg'
  //   },
  //   {
  //     id: 1,
  //     naslov: 'Stan Kontic',
  //     cena: 255000,
  //     kvadratura: 55,
  //     opis: 'Jednosoban stan u centru Beograda.',
  //     slika: 'https://garsonjere-kragujevac.rs/images/blog/povoljni-stanovi-za-izdavanje-kragujevac-velika-4abdc74095.jpg'
  //   },
  //   {
  //     id: 2,
  //     naslov: 'Stan Kontic',
  //     cena: 255000,
  //     kvadratura: 55,
  //     opis: 'Jednosoban stan u centru Beograda.',
  //     slika: 'https://garsonjere-kragujevac.rs/images/blog/povoljni-stanovi-za-izdavanje-kragujevac-velika-4abdc74095.jpg'
  //   },
  //   {
  //     id: 3,
  //     naslov: 'Stan Kontic',
  //     cena: 255000,
  //     kvadratura: 55,
  //     opis: 'Jednosoban stan u centru Beograda.',
  //     slika: 'https://garsonjere-kragujevac.rs/images/blog/povoljni-stanovi-za-izdavanje-kragujevac-velika-4abdc74095.jpg'
  //   }
  // ];

  getNekretnine() {
    this.http.get<{message: string, nekretnine: NekretninaModel[]}>('http://localhost:3000/api/nekretnine')
      .subscribe((postData) => {
        this.nekretnine = postData.nekretnine;
        this.nekretnineUpdated.next(this.nekretnine.slice());
      });
    return this.nekretnine.slice();
  }

  addNekretnina(nekretnina: NekretninaModel) {
    nekretnina.id = this.nekretnine.length;
    this.nekretnine.push(nekretnina);
    this.nekretnineUpdated.next(this.nekretnine.slice());
  }

  getNekretnina(id: number) {
    return this.nekretnine[id];
  }
}
