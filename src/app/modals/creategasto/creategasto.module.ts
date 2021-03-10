import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreategastoPageRoutingModule } from './creategasto-routing.module';

import { CreategastoPage } from './creategasto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreategastoPageRoutingModule
  ],
  declarations: [CreategastoPage]
})
export class CreategastoPageModule {}
