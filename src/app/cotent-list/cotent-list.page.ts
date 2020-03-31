import {Component, OnInit, ViewChild} from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-cotent-list',
  templateUrl: './cotent-list.page.html',
  styleUrls: ['./cotent-list.page.scss'],
})
export class CotentListPage implements OnInit {
  data: any[];
  // @ts-ignore
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor() {}

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // tslint:disable-next-line:triple-equals
      if (this.data.length == 10) {
        event.target.disabled = true;
      }
      console.log(this.data.length);
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnInit(): void {
  }

}
