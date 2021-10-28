import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produto: Produto = new Produto()
  idProduto: number
  listaProdutos: Produto[]
  categoria: Categoria = new Categoria()
  idCategoria: number
  listaCategoria: Categoria[]

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit() {
    

    this.produtoService.refreshToken()
    this.categoriaService.refreshToken()

    let id = this.route.snapshot.params['id']
    this.idCategoria = this.route.snapshot.params['id']
    this.findByIdProduto(this.idCategoria)
    

    this.getAllProduto()
    
  }

  recarregarPagina(){
    window.location.reload();
  }

  getAllProduto(){
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
      
    })
  }
  
  
  findByIdProduto(id: number){
    this.produtoService.getProdutoById(this.idProduto).subscribe((resp: Produto) => {
      this.produto = resp
  
    })
  
  }

  findByIdCategoria(id: number){
    this.categoriaService.getCategoriaById(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  findAllCategoria(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

}
