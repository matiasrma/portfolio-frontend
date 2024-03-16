import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'', component: PrincipalComponent,
  children: [
    { path: 'Home', component: HomeComponent},
    { path: '', redirectTo:'Home', pathMatch: 'full'},
    { path: '**', redirectTo:'Home'}
  ]
} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
