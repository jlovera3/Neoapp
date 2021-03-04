import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatepostPageRoutingModule } from './createpost-routing.module';

import { CreatepostPage } from './createpost.page';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatepostPageRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    FileUploadModule
  ],
  declarations: [CreatepostPage]
})
export class CreatepostPageModule { }
