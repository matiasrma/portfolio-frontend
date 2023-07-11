import { Component, Input, OnInit } from '@angular/core';
import { Acd } from 'src/app/Model/acd';
import { Experiencia } from 'src/app/Model/experiencia';
import { AcdService } from 'src/app/services/acd.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ServiceExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';
import { Skill } from 'src/app/Model/skill';
import { SkillService } from 'src/app/services/skill.service';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/Model/proyecto';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoad = false;  
  acercaDe: Acd = {} as Acd;
  texto: string[] = []
  listaExperiencia: Experiencia[] = [];  
  listaSkills: Skill[] = [];
  listaProyectos: Proyecto[] = [];

  constructor(
    private tokenService: TokenService, 
    private proyectoService: ProyectoService,
    private skillService: SkillService,
    private serviceExperiencia: ServiceExperienciaService,
    private personaService: PersonaService,
    private acdService: AcdService,
    private router: Router
    ) { }

  @Input() isLogged: boolean = false;   

  ngOnInit(): void {
    this.personaService.Obtener(1).then(
      data =>{
        this.isLoad = true;
      }
    )    
    this.ObtenerListas();
    this.getIsLogged();
  }

  async ObtenerListas(){
    await this.ObtenerProyectos();
    await this.ObtenerAcercaDe();
    await this.ObtenerExperiencia();
    await this.ObtenerSkills();
  }

  async ObtenerAcercaDe(){
    await this.acdService.Obtener(1).then(data => {
      this.acercaDe = data;
      if (this.acercaDe.textoacd != undefined) this.texto = this.acercaDe.textoacd.split('\n');
    })
  }

  async ObtenerExperiencia(){
    await this.serviceExperiencia.ObtenerLista(1).then(data => this.listaExperiencia = data);
  }

  async ObtenerSkills(){
    await this.skillService.ObtenerLista(1).then(data => this.listaSkills = data);
  }

  async ObtenerProyectos(){
    await this.proyectoService.ObtenerLista(1).then(data => this.listaProyectos = data);
  }

  getIsLogged(){
    if(this.tokenService.getToken()){
      //this.roles = this.tokenService.getAuthorites();      
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    console.log(this.isLogged);
  }

  async onLogout(){
    this.tokenService.logout();
    this.getIsLogged();
  }

  Administrar(tipo: string){
    let userName = this.tokenService.getUsername();
    this.router.navigate(["Administrar/" + tipo],
    { queryParams: { user_name: userName } }
    )
  }

}
