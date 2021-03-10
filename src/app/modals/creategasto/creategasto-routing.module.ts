import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreategastoPage } from './creategasto.page';

const routes: Routes = [
  {
    path: '',
    component: CreategastoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreategastoPageRoutingModule {}
