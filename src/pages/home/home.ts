import { Component } from '@angular/core';

import { IonicPage, MenuController, NavController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credenciais: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false)
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true)
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
    .subscribe(response => {      
      //console.log(response.headers.get('Authorization'))
      this.auth.successfullLogin(response.headers.get('Authorization'))
      this.navCtrl.setRoot('CategoriasPage')
    },
    error => {})
  
  }

  login() {
    this.auth.authenticate(this.credenciais)
      .subscribe(response => {
        //console.log(response.headers.get('Authorization'))
        this.auth.successfullLogin(response.headers.get('Authorization'))
        this.navCtrl.setRoot('CategoriasPage')
      })
    error => {}       
  }

}
