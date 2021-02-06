import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeService } from '../../services/cidade.service';
import { EstadoService } from '../../services/estado.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup
  estados: EstadoDTO[]
  cidades: CidadeDTO[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {

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

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response
        this.formGroup.controls.estadoId.setValue(this.estados[0].id)
        this.updateCidades()
      }, error => {} )
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId
    this.cidadeService.findAll(estado_id) 
      .subscribe(response => {
        this.cidades = response
        this.formGroup.controls.cidadeId.setValue(null)
      }, error => {} )
  }

  signupUser() {
    console.log("Enviou o form")
  }

}