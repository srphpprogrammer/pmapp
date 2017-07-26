import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {Storage} from '@ionic/storage';
import { HttpProvider } from  '../../providers/http/http';

/**
 * Generated class for the LogInPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {
  private formData: FormGroup;
    public email: string;
  public password: string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
  	public formBuilder: FormBuilder,
    public http: HttpProvider,
    public alertCtrl: AlertController) {

    this.formData = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.required],
    });

  }

  login(){

 if(this.formData.valid){

      this.http.login(
        this.email,
        this.password,
       )
      .subscribe(

      data=>{
        this.saveData(data);
        this.navCtrl.setRoot('AccountHomePage');
      },

      error=>{
        
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Invalid Username or Password',
        buttons: ['OK']
      });

      alert.present();

    }

    )

    }else{

      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Invalid Fields. Please Check',
        buttons: ['OK']
      });
      alert.present();

    }


  }

  saveData(data: any) {
    let rs = data.json();
    this.storage.set("name", rs[0].name);
    this.storage.set("token", rs[0].token);
  }


}
