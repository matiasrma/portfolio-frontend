import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Acd } from '../Model/acd';
import { Experiencia } from '../Model/experiencia';
import { Proyecto } from '../Model/proyecto';
import { Skill } from '../Model/skill';
import { Router } from '@angular/router';
import { AcdService } from '../services/acd.service';
import { ServiceExperienciaService } from '../services/experiencia.service';
import { ProyectoService } from '../services/proyecto.service';
import { SkillService } from '../services/skill.service';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../Model/persona.model';
import { CommonModule } from '@angular/common';
import { Social } from '../Model/social';
import { SocialService } from '../services/social.service';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NewHomeComponent implements OnInit {

  @ViewChild('Proyectos', { read: HTMLElement, static: true })
  public Proyectos: HTMLElement;

  isLoad = false;  
  persona: Persona = {} as Persona;  
  acercaDe: Acd = {} as Acd;
  texto: string[] = []
  listaExperiencia: Experiencia[] = [];  
  listaSkills: Skill[] = [];
  listaProyectos: Proyecto[] = [];
  socials: Social[] = [];  

  selectedLink = "Inicio";

  constructor(
    public personaService: PersonaService,
    private proyectoService: ProyectoService,
    private skillService: SkillService,
    private serviceExperiencia: ServiceExperienciaService,
    private acdService: AcdService,
    private socialService: SocialService
  ) { 
  }  

  ngOnInit(): void {    
    this.ObtenerListas();
  } 

  setSelectedLink($event:any){
    let scrollOffset = $event.target.scrollTop;
    
    if (scrollOffset > 2830) {
      this.selectedLink = "Contacto";
    } else if (scrollOffset > 1329) {
      this.selectedLink = "Proyectos";
    } else if (scrollOffset > 537) {
      this.selectedLink = "SobreMi";
    } else {
      this.selectedLink = "Inicio";
    }
  }

  goTo(id: string){
    this.Proyectos = document.getElementById(id);    
    this.Proyectos.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  async ObtenerListas(){    
    await this.ObtenerDatos();
    await this.ObtenerProyectos();
    await this.ObtenerAcercaDe();
    await this.ObtenerExperiencia();
    await this.ObtenerSkills();
    await this.ObtenerSocial();
    this.isLoad = true;
  }

  async ObtenerDatos(){
    await this.personaService.Obtener(1).then(
      data => {
        this.persona = data; 
    });       
    this.isLoad = true;
  }
  async ObtenerSocial(){
    await this.socialService.ObtenerLista(1).then(data => this.socials = data);
  }

  async ObtenerAcercaDe(){
    await this.acdService.Obtener(1).then(data => {
      this.acercaDe = data;
      if (this.acercaDe.textoacd != undefined) this.texto = this.acercaDe.textoacd.split('\n');
      this.texto.shift();
      this.acercaDe.textoacd = this.texto.join();
    })
  }

  async ObtenerExperiencia(){
    await this.serviceExperiencia.ObtenerLista(1).then(data => this.listaExperiencia = data);
    this.listaExperiencia.sort((a, b) => b.Id - a.Id);
  }

  async ObtenerSkills(){
    await this.skillService.ObtenerLista(1).then(data => this.listaSkills = data);
  }

  async ObtenerProyectos(){
    await this.proyectoService.ObtenerLista(1).then(data => this.listaProyectos = data);
  }

}
