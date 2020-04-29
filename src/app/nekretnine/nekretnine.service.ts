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
    // tslint:disable-next-line:max-line-length
    // const nekr = {id: null, naslov: nekretnina.naslov, opis: nekretnina.opis, kvadratura: nekretnina.kvadratura, cena: nekretnina.cena, slika: nekretnina.slika, user: nekretnina.user};
    const nekretninaData = new FormData();
    nekretninaData.append('naslov', nekretnina.naslov);
    nekretninaData.append('opis', nekretnina.opis);
    // @ts-ignore
    nekretninaData.append('kvadratura', nekretnina.kvadratura);
    // @ts-ignore
    nekretninaData.append('cena', nekretnina.cena);
    nekretninaData.append('user', nekretnina.user);
    nekretninaData.append('slika', nekretnina.slika);
    this.http
      .post<{message: string, nekretninaResponse: NekretninaModel}>(
        'http://localhost:3000/api/nekretnine',
        nekretninaData)
      .subscribe((response) => {
        // tslint:disable-next-line:max-line-length
        const nekr: NekretninaModel = {
          id: response.nekretninaResponse.id,
          naslov: response.nekretninaResponse.naslov,
          opis: response.nekretninaResponse.opis,
          kvadratura: response.nekretninaResponse.kvadratura,
          cena: response.nekretninaResponse.cena,
          user: response.nekretninaResponse.user,
          slika: response.nekretninaResponse.slika
        };
        // const nekretninaId = response.nekrId;
        // nekr.id = nekretninaId;
        // sledeci red da li je nekr ili nekretnina
        this.nekretnine.push(nekr);
        this.nekretnineUpdated.next(this.nekretnine.slice());
        this.router.navigate(['/']);
      });
  }

  updateNekretnina(nekretnina: NekretninaModel) {
    console.log('id ovaj sad: ' + nekretnina.id);
    const nekr = {id: nekretnina.id, naslov: nekretnina.naslov, opis: nekretnina.opis, kvadratura: nekretnina.kvadratura, cena: nekretnina.cena, slika: nekretnina.slika, user: nekretnina.user};
    let nekretninaData: NekretninaModel | FormData;
    if (typeof(nekr.slika) === 'object') {
      console.log('usao u form data');
      nekretninaData = new FormData();
      nekretninaData.append('naslov', nekretnina.naslov);
      nekretninaData.append('id', nekretnina.id);
      nekretninaData.append('opis', nekretnina.opis);
      // @ts-ignore
      nekretninaData.append('kvadratura', nekretnina.kvadratura);
      // @ts-ignore
      nekretninaData.append('cena', nekretnina.cena);
      nekretninaData.append('user', nekretnina.user);
      nekretninaData.append('slika', nekretnina.slika);
    } else {
      console.log('usao u ne form data');
      nekretninaData = nekr;
    }
    this.http.put<{message: string, slika: string}>('http://localhost:3000/api/nekretnine/' + nekr.id, nekretninaData)
      .subscribe(response => {
        console.log(response.message);
        const updatedNekretnine = this.nekretnine.slice();
        const oldIndex = updatedNekretnine.findIndex(n => n.id === nekretnina.id);
        // console.log('slika: ' + response.slika);
        const nekretninica: NekretninaModel = {
          id: nekretnina.id,
          naslov: nekretnina.naslov,
          opis: nekretnina.opis,
          kvadratura: nekretnina.kvadratura,
          cena: nekretnina.cena,
          slika: response.slika,
          // slika: '',
          user: nekretnina.user
        };
        updatedNekretnine[oldIndex] = nekretninica;
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
