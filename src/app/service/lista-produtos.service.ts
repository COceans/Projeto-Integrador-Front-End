import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ListaProdutosService {
  carrinho: Produto[] = []
  itens = []

  constructor() { }

  addItem(produto: Produto){
    this.carrinho.push(produto)
    }

    getItens(){
    return this.carrinho
    }

    clearItens(){
    this.itens = []
    return this.carrinho
    }

}
