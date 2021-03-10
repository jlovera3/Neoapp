import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { CreategastoPage } from 'src/app/modals/creategasto/creategasto.page';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';
import { Gasto } from 'src/app/models/Gasto';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  gastos: Gasto[] = [];

  constructor(private apiSvc: ApiService,
    private loadingController: LoadingController,
    private ui: UiService,
     private menuCtrl: MenuController) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getData();

    this.menuCtrl.enable(true);
  }

  async reloadData($event) {
    await this.getData();
    $event.target.complete();
  }

  async getData() {

    this.apiSvc.getAllGastos().subscribe((res: any) => {
      this.gastos = res.docs;
    });
  }


  async openModal(){
    await this.ui.showModal(
      {
        component: CreategastoPage
      })
  }

}