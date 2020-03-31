import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CameraService} from '../services/camera.service';
import {ActionSheetController, NavController} from '@ionic/angular';
import {File} from '@ionic-native/file/ngx';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../services/data.service';

import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';

import { FIREBASE_CONFIG } from './../app.firebase.config';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  photos: any;
  isValid: any;
  private base64Prefix = 'data:image/jpeg;base64,';
  croppedImagepath = '';
  isLoading = false;
  aptName: string;
  pk1: string;
  pk2: string;
  // tslint:disable-next-line:variable-name
  titl_name: string;
  // tslint:disable-next-line:variable-name
  cont_ents: string;
  data: any;
  imageFileName: any;

  public processString: string;
  private sendImage: string;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  private selectedPhoto: Blob;

  constructor(private cameraService: CameraService,
              private camera: Camera,
              public actionSheetController: ActionSheetController,
              private file: File,
              private route: ActivatedRoute,
              private dataService: DataService,
              public navCtrl: NavController,
              public alertController: AlertController,
              public loadingController: LoadingController
              ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.user) {
        this.data = JSON.parse(params.user);
        this.aptName = this.data.loginAptName;
        this.pk1 = this.data.loginPk1;
        this.pk2 = this.data.loginPk2;
        console.log('home 페이지 로그인 데이터 : ' + this.data);
      }
    });
  }

  ngOnInit() {
    this.photos = [];
    this.isValid = false;
  }

  btnDeletePicture() {
    this.photos = [];
    this.isValid = false;
  }

  pickImage(sourceTypee) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceTypee,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      const safeUrl: any = this.base64Prefix + imageData;
      this.sendImage = safeUrl;
      this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
      this.photos.push(safeUrl);
      this.photos.reverse();
    }, (err) => {
      console.log('Camera issue: ' + err);
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          this.isValid = true;

        }
      },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
            this.isValid = true;

          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async btnSendBoard() {
    let filename = null;

    if (typeof(this.titl_name) === 'undefined') {
      const alert = await this.alertController.create({
        header: '글 작성 오류',
        subHeader: '글 작성 오류',
        message: '하자부분을 입력해주세요.',
        buttons: ['OK']
      });

      await alert.present();
    } else if (typeof(this.cont_ents) === 'undefined') {
      const alert = await this.alertController.create({
        header: '글 작성 오류',
        subHeader: '글 작성 오류',
        message: '하자내용을 입력해주세요.',
        buttons: ['OK']
      });

      await alert.present();
    } else if (this.titl_name.length > 45 || this.cont_ents.length > 200) {
      const alert = await this.alertController.create({
        header: '글 작성 오류',
        subHeader: '글 작성 오류',
        message: '글 제목은 45자 글 내용은 200자까지 입력할 수 있습니다.',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      console.log('uploadPhoto click!');
      if (this.isValid) {
        console.log('111111111');
        // this.uploadToStorage(this.selectedPhoto);
        filename = Math.floor(Date.now() / 1000) + this.aptName + '_' + this.pk1 + '_' + this.pk2;
        firebase.initializeApp(FIREBASE_CONFIG);
        firebase.storage().ref().child(`images/${filename}`).put(this.selectedPhoto).then((snapshot) => {
          console.log('Uploaded a image!');
        }, (err) => {
          console.log('Firebase storage error : ' + err);
        });
      }
      this.dataService.insertBoard(this.aptName, this.pk1, this.pk2, this.titl_name, this.cont_ents, filename).then(async (data) => {
        const loading = await this.loadingController.create({
          message: '정보 입력이 완료되었습니다. 잠시만 기다려주세요',
          duration: 50000
        });
        await loading.present();
        location.href = '/home';
      }).catch( async (err) => {
        const alert = await this.alertController.create({
          header: '글 작성 오류',
          subHeader: '글 작성 오류',
          message: '글 제목은 20자, 글 내용은 100자 이내로 작성해주세요.',
          buttons: ['OK']
        });

        await alert.present();
      });
    }
    // console.log('연결');
  }

  dataURItoBlob(dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  }

}
