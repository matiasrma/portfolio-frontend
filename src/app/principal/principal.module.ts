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

@NgModule({
  declarations: [
    PrincipalComponent,
    HomeComponent,
    BannerComponent,
    HeaderComponent,
    EnContruccionComponent,
    SocialComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    FormsModule
  ]
})
export class PrincipalModule { }
