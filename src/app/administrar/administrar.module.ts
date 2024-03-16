import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdministrarComponent } from './administrar.component';
import { AdministrarRoutingModule } from './administrar-routing.module';
import { HeaderComponent } from './header/header.component';
import { SocialComponent } from './social/social.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { SkillComponent } from './skill/skill.component';
import { AcercaDeComponent } from './acercade/acercade.component';
import { HasSkillComponent } from './has_skill/has_skill.component';
import { ProyectoComponent } from './proyecto/proyecto.component';

@NgModule({
  declarations: [
    AdministrarComponent,
    HeaderComponent,
    SocialComponent,
    ExperienciaComponent,
    SkillComponent,
    AcercaDeComponent,
    HasSkillComponent,
    ProyectoComponent
  ],
  imports: [
    CommonModule,
    AdministrarRoutingModule,
    FormsModule
  ]
})
export class AdministrarlModule { }
