import { Injectable } from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AptNameService {

  url;
  urlRoom;
  constructor(public http: HttpClient) {
    this.url = 'http://59.12.27.10:8080/new_survey.php';
    this.urlRoom = 'http://59.12.27.10:8080/select_cate.php';
  }
  getAptList() {
    // this.http.setDataSerializer('utf8');
    return this.http.get(this.url);
  }
  getRoomList() {
    return this.http.get(this.urlRoom);
  }
}
