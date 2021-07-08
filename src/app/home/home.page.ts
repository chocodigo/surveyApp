import { Component } from '@angular/core';
import {AptNameService} from '../services/apt-name.service';
import {NavigationExtras, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: any;
  loginAptName: string;
  loginPk1: string;
  loginPk2: string;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private AptNameService: AptNameService, private router: Router, public alertController: AlertController) {
    this.AptNameService.getAptList().subscribe(data => {
      console.log('home data : ' + JSON.parse(JSON.stringify(data)).apt);
      this.data = JSON.parse(JSON.stringify(data)).apt;
    }, error => {
      console.log('2222 : ' + JSON.stringify(error));
    });
  }

  async click_login_btn() {
    console.log('선택한 아파트 : ' + this.loginAptName);
    const user = {
      loginPk1: this.loginPk1,
      loginPk2: this.loginPk2,
      loginAptName: this.loginAptName
    };

    const navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(user)
      }
    };

    if (typeof (this.loginAptName) === 'undefined') {
      const alert = await this.alertController.create({
        header: '로그인 오류',
        subHeader: '로그인 오류',
        message: '아파트를 선택해주세요.',
        buttons: ['OK']
      });

      await alert.present();
    } else if (typeof (this.loginPk1) === 'undefined') {
      const alert = await this.alertController.create({
        header: '로그인 오류',
        subHeader: '로그인 오류',
        message: '동을 입력해주세요.',
        buttons: ['OK']
      });

      await alert.present();
    } else if (typeof (this.loginPk2) === 'undefined') {
      const alert = await this.alertController.create({
        header: '로그인 오류',
        subHeader: '로그인 오류',
        message: '호수를 입력해주세요.',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      this.router.navigate(['board'], navigationExtras);
    }
  }

}
