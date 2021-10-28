import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Produto } from '../model/Produto';
import { ListaProdutosService } from '../service/lista-produtos.service';
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
  comprados = this.carrinho.getItens()

  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private carrinho: ListaProdutosService
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.produtoService.refreshToken()
    

    let id = this.route.snapshot.params['id']
    this.idProduto = this.route.snapshot.params['id']
    this.findByIdProduto(this.idProduto)

    this.getAllProduto()
  }

  getAllProduto(){
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }
  
  findByIdProduto(id: number){
    this.produtoService.getProdutoById(this.idProduto).subscribe((resp: Produto)=>{
      this.produto = resp
    })
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
  

  comprar(produto: any){
    this.carrinho.addItem(produto);
    alert('produto adicionado ao carrinho!')
    
  }
  

}


