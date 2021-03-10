import { Component, OnInit } from '@angular/core';
import { Cultivo } from 'src/app/models/Cultivo';
import { Parcela } from 'src/app/models/Parcela';
import { Socio } from 'src/app/models/Socio';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-creategasto',
  templateUrl: './creategasto.page.html',
  styleUrls: ['./creategasto.page.scss'],
})
export class CreategastoPage implements OnInit {

  private socios: Socio[] = [];
  private parcelas: Parcela[] = [];
  private cultivos: Cultivo[] = [];
  socioSelected:boolean=false;
  parcelaSelected:boolean=false;
  socioID: string="";
  parcelaID: string="";
  cultivoID: string="";

  constructor(private apiSvc: ApiService) { }

  async ngOnInit() {
    await this.loadSocios();
  }

  socioChanged(){
    console.log(this.socioID)
    this.socioSelected=true;
    this.loadParcelasDeUnSocio(this.socioID);
  }

  parcelaChanged(){
    console.log(this.parcelaID)
    this.parcelaSelected=true;
    this.loadCultivosDeUnaParcela(this.parcelaID);
  }

  async loadSocios() {
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

  loadParcelasDeUnSocio(socioID: string) {
    this.apiSvc.getParcelasOfSocio(socioID).subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        let item: Parcela = {
          _id: res[i]._id,
          name: res[i].name,
          extension: res[i].extension,
          idSocio: res[i].idSocio
        }
        this.parcelas.push(item)
      }
      console.log(this.parcelas)
    });
  }

  loadCultivosDeUnaParcela(parcelaID: string){
    this.apiSvc.getCultivosOfParcela(parcelaID).subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        let item: Cultivo = {
          _id: res[i]._id,
          name: res[i].name,
          parcelaId: res[i].parcelaId,
          fechaComienzo: res[i].fechaComienzo,
          createdAt: res[i].createdAt,
          updatedAt: res[i].updatedAt,
          fechaFin: res[i].fechaFin
        }
        this.cultivos.push(item)
      }
      console.log(this.cultivos)
    });
  }

}
