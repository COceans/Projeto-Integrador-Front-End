import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Produto } from '../model/Produto';


import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent implements OnInit {

  busca: string
  produto: Produto = new Produto()
  listaProdutos: Produto[]
  

  constructor(
   
    private route: ActivatedRoute,
    private produtoService: ProdutoService
    
  ) { }

  ngOnInit() {
    this.produtoService.refreshToken()
    window.scroll(0,0)
    this.busca = this.route.snapshot.params["nome"]
    this.pesquisar()
  }

  pesquisar(){
    this.produtoService.getByNomeProduto(this.busca).subscribe((resp: Produto[])=>{
      this.listaProdutos = resp
    }) 
    
   


  }

}
