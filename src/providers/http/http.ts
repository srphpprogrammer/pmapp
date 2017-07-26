import { Injectable } from '@angular/core';
//import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import * as AppConfig from '../../app/app.config';
import {Storage} from '@ionic/storage';
import {AuthHttp} from 'angular2-jwt';
import { Http  } from '@angular/http';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HttpProvider {

  config: any;
  token: any;
  constructor(public http: Http,public storage: Storage) {
    this.config = AppConfig.config;

/*    this.storage.get('token').then(token => {
     return new Promise(resolve => { this.token = token});
    }).catch(e => {
      this.token = null;
    });*/


  }

  register(fname: string,email: string,password: string){
    return this.http.post(this.config.url.api+this.config.endpoint.signup,JSON.stringify({
      fname: fname,
      email: email,
      password: password,
    }));
  }

  login(email: string,password: string){
    return this.http.post(this.config.url.api+this.config.endpoint.login,JSON.stringify({
      email: email,
      password: password,
    }));
  }

  isLoggedIn() {
    return this.storage.get('token').then(token => {
      if (token !== null) {
        return true;
      }
    }).catch(e => {
      return null;
    });
  }

  get(url:string){
    return this.http.get(url);
  }

  logout(){
    this.storage.remove('name');
    this.storage.remove('token');
    this.storage.clear().then(() => {
      console.log('Keys have been cleared');
    });
  }


}
