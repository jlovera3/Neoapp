import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  secretData = null;

  constructor(private apiSvc: ApiService,
    private loadingController: LoadingController) {

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

}