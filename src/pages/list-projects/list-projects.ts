import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from  '../../providers/http/http';
import * as AppConfig from '../../app/app.config';

/**
 * Generated class for the ListProjectsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-projects',
  templateUrl: 'list-projects.html',
})
export class ListProjectsPage {

  config: any;
  projects: any;
  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
  	public http: HttpProvider
  	) {

  	this.config = AppConfig.config;
  }



  ionViewDidLoad() {
  	 this.http.get(this.config.url.api+this.config.endpoint.project)
    .subscribe(
      data => {
      	this.projects = data.json();
      	console.log(data);
      	console.log(this.projects);
      },
      error => {
      	console.log(error,"Error Caught");
      });
  }

  createProject(){
  	this.navCtrl.push('CreateProjectPage');
  }

  viewProject(page: any){
  	this.navCtrl.push('ViewProjectPage',page);
  }


}
