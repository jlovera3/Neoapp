import { Component } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any = [
    {
      title: "GASTOS",
      url: "/gastos",
      icon: "calendar-outline"
    },
    {
      title: "SOCIOS",
      url: "/socios",
      icon: "swap-horizontal-outline"
    }
  ];

  isSettingsOpen: boolean = true;
  isDisconnectedFromNet: boolean = false;
  onConnect;
  onDisconnect;
  sub: Subscription;

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private router: Router,
    private network: Network,
    private menuCtrl: MenuController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.statusBar.overlaysWebView(false);/* 
      this.router.events.subscribe((event: RouterEvent) => {
        if (event.url != undefined && event.url != null)
          this.activePath = event.url;
      })
      this.backgroundMode.enable(); */
    });
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

  openedMenu() {
    this.sub = this.platform.backButton.subscribeWithPriority(200, (processNextHandler) => {
      if (this.menuCtrl.isOpen())
        this.menuCtrl.close();
    });
  }
  
  closedMenu() {
    if (this.sub)
      this.sub.unsubscribe();
  }

  
  startNetworkMonitor() {
    this.onConnect = this.network.onConnect()
      .subscribe(async data => {
        this.isDisconnectedFromNet = false;
      })

    this.onDisconnect = this.network.onDisconnect()
      .subscribe(async data => {
        this.isDisconnectedFromNet = true;

      })
  }
}
