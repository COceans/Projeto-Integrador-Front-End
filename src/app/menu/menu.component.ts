import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  produto: Produto = new Produto
  listaProdutos: Produto[]
  categoria: Categoria = new Categoria
  listaCategoria: Categoria[]
  idCategoria: number
  usuario: Usuario = new Usuario
  idUsuario = environment.id
  idProduto: number

  constructor(
    private router: Router,
    private auth: AuthService,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {

    this.produtoService.refreshToken()

    this.categoriaService.refreshToken()

    window.scroll(0,0)

    this.findAllCategoria()

    this.getAllProduto()
  }

  getAllProduto(){
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findByIdProduto(){
    this.produtoService.getProdutoById(this.idProduto).subscribe((resp: Produto) => {
      this.produto = resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getCategoriaById(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  findAllCategoria(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }
  
  publicar(){
    this.categoria.id = this.idCategoria;
    this.produto.categoria = this.categoria;

  
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp;
      alert('Produto publicado com sucesso!');
      this.produto = new Produto();
      this.getAllProduto();
    });


  }

}
