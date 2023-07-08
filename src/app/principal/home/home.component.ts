import { Component, OnInit } from '@angular/core';
import { Acd } from 'src/app/Model/acd';
import { Experiencia } from 'src/app/Model/experiencia';
import { AcdService } from 'src/app/services/acd.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ServiceExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';
import { Skill } from 'src/app/Model/skill';
import { SkillService } from 'src/app/services/skill.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private skillService: SkillService,
    private serviceExperiencia: ServiceExperienciaService,
    private personaService: PersonaService,
    private acdService: AcdService
    ) { }

  isLoad = false;  
  acercaDe: Acd = {} as Acd;
  texto: string[] = []
  experiencia: Experiencia[] = [];  
  skills: Skill[] = [];

  ngOnInit(): void {
    this.personaService.Obtener(1).then(
      data =>{
        this.isLoad = true;
      }
    )    
    this.ObtenerAcercaDe();
    this.ObtenerExperiencia();
    this.ObtenerSkills();
  }

  async ObtenerAcercaDe(){
    await this.acdService.Obtener(1).then(data => {
      this.acercaDe = data;
      this.texto = this.acercaDe.textoacd.split('\n');
    })
  }

  async ObtenerExperiencia(){
    await this.serviceExperiencia.ObtenerLista(1).then(data => this.experiencia = data);
  }

  async ObtenerSkills(){
    await this.skillService.ObtenerLista(1).then(data => this.skills = data);
  }

}
