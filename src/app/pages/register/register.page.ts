import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  registerForm: FormGroup;
  public isRegistering: boolean = false;

  constructor(public formBuilder: FormBuilder,
    private apiSvc: ApiService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private menuCtrl: MenuController) {
    this.registerForm = this.formBuilder.group({
      nick: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.apiSvc.registerUser(this.registerForm.value.nick, this.registerForm.value.email, this.registerForm.value.password).subscribe(
      async _ => {
        await this.login();
        await loading.dismiss();
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'No se pudo completar el registro',
          message: res.error.msg,
          buttons: ['Oh :('],
        });
        await alert.present();
      }
    );
  }

  async login() {

    this.apiSvc.loginUser(this.registerForm.value.email, this.registerForm.value.password).subscribe(
      async _ => {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      async (res) => {
        const alert = await this.alertController.create({
          header: 'No se pudo acceder',
          message: res.error.msg,
          buttons: ['Oh :('],
        });
        await alert.present();
      }
    );
  }

}
