import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//FIREBASE
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-chofer-inicio',
  templateUrl: 'chofer-inicio.html',
})
export class ChoferInicioPage {

  usuarioSesion:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

        this.usuarioSesion = firebase.auth().currentUser;
        console.log("Usuario actual: " + JSON.stringify(this.usuarioSesion));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoferInicioPage');
  }

}
