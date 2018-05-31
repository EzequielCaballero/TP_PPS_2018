import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';
//PAGES
import { InicioPage, RegistroPage, LoginPage,
         ClienteInicioPage, ClientePerfilPage, ClienteViajePage, ClienteReservaPage, ClienteHistorialPage, ClienteEstadisticaPage, ClienteEncuestaPage, //--CLIENTE
         ChoferInicioPage, ChoferPerfilPage, ChoferViajePage, ChoferHistorialPage, ChoferEstadisticaPage, ChoferEncuestaPage,//-----------------------------CHOFER
         SupervisorInicioPage, SupervisorPerfilPage, SupervisorSeguimientoPage, SupervisorEstadisticaPage, SupervisorEncuestaPage,//------------------------SUPERVISOR
         SupervisorUsuarioPage, SupervisorVehiculoPage, SupervisorListaUsuariosPage, SupervisorListaVehiculosPage, SupervisorRegistroUsuarioPage, SupervisorRegistroVehiculoPage} from '../pages/index-paginas';
//jQUERY
import * as $ from 'jquery';
//FIREBASE
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;
  mostrarSplash:boolean = true;
  pagesApp: Array<{title: string, component: any, visibility: boolean}>;
  usuarioSesion:any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {

      this.inicializarApp();

  }

  inicializarApp(){

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(()=> {
        $('.splashScreen').addClass('animated fadeOutUp');
      });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          this.usuarioSesion = user;
          this.pagesApp = [
            //PAGINAS CLIENTE
            { title: 'Inicio', component: ClienteInicioPage, visibility: true },
            { title: 'Perfil', component: ClientePerfilPage, visibility: true },
            { title: 'Viaje', component: ClienteViajePage, visibility: true },
            { title: 'Reserva', component: ClienteReservaPage, visibility: true },
            { title: 'Historial', component: ClienteHistorialPage, visibility: true },
            { title: 'Estadistica', component: ClienteEstadisticaPage, visibility: true },
            { title: 'Encuesta', component: ClienteEncuestaPage, visibility: true },
            //PAGINAS CHOFER
            { title: 'Chofer', component: ChoferInicioPage, visibility: true },
            //PAGINAS SUPERVISOR
            { title: 'Supervisor', component: SupervisorInicioPage, visibility: true }
          ];
        } else {
          // No user is signed in.
        }
      });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
