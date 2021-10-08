import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria = new Categoria
  idCategoria: number

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
     
  ) { }

  ngOnInit() {

  let id = this.route.snapshot.params['id']
  this.findByIdCategoria(id)
  }
  findByIdCategoria(id: number){
    this.categoriaService.getCategoriaById(id).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
}

  apagar(){
    this.categoriaService.deleteCategoria(this.idCategoria).subscribe(()=>{
      alert('Categoria apagada com sucesso!')
      this.router.navigate(['/categoria'])
    })
  }
}
