import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SociosPageRoutingModule } from './socios-routing.module';

import { SociosPage } from './socios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SociosPageRoutingModule
  ],
  declarations: [SociosPage]
})
export class SociosPageModule {}
