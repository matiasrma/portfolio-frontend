import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './banner/banner.component';
import { HeaderComponent } from './header/header.component';
import { PrincipalRoutingModule } from './principal-routing.module';
import { EnContruccionComponent } from './en-contruccion/en-contruccion.component';
import { SocialComponent } from './social/social.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    PrincipalComponent,
    HomeComponent,
    BannerComponent,
    EnContruccionComponent,
    LoginComponent,    
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    FormsModule,
    SocialComponent,
    HeaderComponent
  ]
})
export class PrincipalModule { }
