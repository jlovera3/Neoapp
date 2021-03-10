import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  public isLogginIn: boolean = false;

  constructor(public formBuilder: FormBuilder,
    private apiSvc: ApiService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private storage : Storage,
    private menuCtrl: MenuController) {

    this.loginForm = this.formBuilder.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['testtest1', [Validators.required]]
    })
  }
  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  
  ngOnInit() {
  }

  async login() {
    await this.storage.set('test', this.loginForm.value.email);    
    this.isLogginIn = true;
    const loading = await this.loadingController.create();
    await loading.present();

    this.apiSvc.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      async _ => {
        await loading.dismiss();
        this.router.navigateByUrl('/home', { replaceUrl: true });
        this.isLogginIn = false;
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'No se pudo acceder',
          message: res.statusText,
          buttons: ['Oh :('],
        });
        await alert.present();
        this.isLogginIn = false;
      }
    );
  }
}
