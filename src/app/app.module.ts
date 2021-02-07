import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CategoriaService } from './../services/domain/categoria.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from './../services/storage.service';
import { ClienteService } from './../services/domain/cliente.service';
import { AuthInterceptorProvider } from './../interceptors/auth-interceptor';
import { ProdutoService } from '../services/domain/produto.service';

//import { JwtModule } from '@auth0/angular-jwt';

//export function authHttpServiceFactory (http: Http, options: RequestOptions) {
  //return new AuthHttp(new AuthConfig(), http, options);
//}

//export function tokenGetter() {
  //return localStorage.getItem('token');
//}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
    //JwtModule.forRoot({
      //config: {
        //tokenGetter: tokenGetter
        //whitelistedDomains: API_CONFIG.tokenWhitelistedDomains,
        //blacklistedDomains: API_CONFIG.tokenBlacklistedDomains
      //}
    //})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    //{
      //provide: AuthHttp,
      //useFactory: authHttpServiceFactory,
      //deps: [Http, RequestOptions]
    //},
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    AuthInterceptorProvider, // Necessário declarar antes do ErrorInterceptorProvider para interceptar a authorization e Bearer
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService 
  ]
})
export class AppModule {}
