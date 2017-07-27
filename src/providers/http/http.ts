import { Injectable } from '@angular/core';
import * as AppConfig from '../../app/app.config';
import {Storage} from '@ionic/storage';
//import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
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
     console.log(e,"Error")
    });
*/

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

  getToken(){
     return Observable.fromPromise(this.storage.get('token'));
  }


  get(url:any){
    return this.getToken().flatMap( api_token => {
      let params: URLSearchParams = new URLSearchParams();
      let requestOptions = new RequestOptions();
      requestOptions.search = params;
      params.set('api_token', api_token);
      return this.http.get(url, requestOptions);
  });

  /*
  let params: URLSearchParams = new URLSearchParams();
  let requestOptions = new RequestOptions();
  requestOptions.search = params;
  params.set('api_token', 'vwsby6oK2cMKJuNfmLBYgNMBKpeYvBDuAIhPfF0PJnsGsS5C5rmPXph7QdHY');
  return this.http.get(url, requestOptions);
  */

  }

  post(url:any, data:any){

    return this.getToken().flatMap( api_token => {
      let params: URLSearchParams = new URLSearchParams();
      let requestOptions = new RequestOptions();
      requestOptions.search = params;
      params.set('api_token', api_token);
      return this.http.post(url,JSON.stringify(data),requestOptions);
    });

  }

  

  logout(){
    this.storage.remove('name');
    this.storage.remove('token');
    this.storage.clear().then(() => {
      console.log('Keys have been cleared');
    });
  }


}
