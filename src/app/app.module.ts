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
import { SkillsComponent } from './components/skills/skills.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component'
import { FormsModule } from '@angular/forms';
import { interceptorProvider } from './services/interceptor-service';
import { NewExperienciaComponent } from './components/experiencia-educacion/new-experiencia.component';
import { EditExperienciaComponent } from './components/experiencia-educacion/edit-experiencia.component';
import { NewEducacionComponent } from './components/experiencia-educacion/new-educacion.component';
import { EditEducacionComponent } from './components/experiencia-educacion/edit-educacion.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { EditPersonaComponent } from './components/banner/edit-persona.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { EditAcercadeComponent } from './components/acercade/edit-acercade.component';
import { NewProyectoComponent } from './components/proyectos/new-proyecto.component';
import { EditProyectoComponent } from './components/proyectos/edit-proyecto.component';
import { NewSkillComponent } from './components/skills/new-skill.component';
import { EditSkillComponent } from './components/skills/edit-skill.component';
import { NewSocialComponent } from './components/social/new-social.component';
import { EditSocialComponent } from './components/social/edit-social.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoAPComponent,
    SocialComponent,
    BannerComponent,
    AcercadeComponent,
    ExperienciaEducacionComponent,        
    SkillsComponent,
    ProyectosComponent,
    HomeComponent,
    LoginComponent,
    NewExperienciaComponent,
    EditExperienciaComponent,
    NewEducacionComponent,
    EditEducacionComponent,
    EditPersonaComponent,
    EditAcercadeComponent,
    NewProyectoComponent,
    EditProyectoComponent,
    NewSkillComponent,
    EditSkillComponent,
    NewSocialComponent,
    EditSocialComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({}),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [
    interceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
