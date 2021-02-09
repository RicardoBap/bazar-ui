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

  itens: ProdutoDTO[] = []
  page: number = 0

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
     this.loadData()
  }

  loadData() {
    let categoria_id = this.navParams.get('cat')
    let loader = this.presentLoading() //<--- ABRE O LOADING
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        let start = this.itens.length
        this.itens = this.itens.concat(response['content']) // <-- page   
        let end = this.itens.length - 1    
        loader.dismiss() //<-- FECHA JANELA DO LOADING
        console.log(this.page)
        console.log(this.itens)
        this.loadImageUrl(start, end)
      }, error => {
        loader.dismiss() // <--- FECHA A JENAL DE LOADING
      } )   
  }

  
  loadImageUrl(start: number, end: number) {
    for(var i = start; i < end; i++) {
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

  doRefresh(refresher) {
    this.page = 0
    this.itens = []
    this.loadData()
    setTimeout(() => {
      refresher.complete()
    }, 1000)
  }

  doInfinite(infiniteScroll) {
    this.page++
    this.loadData()
    setTimeout(() => {
      infiniteScroll.complete()
    }, 1000)
  }

}
