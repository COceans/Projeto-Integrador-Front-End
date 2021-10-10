import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  ativoEstoque: string

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {

    this.categoriaService.refreshToken()

    this.produtoService.refreshToken()
  

    this.findAllCategoria()
}

findAllCategoria(){
  this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
    this.listaCategorias = resp
  })
}

cadastrar(){
  this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria) => {
    this.categoria = resp
    alert('Categoria cadastrada com sucesso!')
    this.findAllCategoria()
    this.categoria = new Categoria()
  })
}

active(event: any){
  this.ativoEstoque = event.target.value
}
  
}
