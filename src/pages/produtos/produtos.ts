import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  itens: ProdutoDTO[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('cat')
    let loader = this.presentLoading() //<--- ABRE O LOADING
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.itens = response['content']
        loader.dismiss() //<-- FECHA JANELA DO LOADING
        this.loadImageUrl()
      }, error => {
        loader.dismiss() // <--- FECHA A JENAL DE LOADING
      } )    
  }

  
  loadImageUrl() {
    for(var i = 0; i < this.itens.length; i++) {
      let item = this.itens[i]
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
        }, error => {} )
    }
  } 

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { prod: produto_id })
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    })
    loader.present()
    return loader
  }

}
