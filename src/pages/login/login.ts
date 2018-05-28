import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//PAGINA
import { ClienteInicioPage, ChoferInicioPage, SupervisorInicioPage } from '../index-paginas';
//FIREBASE
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import{ Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //ATRIBUTOS
  perfil:string = "";
  mostrarSpinner:boolean = false;
  user: Observable<firebase.User>;
  userActive:any;
  myLoginForm:FormGroup;
  flag:boolean = false;
  focus1:boolean = false;
  focus2:boolean = false;
  userNameTxt:string;
  userPassTxt:string;
  //emailFormat:string = '^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i';
  audio = new Audio();
  //CONSTRUCTOR
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public fbLogin:FormBuilder,
              public afAuth:AngularFireAuth) {
        this.user = afAuth.authState;
        console.log("Sesion activa?: " + this.afAuth.auth.currentUser);
        this.userNameTxt = "";
        this.userPassTxt = null;
        this.myLoginForm = this.fbLogin.group({
          userEmail: ['', [Validators.required, Validators.email]],
          userPassword: ['', [Validators.required]],
    });
  }

  //INICIO
  ionViewDidEnter(){
    console.log("Por entrar!");
  }

  //METODOS
  perdioFoco(input:number){
    switch(input)
    {
      case 1:
      this.focus1 = false;
      console.log("Perdio foco 1!");
      break;
      case 2:
      this.focus2 = false;
      console.log("Perdio foco 2!");
      break;
    }
  }

  tieneFoco(input:number){
    switch(input)
    {
      case 1:
      this.focus1 = true;
      console.log("Tiene foco 1!");
      break;
      case 2:
      this.focus2 = true;
      console.log("Tiene foco 2!");
      break;
    }
  }

  validarUsuarioAuth(){
    this.mostrarSpinner = true;
    this.afAuth
      .auth
      .signInWithEmailAndPassword(this.myLoginForm.value.userEmail, this.myLoginForm.value.userPassword)
      .then(value => {
        console.log('Funciona!' + JSON.stringify(value));
          this.mostrarSpinner = false;
          this.ingresar();
        //this.ingresar(value);
      })
      .catch(err => {
        console.log('Algo salió mal: ',err.message);
        this.reproducirSonido();
        this.mostrarSpinner = false;
        this.mostrarAlerta();
      });
  }

  ingresar(){
    this.userActive = firebase.auth().currentUser;
    this.userActive.updateProfile({
      displayName: this.perfil,
      //photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(value => {
      // Update successful.
      this.navCtrl.push(ClienteInicioPage);
    })
    .catch(err => {
      console.log('Algo salió mal: ',err.message);
      this.reproducirSonido();
    });
  }

  // ingresar(usuario:any){
  //   this.navCtrl.push(HomePage, {'userData': usuario});
  // }

  ingresoDePrueba(user:string){
    switch(user){
      case 'cliente':
        this.userNameTxt = "cliente@kbremiseria.com";
        this.userPassTxt = "cliente11";
        break;
      case 'chofer':
        this.userNameTxt = "chofer@kbremiseria.com";
        this.userPassTxt = "chofer22";
        break;
      case 'supervisor':
        this.userNameTxt = "supervisor@kbremiseria.com";
        this.userPassTxt = "supervisor33";
        break;
      case 'superuser':
        this.userNameTxt = "superuser@kbremiseria.com";
        this.userPassTxt = "superuser44";
        break;
    }
  }

  mostrarAlerta(){
    let toast = this.toastCtrl.create({
      message: 'Usuario y/o contraseña incorrectos!',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  reproducirSonido(){
    this.audio.src = "assets/sounds/windows_95_error.mp3";
    this.audio.load();
    this.audio.play();
  }
}
