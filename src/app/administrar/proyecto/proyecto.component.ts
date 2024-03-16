import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/Model/proyecto';
import { Skill } from 'src/app/Model/skill';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { ImageService } from 'src/app/services/image.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  listaProyecto: Proyecto[] = [];
  listaSkills: Skill[] = [];
  userName: string = "";

  listaActivos: Skill[] = [];
  proy_Id_selected: number = null;

  listaEliminar: Proyecto[] = [];
  listaEliminarSkills: {[Id: number]: Skill[] } = [];
  
  respuesta: string = "";
  guardarClass: string = "guardar";

  constructor(
    public imageService: ImageService,
    private ProyectoService: ProyectoService,
    private skillService: SkillService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    activatedRoute.queryParamMap.subscribe(
      params => {
        this.userName = (params.get("user_name"));
      }
    )
  }

  ngOnInit(): void {
    this.obtenerSkills();
    this.obtenerListaProyecto();
  }

  async obtenerListaProyecto(){
    await this.ProyectoService.ObtenerLista(1).then(data => this.listaProyecto = data);    
  }

  async obtenerSkills(){
    this.listaSkills = await this.skillService.ObtenerLista(1);
  }

  Volver(){
    this.router.navigate(['Inicio']);
  }

  Agregar(){
    this.listaProyecto.push({} as Proyecto);
  }

  Eliminar(Proyecto: Proyecto){
    this.listaEliminar.push(Proyecto);
    let indexEliminar = this.listaProyecto.findIndex(exp => exp.Id == Proyecto.Id);
    this.listaProyecto.splice(indexEliminar,1);    
  }

  async Guardar(){
    this.respuesta = "Guardando Informacion";
    await this.ProyectoService.Guardar(this.listaProyecto).then(data =>{
      this.respuesta = data;
      this.respuesta.includes("correctamente")? this.guardarClass = "guardar" : this.guardarClass = "guardar error" ;
    });
    if (this.listaEliminar.length > 0){
      await this.ProyectoService.Eliminar(this.listaEliminar).then(data => {
        this.respuesta += data;
        this.respuesta.includes("correctamente")? this.guardarClass = "guardar" : this.guardarClass = "guardar error" ;
      });
    }
    
    this.listaProyecto.forEach(async proyecto => {
      if (proyecto.has_skills.length > 0){
        this.ProyectoService.AddSKill(proyecto.has_skills, proyecto.Id);
      }

      if (this.listaEliminarSkills[proyecto.Id]){
        this.ProyectoService.DeleteSKill(this.listaEliminarSkills[proyecto.Id], proyecto.Id);
      }

    }); 
    
    await this.obtenerListaProyecto();
  }

  borrarRespuesta(){
    this.respuesta = '';
  }

  async uploadImagen($event: any, i: number){
    
    let id = 0;
    if (this.listaProyecto[i].Id < 1){
      this.listaProyecto.forEach(exp => {
        if(exp.Id > id) id = exp.Id;
      });
    } else {
      id = this.listaProyecto[i].Id;
    }
    
    const name = 'Proyecto_' + id;
    this.imageService.uploadImage($event, name);      
  }

  ModificarSkills(id: number, lista: Skill[]){
    this.proy_Id_selected = id;
    this.listaActivos = lista;

    if (!this.listaEliminarSkills[this.proy_Id_selected]){
      this.listaEliminarSkills[this.proy_Id_selected] = [];      
    } 
  }

}
