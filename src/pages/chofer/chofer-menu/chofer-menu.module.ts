import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoferMenuPage } from './chofer-menu';

@NgModule({
  declarations: [
    ChoferMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ChoferMenuPage),
  ],
})
export class ChoferMenuPageModule {}
