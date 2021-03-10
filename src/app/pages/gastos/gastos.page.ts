import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { CreategastoPage } from 'src/app/modals/creategasto/creategasto.page';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  secretData = null;

  constructor(private apiSvc: ApiService,
    private loadingController: LoadingController,
    private ui: UiService) {

  }

  ngOnInit(){
  }
  
  ionViewWillEnter() {
    this.getData();
  }
  

  async getData() {
    this.secretData = null;

    this.apiSvc.getAllGastos().subscribe((res: any) => {
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

  async openModal(){
    await this.ui.showModal(
      {
        component: CreategastoPage
      })
  }

}