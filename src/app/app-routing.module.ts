import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewHomeComponent } from './new-home/new-home.component';

const routes: Routes = [
  { path:'', redirectTo: 'NewHome', pathMatch: 'full' },
  { path:'Inicio', loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule) },
  { path:'Administrar', loadChildren: () => import('./administrar/administrar.module').then(m => m.AdministrarlModule) },
  { path:'NewHome', component: NewHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
