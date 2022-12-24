import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoAPComponent } from './components/logo-ap/logo-ap.component';
import { SocialComponent } from './components/social/social.component';
import { BannerComponent } from './components/banner/banner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { ExperienciaEducacionComponent } from './components/experiencia-educacion/experiencia-educacion.component';
import { ItemExpComponent } from './components/item-exp/item-exp.component';
import { ItemEduComponent } from './components/item-edu/item-edu.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ItemSkillComponent } from './components/item-skill/item-skill.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ItemProyectoComponent } from './components/item-proyecto/item-proyecto.component';
import { BotonAgregarComponent } from './components/boton-agregar/boton-agregar.component';
import { BotonModificarEliminarComponent } from './components/boton-modificar-eliminar/boton-modificar-eliminar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoAPComponent,
    SocialComponent,
    BannerComponent,
    AcercadeComponent,
    ExperienciaEducacionComponent,
    ItemExpComponent,
    ItemEduComponent,
    SkillsComponent,
    ItemSkillComponent,
    ProyectosComponent,
    ItemProyectoComponent,
    BotonAgregarComponent,
    BotonModificarEliminarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
