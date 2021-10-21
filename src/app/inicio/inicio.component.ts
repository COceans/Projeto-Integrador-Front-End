import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
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
  idProduto: number
  title = 'ng-carousel-demo'

  constructor(
    private router: Router,
    private auth: AuthService,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
  
    window.scroll(0,0)

  if (environment.token == '') {
      
    this.router.navigate(['/entrar']);
  }

  this.auth.refreshToken();
  this.produtoService.refreshToken()
  this.categoriaService.refreshToken()


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

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}

  slides = [
    {id: 1, img: "https://dummyimage.com/350x150/423b42/fff"},
    {id: 2, img: "https://dummyimage.com/350x150/2a2b7a/fff"},
    {id: 3, img: "https://dummyimage.com/350x150/1a2b7a/fff"},
    {id: 4, img: "https://dummyimage.com/350x150/7a2b7a/fff"},
    {id: 5, img: "https://dummyimage.com/350x150/9a2b7a/fff"},
    {id: 6, img: "https://dummyimage.com/350x150/5a2b7a/fff"},
    {id: 6, img: "https://dummyimage.com/350x150/4a2b7a/fff"}
  ];

}
