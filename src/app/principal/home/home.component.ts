import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AcdService } from '../../services/acd.service';
import { ExperienciaService } from '../../services/experiencia.service';
import { SkillService } from '../../services/skill.service';
import { ProyectoService } from '../../services/proyecto.service';
import { TokenService } from '../../services/token.service';
import { Acd } from '../../Model/acd';
import { Experiencia } from '../../Model/experiencia';
import { Skill } from '../../Model/skill';
import { Proyecto } from '../../Model/proyecto';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../login/login.component';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, LoginComponent, BannerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private acdService = inject(AcdService);
  private experienciaService = inject(ExperienciaService);
  private skillService = inject(SkillService);
  private proyectoService = inject(ProyectoService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  @Input() isLogged = false;
  isLoad = false;  
  acercaDe: Acd = {} as Acd;
  texto: string[] = [];
  listaExperiencia: Experiencia[] = [];  
  listaSkills: Skill[] = [];
  listaProyectos: Proyecto[] = [];

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.ObtenerListas();
  } 

  async ObtenerListas(): Promise<void> {
    await Promise.all([
      this.ObtenerProyectos(),
      this.ObtenerAcercaDe(),
      this.ObtenerExperiencia(),
      this.ObtenerSkills()
    ]);
    this.isLoad = true;
  }

  async ObtenerAcercaDe(): Promise<void> {
    const data = await this.acdService.Obtener(1);
    this.acercaDe = data;
    if (this.acercaDe.textoacd) {
      this.texto = this.acercaDe.textoacd.split('\n');
    }
  }

  async ObtenerExperiencia(): Promise<void> {
    const data = await this.experienciaService.ObtenerLista(1);
    this.listaExperiencia = data.sort((a, b) => b.Id - a.Id);
  }

  async ObtenerSkills(): Promise<void> {
    this.listaSkills = await this.skillService.ObtenerLista(1);
  }

  async ObtenerProyectos(): Promise<void> {
    this.listaProyectos = await this.proyectoService.ObtenerLista(1);
  }

  onLogout(): void {
    this.tokenService.logout();
    this.isLogged = false;
  }

  getIsLogged(): void {
    this.isLogged = this.tokenService.isLogged();
  }

  Administrar(tipo: string): void {
    const userName = this.tokenService.getUsername();
    this.router.navigate(["Administrar/" + tipo], {
      queryParams: { user_name: userName }
    });
  }
}
