import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewProjectPage } from './view-project';

@NgModule({
  declarations: [
    ViewProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewProjectPage),
  ],
  exports: [
    ViewProjectPage
  ]
})
export class ViewProjectPageModule {}
