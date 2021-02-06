import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        nome: ['Joaquim', [ Validators.required, Validators.minLength(5), Validators.maxLength(50) ] ],
        email: ['Joaquim@mail.com', [ Validators.required, Validators.email ] ],
        tipo: ['1', [ Validators.required ] ],
        cpfOuCnpj: ['22493931840', [ Validators.required, Validators.minLength(11), Validators.maxLength(14) ] ],
        senha: ['123', [ Validators.required ] ],
        logradouro: ['Rua Via', [ Validators.required ] ],
        numero: ['25', [ Validators.required ] ],
        complemento: ['Apto 3', [] ],
        bairro: ['Copacabana', [] ],
        cep: ['13000-100', [ Validators.required ] ],
        telefone1: ['(19) 99659-2800', [ Validators.required ] ],
        telefone2: ['', [] ],
        telefone3: ['', [] ],
        estadoId: [null, [ Validators.required ] ],
        cidadeId: [null, [ Validators.required ] ]
      })
  }

  signupUser() {
    console.log("Enviou o form")
  }

}

/*
nome: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(50) ] ],
email: ['', [ Validators.required, Validators.email ] ],
tipo: ['', [ Validators.required ] ],
cpfOuCnpj: ['', [ Validators.required, Validators.minLength(11) ] ],
senha: ['', ['', [ Validators.required ] ],
logradouro: ['', [ Validators.required ] ],
numero: ['', [ Validators.required ] ]
        */