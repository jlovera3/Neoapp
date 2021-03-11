import { Injectable } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  miLoading: any;
  miToast: any;

  constructor(public modal: ModalController,
    public toast: ToastController,
    public loading: LoadingController) { }
    


  async showModal(opts) {
    const modal = await this.modal.create(opts);
    modal.present();
    await modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      console.log(dataReturned)
    });
  }

  async presentToast(msg: string, dur: number = 2000, col: string = "danger"): Promise<void> {
    if (this.miToast != null && this.miToast != undefined) {
      this.miToast.dismiss();
    }

    this.miToast = await this.toast.create({

      message: msg,
      duration: dur,
      color: col,
      translucent: true,
      position: "bottom",
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.hideToast();
          }
        }
      ]
    });
    this.miToast.present();
  }
  
  public hideToast() {
    this.miToast = null;
    this.toast.dismiss();
  }

  
  async showLoading(msg?: string) {
    if (this.miLoading) {
      return;
    }
    this.miLoading = await this.loading.create({
      message: msg ? msg : ''
    });
    return await this.miLoading.present();
  }

  public hideLoad() {

    if (this.miLoading) {
      this.miLoading.dismiss();
      this.miLoading = null;

    }

  }

}
