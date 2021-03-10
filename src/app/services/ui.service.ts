import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(public modal: ModalController,) { }


  async showModal(opts) {
    const modal = await this.modal.create(opts);
    modal.present();
    await modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      console.log(dataReturned)
    });
  }

}
