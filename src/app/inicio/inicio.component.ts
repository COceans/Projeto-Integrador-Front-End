import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  produto: Produto = new Produto
  listaProdutos: Produto[]
  categoria: Categoria = new Categoria
  listaCategoria: Categoria[]
  idCategoria: number
  usuario: Usuario = new Usuario
  idUsuario = environment.id

  constructor(
    private router: Router,
    private auth: AuthService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
  

  if (environment.token == '') {
      
    this.router.navigate(['/entrar']);
  }

  this.auth.refreshToken();
  this.produtoService.refreshToken()

  this.getAllProduto()

}

getAllProduto(){
  this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
    this.listaProdutos = resp
  })
}

publicar(){
  this.categoria.id = this.idCategoria;
  this.produto.categoria = this.categoria;

  this.usuario.id = this.idUsuario;
  this.produto.usuario = this.usuario;

  this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
    this.produto = resp;
    alert('Produto publicado com sucesso!');
    this.produto = new Produto();
    this.getAllProduto();
  });
}

}
