import { Component } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  secretData = null;

  constructor(private apiSvc: ApiService,
    private loadingController: LoadingController,
    private menuCtrl: MenuController) {

  }

  
  
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  

  async getData() {
    this.secretData = null;

    this.apiSvc.getAll().subscribe((res: any) => {
      console.log(res);
      this.secretData = JSON.stringify(res);
    });
  }

  async logout() {
    const loading = await this.loadingController.create({ animated: true, message: 'Saliendo...' });
    await loading.present();
    this.apiSvc.logout();
    await loading.dismiss();
  }

  gotoPost() {
    
  }

}