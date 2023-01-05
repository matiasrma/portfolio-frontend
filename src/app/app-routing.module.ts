import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAcercadeComponent } from './components/acercade/edit-acercade.component';
import { EditPersonaComponent } from './components/banner/edit-persona.component';
import { EditEducacionComponent } from './components/experiencia-educacion/edit-educacion.component';
import { EditExperienciaComponent } from './components/experiencia-educacion/edit-experiencia.component';
import { NewEducacionComponent } from './components/experiencia-educacion/new-educacion.component';
import { NewExperienciaComponent } from './components/experiencia-educacion/new-experiencia.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EditProyectoComponent } from './components/proyectos/edit-proyecto.component';
import { NewProyectoComponent } from './components/proyectos/new-proyecto.component';
import { EditSkillComponent } from './components/skills/edit-skill.component';
import { NewSkillComponent } from './components/skills/new-skill.component';
import { EditSocialComponent } from './components/social/edit-social.component';
import { NewSocialComponent } from './components/social/new-social.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'nuevaexp', component: NewExperienciaComponent},
  {path: 'editexperiencia/:id', component: EditExperienciaComponent},
  {path: 'nuevaedu', component: NewEducacionComponent},
  {path: 'editeducacion/:id', component: EditEducacionComponent},
  {path: 'editpersona/:id', component: EditPersonaComponent},
  {path: 'editacercade/:id', component: EditAcercadeComponent},
  {path: 'nuevoproyecto', component: NewProyectoComponent},
  {path: 'editproyecto/:id', component: EditProyectoComponent},
  {path: 'nuevaskill', component: NewSkillComponent},
  {path: 'editskill/:id', component: EditSkillComponent},
  {path: 'nuevasocial', component: NewSocialComponent},
  {path: 'editsocial/:id', component: EditSocialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
