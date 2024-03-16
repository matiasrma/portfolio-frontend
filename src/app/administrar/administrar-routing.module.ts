import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarComponent } from './administrar.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { SkillComponent } from './skill/skill.component';
import { AcercaDeComponent } from './acercade/acercade.component';
import { ProyectoComponent } from './proyecto/proyecto.component';

const routes: Routes = [
  { path:'', component: AdministrarComponent,
  children: [
    { path: 'Experiencia', component: ExperienciaComponent},
    { path: 'Skill', component: SkillComponent},
    { path: 'AcercaDe', component: AcercaDeComponent},
    { path: 'Proyecto', component: ProyectoComponent},
  ]
} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarRoutingModule { }
