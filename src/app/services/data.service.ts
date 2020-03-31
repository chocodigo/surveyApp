import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url;

  constructor(public httpClient: HttpClient, private http: HTTP) {
    this.url = 'http://59.12.27.10:8080/surveyBoard.php';
  }

  // tslint:disable-next-line:variable-name
  insertBoard(loginAptName, loginPk1, loginPk2, titl_name, cont_ents, photo) {
    this.http.setDataSerializer('utf8');
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    const body = 'apt=' + loginAptName + '&pk1=' + loginPk1 + '&pk2=' + loginPk2 + '&titlname=' + titl_name + '&contents=' + cont_ents + '&photo=' + photo;
    return this.http.post(this.url, body, headers).then(data => {
      console.log('성공');
    }).catch(error => {
      console.log(error);
    });
  }
}
