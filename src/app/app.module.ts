import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//PAGES
import { LoginPage, ClienteInicioPage, ChoferInicioPage, SupervisorInicioPage } from '../pages/index-paginas';
//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//CONFIGURACION FIREBASE
import { environment } from '../environments/environment';

//HTTP
import { HttpModule } from '@angular/http';

//SERVICIOS
import { UsuarioServicioProvider } from '../providers/usuario-servicio/usuario-servicio';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ClienteInicioPage,
    ChoferInicioPage,
    SupervisorInicioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ClienteInicioPage,
    ChoferInicioPage,
    SupervisorInicioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioServicioProvider
  ]
})
export class AppModule {}
