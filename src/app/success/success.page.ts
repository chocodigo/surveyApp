import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import {FIREBASE_CONFIG} from '../app.firebase.config';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {

  private selectedPhoto: Blob;
  private fileName: string;
  data: any;

  constructor(private route: ActivatedRoute) {
    // this.route.queryParams.subscribe(params => {
    //   if (params && params.photo) {
    //     this.data = JSON.parse(params.photo);
    //     this.selectedPhoto = this.data.selectedPhoto;
    //     this.fileName = this.data.fileName;
    //   }
    // });
    // firebase.initializeApp(FIREBASE_CONFIG);
    //
    // firebase.storage().ref().child(this.fileName).put(this.selectedPhoto).then((snapshot) => {
    //   console.log('Uploaded a image!');
    // }, (err) => {
    //   console.log('Firebase storage error : ' + err);
    // });
  }

  ngOnInit() {
  }

}
