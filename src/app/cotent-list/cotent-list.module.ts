import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CotentListPageRoutingModule } from './cotent-list-routing.module';

import { CotentListPage } from './cotent-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CotentListPageRoutingModule
  ],
  declarations: [CotentListPage]
})
export class CotentListPageModule {}
