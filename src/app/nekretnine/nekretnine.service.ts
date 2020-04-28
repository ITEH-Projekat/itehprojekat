import {NekretninaModel} from './nekretnina.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class NekretnineService {

  nekretnineUpdated = new Subject<NekretninaModel[]>();

  constructor(private http: HttpClient, private router: Router) {
  }

  nekretnine: NekretninaModel[] = [];

  getNekretnine() {
    this.http.get<{message: string, nekretnine: any}>('http://localhost:3000/api/nekretnine')
      .pipe(map((postData) => {
        console.log(postData.nekretnine);
        return postData.nekretnine.map(nekretnina => {
          return {
           naslov: nekretnina.naslov,
           opis: nekretnina.opis,
           kvadratura: nekretnina.kvadratura,
           cena: nekretnina.cena,
           slika: nekretnina.slika,
           id: nekretnina._id,
            user: nekretnina.user
          };
        });
      }))
      .subscribe((transformedNekr) => {
        console.log(transformedNekr);
        this.nekretnine = transformedNekr;
        console.log(this.nekretnine);
        this.nekretnineUpdated.next(this.nekretnine.slice());
      });
    return this.nekretnine.slice();
  }

  addNekretnina(nekretnina: NekretninaModel) {
    const nekr = {id: null, naslov: nekretnina.naslov, opis: nekretnina.opis, kvadratura: nekretnina.kvadratura, cena: nekretnina.cena, slika: nekretnina.slika, user: nekretnina.user};
    this.http.post<{message: string, nekrId: string}>('http://localhost:3000/api/nekretnine', nekr)
      .subscribe((response) => {
        const nekretninaId = response.nekrId;
        nekr.id = nekretninaId;
        // sledeci red da li je nekr ili nekretnina
        this.nekretnine.push(nekr);
        this.nekretnineUpdated.next(this.nekretnine.slice());
        this.router.navigate(['/']);
      });
  }

  updateNekretnina(nekretnina: NekretninaModel) {
    console.log(nekretnina.id);
    const nekr = {id: nekretnina.id, naslov: nekretnina.naslov, opis: nekretnina.opis, kvadratura: nekretnina.kvadratura, cena: nekretnina.cena, slika: nekretnina.slika, user: nekretnina.user};
    this.http.put<{message: string}>('http://localhost:3000/api/nekretnine/' + nekr.id, nekr)
      .subscribe(response => {
        console.log(response.message);
        const updatedNekretnine = this.nekretnine.slice();
        const oldIndex = updatedNekretnine.findIndex(n => n.id === nekr.id);
        updatedNekretnine[oldIndex] = nekr;
        this.nekretnine = updatedNekretnine;
        this.nekretnineUpdated.next(this.nekretnine.slice());
        this.router.navigate(['/']);
      });
  }

  getNekretnina(id: string) {
    return this.http
      .get<{_id: string, naslov: string, opis: string, cena: number, kvadratura: number, slika: string, user: string}>('http://localhost:3000/api/nekretnine/' + id);
  }

  onDeleteNekretnina(id: string) {
    // const nekrId = this.nekretnine[id].id;
    // console.log(nekrId);
    this.http.delete('http://localhost:3000/api/nekretnine/' + id)
      .subscribe(() => {
        console.log('Deleted!');
        const updatedNekretnine = this.nekretnine.filter(nekretnina => nekretnina.id !== id);
        this.nekretnine = updatedNekretnine;
        this.nekretnineUpdated.next(this.nekretnine.slice());
        this.router.navigate(['/']);
      });
  }


  searchNekretnine(valueParametri: {kvadraturaOd: number, kvadraturaDo: number, cenaOd: number, cenaDo: number}) {
    this.http.post<{nekretnine: NekretninaModel[], poruka: string}>('http://localhost:3000/api/nekretnine/pretraga', {valueParametri})
      .subscribe(response => {
        console.log(response.poruka);
        this.nekretnine = response.nekretnine;
        this.nekretnineUpdated.next(this.nekretnine.slice());
      });
  }
}
