import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  produto: Produto = new Produto();
  idProduto: number;
  listaProdutos: Produto[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.produtoService.refreshToken()

    let id = this.route.snapshot.params['id']
    this.idProduto = this.route.snapshot.params['id']
    this.findByIdProduto(id)

    this.getAllProduto()
  }

  getAllProduto(){
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findByIdProduto(id: number){
    this.produtoService.getProdutoById(id).subscribe((resp: Produto)=>{
      this.produto = resp
    })
  }

}
