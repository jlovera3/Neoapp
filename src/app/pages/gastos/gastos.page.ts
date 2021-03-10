import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
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


}