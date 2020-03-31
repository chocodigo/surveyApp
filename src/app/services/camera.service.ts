import { Injectable } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  public photos: any;
  private base64Prefix = 'data:image/jpeg;base64,';

  constructor(private camera: Camera) {
    this.photos = [];
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      const safeUrl: any = this.base64Prefix + imageData;
      this.photos.push(safeUrl);
      this.photos.reverse();
    }, (err) => {
      console.log('Camera issue: ' + err);
    });
  }


}
