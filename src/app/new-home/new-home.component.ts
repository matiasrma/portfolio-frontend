import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Acd } from '../Model/acd';
import { Experiencia } from '../Model/experiencia';
import { Proyecto } from '../Model/proyecto';
import { Skill } from '../Model/skill';
import { AcdService } from '../services/acd.service';
import { ServiceExperienciaService } from '../services/experiencia.service';
import { ProyectoService } from '../services/proyecto.service';
import { SkillService } from '../services/skill.service';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../Model/persona.model';
import { CommonModule } from '@angular/common';
import { Social } from '../Model/social';
import { SocialService } from '../services/social.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.css'],
  standalone: true,
  imports: [CommonModule, ChatComponent]
  
})
export class NewHomeComponent implements OnInit {

  @ViewChild('Hola') Hola: ElementRef = {} as ElementRef;
  @ViewChild('SobreMi') SobreMi: ElementRef = {} as ElementRef;
  @ViewChild('SkillsTag') SkillsTag: ElementRef = {} as ElementRef;
  @ViewChild('Experiencias') Experiencias: ElementRef = {} as ElementRef;
  @ViewChild('Proyectos') Proyectos: ElementRef = {} as ElementRef;

  isLoad = false;  
  persona: Persona = {} as Persona;  
  acercaDe: Acd = {} as Acd;
  texto: string[] = []
  listaExperiencia: Experiencia[] = [];  
  listaSkills: Skill[] = [];
  listaProyectos: Proyecto[] = [];
  socials: Social[] = [];  

  selectedLink = "Inicio";

  listaTextoProy: { [id: number] : string[] } = [];

  classLoaded: string = "";
  countImageLoaded: number = 0;

  menu: boolean = false;

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
    this.changeMenu();
  } 

  changeMenu(){
    let windowWidth = window.innerWidth;    
    if (windowWidth >= 530){
      this.menu = false;
    } else{
      this.menu = !this.menu ;
    }
  }

  setSelectedLink($event:any){

    let windowWidth = window.innerWidth; 
    if (windowWidth >= 530){
      this.menu = false;
    } 
    let scrollOffset = $event.target.scrollTop;
    let windowHeigth = window.innerHeight;    

    const estilo = window.getComputedStyle(this.SobreMi.nativeElement);
    const marginTop = parseInt(estilo.getPropertyValue('margin-top').toString().replace('px',''));

    let heightHola = marginTop + this.Hola.nativeElement.offsetHeight;
    let heightSobreMi = heightHola + marginTop + this.SobreMi.nativeElement.offsetHeight;
    let heightSkills = heightSobreMi + marginTop + this.SkillsTag.nativeElement.offsetHeight;  
    let heightExperiencia = heightSkills + marginTop + this.Experiencias.nativeElement.offsetHeight;  
    let heightProyecto = heightExperiencia + marginTop + this.Proyectos.nativeElement.offsetHeight;  
        
    if (scrollOffset + windowHeigth > heightProyecto + marginTop) {
      this.selectedLink = "Contacto";
    } else if (scrollOffset > heightExperiencia) {
      this.selectedLink = "Proyectos";
    } else if (scrollOffset > heightSkills) {
      this.selectedLink = "Experiencias";
    } else if (scrollOffset > heightSobreMi) {
      this.selectedLink = "SkillsTag";
    } else if (scrollOffset > heightHola) {
      this.selectedLink = "SobreMi";
    } else {
      this.selectedLink = "Inicio";
    }
  }

  goTo(element: HTMLElement){
    element.scrollIntoView({ behavior: "smooth" });
  }

  async ObtenerListas(){    
    await this.ObtenerProyectos();
    await this.ObtenerExperiencia();
    await this.ObtenerSkills();
    await this.ObtenerSocial();
  }

  async ObtenerSocial(){
    await this.socialService.ObtenerLista(1).then(data => this.socials = data);
  }
  
  async ObtenerExperiencia(){
    await this.serviceExperiencia.ObtenerLista(1)
    .then(data => {
      this.listaExperiencia = data;      
    })    
    
    if (this.listaExperiencia.length >0) this.listaExperiencia.sort((a, b) => b.Id - a.Id);
    
  }

  async ObtenerSkills(){
    await this.skillService.ObtenerLista(1).then(data => { this.listaSkills = data;  });
  }

  async ObtenerProyectos(){
    await this.proyectoService.ObtenerLista(1).then(data => this.listaProyectos = data);
    
    if (this.listaProyectos.length > 0){

      for (let proyecto of this.listaProyectos){
        this.setTextProy(proyecto.Id ,proyecto.descripcion_proyecto);
      }

    } else {
      //this.isLoad = true;
      this.imageLoaded();
    }
    
  }

  setTextProy(id: number, text: string): void {
    let textArray: string[] = text.split("\\n");
    this.listaTextoProy[id] = textArray;
  }

  imageLoaded(){

    if (this.listaProyectos.length == 0){
      this.classLoaded = "loaded";
      this.isLoad = true;
      return;
    }

    this.countImageLoaded += 1;
    let countImage = 0;
    //this.listaProyectos.map(e => e.has_skills.length).reduce((acc, curr) => { return acc + curr });
    this.listaProyectos.forEach(p => {
        if (p.has_skills) countImage += p.has_skills.length
    });
    
    if (this.countImageLoaded >= this.listaSkills.length && this.countImageLoaded >= countImage){
      this.classLoaded = "loaded";
      this.isLoad = true;
    }    
  }

  changeActive(skill: Skill){    
    
    this.listaSkills.forEach(s => { 
      s.active = s.Id == skill.Id;   
    });

    this.listaProyectos.forEach(proy =>{
      proy.has_skills.forEach(s => {
        s.active = s.Id == skill.Id;        
      });
    });

    this.listaExperiencia.forEach(exp =>{
      exp.has_skills.forEach(s => {
        s.active = s.Id == skill.Id;        
      });
    });

  }

}
