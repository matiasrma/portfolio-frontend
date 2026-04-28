import { Routes } from '@angular/router';
import { AdministrarComponent } from './administrar.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { SkillComponent } from './skill/skill.component';
import { AcercaDeComponent } from './acercade/acercade.component';
import { HasSkillComponent } from './has_skill/has_skill.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { SocialComponent } from './social/social.component';

export const ADMINISTRAR_ROUTES: Routes = [
  { path: '', component: AdministrarComponent },
  { path: 'Experiencia', component: ExperienciaComponent },
  { path: 'Skills', component: SkillComponent },
  { path: 'AcercaDe', component: AcercaDeComponent },
  { path: 'Proyectos', component: ProyectoComponent },
  { path: 'Social', component: SocialComponent }
];
