import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Socio } from 'src/app/models/Socio';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.page.html',
  styleUrls: ['./socios.page.scss'],
})
export class SociosPage implements OnInit {

  private socios : Socio[]=[];

  constructor(private menuCtrl: MenuController,
    private apiSvc: ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadSocios();
    this.menuCtrl.enable(true);
  }

  async loadSocios() {
    this.socios=[];
    this.apiSvc.getAllSocios().subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        let item: Socio = {
          _id: res[i]._id,
          nombre: res[i].nombre
        }
        this.socios.push(item)
      }
      console.log(this.socios)
    });
  }
}
