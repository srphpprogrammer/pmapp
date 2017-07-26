import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { HttpProvider } from	'../../providers/http/http';

/**
 * Generated class for the SignUpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  private formData: FormGroup;
  public fname: string;
  public email: string;
  public password: string;
  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
  	public formBuilder: FormBuilder,
  	public alertCtrl: AlertController,
  	public http: HttpProvider
  	) {

    this.formData = this.formBuilder.group({
      fname: ['', Validators.compose([Validators.required,Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.required],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }


 register(){

    if(this.formData.valid){
    //console.log(this.formData.value,"Error");

      this.http.register(
        this.fname,
        this.email,
        this.password,
       )
      .subscribe(

       data=>{
        this.navCtrl.push('LogInPage');
      },

      error=>{
        
      let erromsg: string;

      switch (error.status) {
      case 409:
        erromsg = 'Email already Exists. Please try another';
      break;

      default:
        erromsg = 'Error. Please try again'
      break;

  
      
      }

      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: erromsg,
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





}
