import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import {Http,HttpModule} from '@angular/http';
import {Storage} from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpProvider } from '../providers/http/http';
/*import {AuthHttp, AuthConfig} from 'angular2-jwt';
let storage = new Storage({});

export function getAuthHttp(http) {
 return new AuthHttp(new AuthConfig({
     //headerName: 'Authorization',
     tokenName: 'api_token',
    noJwtError: true,
    tokenGetter: (() => storage.get('token')),
  }), http);
}*/

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
/*    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }*/
  ]
})
export class AppModule {}
