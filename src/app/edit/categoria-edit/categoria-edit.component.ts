import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {

  ativoEstoque: boolean

  categoria : Categoria = new Categoria()

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  

  ngOnInit() {

  this.categoriaService.refreshToken()


  let id = this.route.snapshot.params['id']
  this.findByIdCategoria(id)

  }

  findByIdCategoria(id: number){
    this.categoriaService.getCategoriaById(id).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }


  atualizar(){

    this.categoria.ativo = this.ativoEstoque

    this.categoriaService.putCategoria(this.categoria).subscribe((resp: Categoria) => {
      this.categoria = resp
      alert('Categoria alterada com sucesso!')
      this.router.navigate(['/categoria'])
    })
  }

  active(event: any){
    this.ativoEstoque = event.target.value
  }

  
}




