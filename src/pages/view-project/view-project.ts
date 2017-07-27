import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { HttpProvider } from	'../../providers/http/http';
import * as AppConfig from '../../app/app.config';

/**
 * Generated class for the ViewProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-view-project',
  templateUrl: 'view-project.html',
})
export class ViewProjectPage {

	private formData: FormGroup;
	public config:any;
	public title:any;
	public  project: any = {};
	public  tasks: any;

/*	tasks: Array<{id: number,
				  project_id: number,
				  title: string, 
				  desc: string, 
				  icon: string, 
				  showDetails: boolean,
				  created_at: string,
				}> = [];*/


  constructor(
  	public navCtrl: NavController, 
    public navParams: NavParams,
  	public formBuilder: FormBuilder,
    public http: HttpProvider,
    public alertCtrl: AlertController
    ) {

  	this.config = AppConfig.config;

    if(navParams.data){
    	this.project.title = navParams.get('title');
    	this.project.project_id = navParams.get('id');
    }

  }


  ionViewDidLoad() {
  	 this.http.get(this.config.url.api+this.config.endpoint.project+'/tasks/'+this.project.project_id)
    .subscribe(
      data => {

      	let tasks = data.json();
		tasks.forEach(function (t) {
			t.icon = 'ios-add-circle-outline';
			t.showDetails = false;
		});
    	
    	this.tasks = tasks;
      },
      error => {
      	console.log(error,"Error Caught");
      });
  }

  viewTask(t){
  	this.navCtrl.push("ViewTaskPage",t);
  }

  toggleDetails(task) {
    if (task.showDetails) {
        task.showDetails = false;
        task.icon = 'ios-add-circle-outline';
    } else {
        task.showDetails = true;
        task.icon = 'ios-remove-circle-outline';
    }
  }


}
