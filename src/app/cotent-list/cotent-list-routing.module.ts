import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotentListPage } from './cotent-list.page';

const routes: Routes = [
  {
    path: '',
    component: CotentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CotentListPageRoutingModule {}
