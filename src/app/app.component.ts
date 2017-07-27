import {Component, ViewChild} from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Nav, Platform, ModalController} from 'ionic-angular';
import { HttpProvider } from  '../providers/http/http';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, method?: any}>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public http: HttpProvider
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    this.pages = [
      {title: 'Home ', component: 'AccountHomePage'},
      {title: 'My Projects ', component: 'ListProjects'},
      {title: 'Logout', component: 'HomePage', method: 'logout'}
    ];

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {

    if (page.method && page.method === 'logout') {
      this.http.logout();      
      this.nav.setRoot(HomePage);
    }

    if (page.component === 'ListProjects') {
      this.nav.setRoot('ListProjectsPage');
    }

    if (page.component === 'AccountHomePage') {
      this.nav.setRoot('AccountHomePage');
    }

  }



}

