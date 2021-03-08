import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any = [
    {
      title: "GASTOS",
      url: "/home",
      icon: "calendar-outline"
    },
    {
      title: "SOCIOS",
      url: "/",
      icon: "swap-horizontal-outline"
    },
    {
      title: "PARCELAS",
      url: "/",
      icon: "map-outline"
    },
    {
      title: "CULTIVOS",
      url: "/",
      icon: "wallet-outline"
    }
  ];


  sub: Subscription;  
  isSettingsOpen: boolean = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private apiSvc : ApiService,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  closedMenu() {
    if (this.sub)
      this.sub.unsubscribe();
  }

  openedMenu() {
    this.sub = this.platform.backButton.subscribeWithPriority(200, (processNextHandler) => {
      if (this.menuCtrl.isOpen())
        this.menuCtrl.close();
    });
  }

  usuario = () =>{
    return ApiService.user.email;
  }
  
  openSettings() {
    if (this.isSettingsOpen) {
      setTimeout(() => {
        this.isSettingsOpen = !this.isSettingsOpen;
      }, 400)
    } else {
      this.isSettingsOpen = !this.isSettingsOpen;
    }
  }
}
