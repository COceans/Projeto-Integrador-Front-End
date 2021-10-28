import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ListaProdutosService } from '../service/lista-produtos.service';
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
  comprados = this.carrinho.getItens()

  div1: Boolean = false

  constructor(
    private router: Router,
    private auth: AuthService,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private carrinho: ListaProdutosService
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

abrirDiv(){
  this.div1 = true
}

comprar(produto: any){
  this.carrinho.addItem(produto);
  alert('produto adicionado ao carrinho!')
  
}

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay: true,
  autoplaySpeed: 1000,
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

  

}
