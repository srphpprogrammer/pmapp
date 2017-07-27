import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HttpProvider } from  '../../providers/http/http';
import * as AppConfig from '../../app/app.config';

/**
 * Generated class for the CreateTaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage {
	private formData: FormGroup;
	public title: string;
	public desc: string;
	public status: string;
	public config:any;
	public  project: any = {};

  constructor(
  	public navCtrl: NavController, 
    public navParams: NavParams,
  	public formBuilder: FormBuilder,
    public http: HttpProvider,
    public alertCtrl: AlertController
    ) {
  	this.config = AppConfig.config;

    this.formData = this.formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      status: ['', Validators.required],
    });

    if(navParams.get('project')){
      let pdata: any  = navParams.get('project');
      this.project.id = pdata.id;
    }


  }

  ionViewDidLoad() {
  }



  create(){
 if(this.formData.valid){
 		console.log(this.formData.value);
 	  this.formData.setValue({project_id:this.project.id})

      this.http.post(
      	this.config.url.api+this.config.endpoint.task,this.formData.value
       )
      .subscribe(

      data=>{
        //this.navCtrl.setRoot('CreateTaskPage',data);
      },

      error=>{
        
      let alert = this.alertCtrl.create({
        title: 'Error Occured. Please try Again',
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
