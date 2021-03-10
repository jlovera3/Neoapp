import { Component } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private apiSvc: ApiService,
    private loadingController: LoadingController) {

  }

  
  
  ionViewWillEnter() {
  }


}