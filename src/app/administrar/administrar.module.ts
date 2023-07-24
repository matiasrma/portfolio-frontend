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

@NgModule({
  declarations: [
    AdministrarComponent,
    HeaderComponent,
    SocialComponent,
    ExperienciaComponent,
    SkillComponent,
    AcercaDeComponent
  ],
  imports: [
    CommonModule,
    AdministrarRoutingModule,
    FormsModule
  ]
})
export class AdministrarlModule { }
