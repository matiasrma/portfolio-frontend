import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AcdService } from '../services/acd.service';
import { ExperienciaService } from '../services/experiencia.service';
import { ProyectoService } from '../services/proyecto.service';
import { SkillService } from '../services/skill.service';
import { SocialService } from '../services/social.service';
import { Acd } from '../Model/acd';
import { Experiencia } from '../Model/experiencia';
import { Proyecto } from '../Model/proyecto';
import { Skill } from '../Model/skill';
import { Social } from '../Model/social';
@Component({
  selector: 'app-new-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent implements OnInit {
  @ViewChild('Inicio') Inicio!: ElementRef<HTMLElement>;
  @ViewChild('Hola') Hola!: ElementRef<HTMLElement>;
  @ViewChild('SobreMi') SobreMi!: ElementRef<HTMLElement>;
  @ViewChild('SkillsTag') SkillsTag!: ElementRef<HTMLElement>;
  @ViewChild('Experiencias') Experiencias!: ElementRef<HTMLElement>;
  @ViewChild('Proyectos') Proyectos!: ElementRef<HTMLElement>;
  @ViewChild('Contacto') Contacto!: ElementRef<HTMLElement>;

  private acdService = inject(AcdService);
  private experienciaService = inject(ExperienciaService);
  private skillService = inject(SkillService);
  private proyectoService = inject(ProyectoService);
  private socialService = inject(SocialService);

  isLoad = false;  
  acercaDe: Acd = {} as Acd;
  texto: string[] = [];
  listaExperiencia: Experiencia[] = [];  
  listaSkills: Skill[] = [];
  listaProyectos: Proyecto[] = [];
  socials: Social[] = [];  

  selectedLink = "Inicio";
  listaTextoProy: { [id: number]: string[] } = {};
  classLoaded = "";
  countImageLoaded = 0;
  menu = false;

  ngOnInit(): void {    
    this.ObtenerListas();
    this.changeMenu();
  } 

  changeMenu(): void {
    const windowWidth = window.innerWidth;    
    this.menu = windowWidth >= 530 ? false : !this.menu;
  }

  setSelectedLink($event: any): void {
    const windowWidth = window.innerWidth; 
    if (windowWidth >= 530) {
      this.menu = false;
    } 
    const scrollOffset = $event.target.scrollTop;
    const windowHeigth = window.innerHeight;    

    const estilo = window.getComputedStyle(this.SobreMi.nativeElement);
    const marginTop = parseInt(estilo.getPropertyValue('margin-top').toString().replace('px',''));

    const heightHola = marginTop + this.Hola.nativeElement.offsetHeight;
    const heightSobreMi = heightHola + marginTop + this.SobreMi.nativeElement.offsetHeight;
    const heightSkills = heightSobreMi + marginTop + this.SkillsTag.nativeElement.offsetHeight;  
    const heightExperiencia = heightSkills + marginTop + this.Experiencias.nativeElement.offsetHeight;  
    const heightProyecto = heightExperiencia + marginTop + this.Proyectos.nativeElement.offsetHeight;  
        
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

  goTo(el: any): void {
    if (el?.nativeElement) {
      el.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  async ObtenerListas(): Promise<void> {    
    await Promise.all([
      this.ObtenerProyectos(),
      this.ObtenerExperiencia(),
      this.ObtenerSkills(),
      this.ObtenerSocial()
    ]);
  } 

  async ObtenerSocial(): Promise<void> {
    this.socials = await this.socialService.ObtenerLista(1);
    this.imageLoaded();
  }
  
  async ObtenerExperiencia(): Promise<void> {
    this.listaExperiencia = await this.experienciaService.ObtenerLista(1);    
    if (this.listaExperiencia.length > 0) {
      this.listaExperiencia.sort((a, b) => b.Id - a.Id);
    }
    this.imageLoaded();
  }

  async ObtenerSkills(): Promise<void> {
    this.listaSkills = await this.skillService.ObtenerLista(1);
    this.imageLoaded();
  }

  async ObtenerProyectos(): Promise<void> {
    this.listaProyectos = await this.proyectoService.ObtenerLista(1);
    
    if (this.listaProyectos.length > 0) {
      for (const proyecto of this.listaProyectos) {
        this.setTextProy(proyecto.Id, proyecto.descripcion_proyecto);
      }
    } 
    this.imageLoaded();
  }

  setTextProy(id: number, text: string): void {
    const textArray: string[] = text.split("\\n");
    this.listaTextoProy[id] = textArray;
  }

  imageLoaded(): void {
    this.countImageLoaded += 1;
    
    if (this.countImageLoaded >= 4) {
      this.classLoaded = "loaded";
      this.isLoad = true;
    }    
  }

  changeActive(skill: Skill): void {    
    this.listaSkills.forEach(s => { 
      s.active = s.Id == skill.Id;   
    });

    this.listaProyectos.forEach(proy => {
      proy.has_skills.forEach(s => {
        s.active = s.Id == skill.Id;        
      });
    });

    this.listaExperiencia.forEach(exp => {
      exp.has_skills.forEach(s => {
        s.active = s.Id == skill.Id;        
      });
    });
  }
}
