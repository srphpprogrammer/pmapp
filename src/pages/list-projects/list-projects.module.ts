import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListProjectsPage } from './list-projects';

@NgModule({
  declarations: [
    ListProjectsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListProjectsPage),
  ],
  exports: [
    ListProjectsPage
  ]
})
export class ListProjectsPageModule {}