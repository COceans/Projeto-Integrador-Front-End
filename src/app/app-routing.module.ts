import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CompraComponent } from './compra/compra.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';

const routes: Routes = [

{path: "", redirectTo: "inicio", pathMatch: "full"},


{path:"entrar", component: EntrarComponent},
{path: "cadastrar", component: CadastrarComponent},
{path:"inicio", component: InicioComponent},
{path:"categoria", component: CategoriaComponent},
{path:"categoria-edit/:id", component: CategoriaEditComponent},
{path:"categoria-delete/:id", component: CategoriaDeleteComponent},
{path:"produto-edit/:id", component: ProdutoEditComponent},
{path:"produto-delete/:id", component: ProdutoDeleteComponent},
{path:"compra/:id", component: CompraComponent},
{path:"produtos/:id", component: ProdutosComponent},
{path: "carrinho", component: CarrinhoComponent},
{path: "pesquisar/:nome", component: PesquisarComponent},
{path: "sobre-nos", component: SobreNosComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
