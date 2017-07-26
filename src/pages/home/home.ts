import {Component } from '@angular/core';
import {NavController,IonicPage } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { HttpProvider } from  '../../providers/http/http'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
  	public navCtrl: NavController,
    private storage: Storage,
    public http: HttpProvider
  	) {

  }

  ionViewCanEnter(){
    this.http.isLoggedIn().then(data => {
      if(data === true){
        this.navCtrl.setRoot('AccountHomePage');
      }else{
        return true;
      }
    });
  }

  signup(){
    this.navCtrl.push('SignUpPage');
  }

  login(){
    this.navCtrl.push('LogInPage');
  }

}
