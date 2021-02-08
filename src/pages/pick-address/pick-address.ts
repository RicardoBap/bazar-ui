import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  itens: EnderecoDTO[]
  pedido: PedidoDTO

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser()
    if(localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.itens = response['enderecos']

          let cart = this.cartService.getCart()

          this.pedido = {
            cliente: { id: response['id'] },
            enderecoEntrega: null,
            pagamento: null,
            itens: cart.itens.map(x => { 
              return { quantidade: x.quantidade, produto: { id: x.produto.id } 
            } })
          } 
        },
        error => {
          if(error.status === 403) {
            this.navCtrl.setRoot('HomePage')
          }
        })     
    }
    else {
      this.navCtrl.setRoot('HomePage')
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoEntrega = { id: item.id }
    console.log(this.pedido)
  }

}

/*
{
        id: "1",
         logradouro: "Rua Quinze de Novembro",
        numero: "300",
        complemento: "Apto 200",
        bairro: "Santa Mônica",
        cep: "48293822",
        cidade: {
          id: "1",
          nome: "Uberlândia",
          estado: {
            id: "1",
            nome: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua Alexandre Toledo da Silva",
        numero: "405",
        complemento: null,
        bairro: "Centro",
        cep: "88933822",
        cidade: {
          id: "3",
          nome: "São Paulo",
          estado: {
            id: "2",
            nome: "São Paulo"
          }
        }
      }
      */