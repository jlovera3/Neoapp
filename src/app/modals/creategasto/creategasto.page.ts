import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Centro } from 'src/app/models/Centro';
import { Cultivo } from 'src/app/models/Cultivo';
import { Parcela } from 'src/app/models/Parcela';
import { Socio } from 'src/app/models/Socio';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-creategasto',
  templateUrl: './creategasto.page.html',
  styleUrls: ['./creategasto.page.scss'],
})
export class CreategastoPage implements OnInit {

  modalidad: string = "1";

  private centros: Centro[] = [];
  private socios: Socio[] = [];
  private parcelas: Parcela[] = [];
  private cultivos: Cultivo[] = [];

  socioSelected: boolean = false;
  parcelaSelected: boolean = false;

  centroID: string = "";
  socioID: string = "";
  parcelaID: string = "";
  cultivoID: string = "";

  concepto: string = "";
  cantidad: number = 0;
  importe: number = 0;
  fecha: string = "";

  constructor(private apiSvc: ApiService,
    private modalCtrl: ModalController,
    private ui: UiService) { }

  async ngOnInit() {
    await this.loadSocios();
    await this.loadCentros();
  }

  socioChanged() {
    console.log(this.socioID)
    this.socioSelected = true;
    this.loadParcelasDeUnSocio(this.socioID);
  }

  parcelaChanged() {
    console.log(this.parcelaID)
    this.parcelaSelected = true;
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

  async loadCentros() {
    this.apiSvc.getAllCentros().subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        let item: Centro = {
          _id: res[i]._id,
          name: res[i].name,
          extensionTotal: res[i].extensionTotal
        }
        this.centros.push(item)
      }
      console.log(this.centros)
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

  loadCultivosDeUnaParcela(parcelaID: string) {
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

  cancelar() {
    this.modalCtrl.dismiss();
  }

  create() {
    console.log('aqui se crea gasto')
    console.log(this.concepto, this.importe, this.cantidad, this.fecha)
    if (this.modalidad == "1") {
      this.apiSvc.createGasto([this.socioID, this.parcelaID, this.cultivoID], this.concepto, this.importe, this.cantidad, this.fecha)
        .subscribe(data => {
          console.log(data);
          this.modalCtrl.dismiss();
          this.ui.presentToast('Añadido correctamente', 3000, 'success')
        })
    } else {
      this.apiSvc.createGasto([this.centroID], this.concepto, this.importe, this.cantidad, this.fecha)
        .subscribe(data => {
          console.log(data);
          this.modalCtrl.dismiss();
          this.ui.presentToast('Añadido correctamente', 3000, 'success')
        })
    }
  }

}
