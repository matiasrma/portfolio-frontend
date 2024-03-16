import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewHomeComponent } from './new-home/new-home.component';
import { MessengerComponent } from './messenger/messenger.component';
import { AuhtGuard } from './guards/auth.guard';

const routes: Routes = [
  { path:'', redirectTo: 'NewHome', pathMatch: 'full' },
  { path:'Inicio', loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule) },
  { path:'Administrar', loadChildren: () => import('./administrar/administrar.module').then(m => m.AdministrarlModule), canActivate: [AuhtGuard] },
  { path:'NewHome', component: NewHomeComponent },  
  { path: 'Messenger', component: MessengerComponent, canActivate: [AuhtGuard] },
  { path: '**', redirectTo:'NewHome'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
