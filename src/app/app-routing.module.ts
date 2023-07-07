import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', redirectTo: 'Inicio', pathMatch: 'full' },
  { path:'Inicio', loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
