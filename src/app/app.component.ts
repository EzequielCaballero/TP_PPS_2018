import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';
//jQUERY
import * as $ from 'jquery';
//PAGES
import { LoginPage,
         ClienteInicioPage, ClientePerfilPage, ClienteViajePage, ClienteReservaPage, ClienteHistorialPage, ClienteEstadisticaPage, ClienteEncuestaPage, //--CLIENTE
         ChoferInicioPage, ChoferPerfilPage, ChoferViajePage, ChoferHistorialPage, ChoferEstadisticaPage, ChoferEncuestaPage,//-----------------------------CHOFER
         SupervisorInicioPage, SupervisorPerfilPage, SupervisorSeguimientoPage, SupervisorEstadisticaPage, SupervisorEncuestaPage,//------------------------SUPERVISOR
         SupervisorUsuarioPage, SupervisorVehiculoPage, SupervisorListaUsuariosPage, SupervisorListaVehiculosPage, SupervisorRegistroUsuarioPage, SupervisorRegistroVehiculoPage} from '../pages/index-paginas';
//SERVICIOS
import { AuthServicioProvider } from '../providers/auth-servicio/auth-servicio';
//import { PushOneSignalProvider } from '../providers/push-one-signal/push-one-signal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;
  mostrarSplash:boolean = true;
  pagesApp: Array<{title: string, component: any, visibility: boolean}>;
  usuarioSesion:any;

  //Variables para control de vistas
  vista_cliente:boolean = false;
  vista_chofer:boolean = false;
  vista_supervisor:boolean = false;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menu: MenuController,
              public auth: AuthServicioProvider) {

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

    });

    this.auth.afAuth.authState
    .subscribe(
      user => {
        this.menu.enable(true);
        if (user) {
          switch(user.displayName){
            case "cliente":
            this.vista_cliente = true;
            this.vista_chofer = false;
            this.vista_supervisor = false;
            this.rootPage = ClienteInicioPage;
            break;
            case "chofer":
            this.vista_cliente = false;
            this.vista_chofer = true;
            this.vista_supervisor = false;
            this.rootPage = ChoferInicioPage;
            break;
            case "supervisor":
            case "superusuario":
            this.vista_cliente = false;
            this.vista_chofer = false;
            this.vista_supervisor = true;
            this.rootPage = SupervisorInicioPage;
            break;
          }

          this.pagesApp = [
            //PAGINAS CLIENTE (7)
            { title: 'Inicio', component: ClienteInicioPage, visibility: this.vista_cliente },
            { title: 'Perfil', component: ClientePerfilPage, visibility: this.vista_cliente },
            { title: 'Viaje', component: ClienteViajePage, visibility: this.vista_cliente },
            { title: 'Reserva', component: ClienteReservaPage, visibility: this.vista_cliente },
            { title: 'Historial', component: ClienteHistorialPage, visibility: this.vista_cliente },
            { title: 'Estadística', component: ClienteEstadisticaPage, visibility: this.vista_cliente },
            { title: 'Encuesta', component: ClienteEncuestaPage, visibility: this.vista_cliente },
            //PAGINAS CHOFER (6)
            { title: 'Inicio', component: ChoferInicioPage, visibility: this.vista_chofer },
            { title: 'Perfil', component: ChoferPerfilPage, visibility: this.vista_chofer },
            { title: 'Viaje', component: ChoferViajePage, visibility: this.vista_chofer },
            { title: 'Historial', component: ChoferHistorialPage, visibility: this.vista_chofer },
            { title: 'Estadística', component: ChoferEstadisticaPage, visibility: this.vista_chofer },
            { title: 'Encuesta', component: ChoferEncuestaPage, visibility: this.vista_chofer },
            //PAGINAS SUPERVISOR (11)
            { title: 'Inicio', component: SupervisorInicioPage, visibility: this.vista_supervisor },
            { title: 'Perfil', component: SupervisorPerfilPage, visibility: this.vista_supervisor },
            { title: 'Seguimiento', component: SupervisorSeguimientoPage, visibility: this.vista_supervisor },
            { title: 'Estadística', component: SupervisorEstadisticaPage, visibility: this.vista_supervisor },
            { title: 'Encuesta', component: SupervisorEncuestaPage, visibility: this.vista_supervisor },
            { title: 'Control usuarios', component: SupervisorUsuarioPage, visibility: this.vista_supervisor },
            { title: 'Control vehiculos', component: SupervisorVehiculoPage, visibility: this.vista_supervisor },
            { title: 'Lista usuarios', component: SupervisorListaUsuariosPage, visibility: this.vista_supervisor },
            { title: 'Lista vehiculos', component: SupervisorListaVehiculosPage, visibility: this.vista_supervisor },
            { title: 'Registro Usuarios', component: SupervisorRegistroUsuarioPage, visibility: this.vista_supervisor },
            { title: 'Registro Vehiculos', component: SupervisorRegistroVehiculoPage, visibility: this.vista_supervisor }
          ];

        } else {
          this.menu.enable(false);
          this.rootPage = LoginPage;
        }
      },
      () => {
        this.menu.enable(false);
        this.rootPage = LoginPage;
      }
    );

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  login() {
  	this.auth.signOut();
  	this.nav.setRoot(LoginPage);
  }

  logout() {
  	this.menu.close();
  	this.auth.signOut();
  	this.nav.setRoot(LoginPage);
  }



}
