import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/Model/skill';
import { SkillService } from 'src/app/services/skill.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  listaSkill: Skill[] = [];
  userName: string = "";

  listaEliminar: Skill[] = [];
  
  respuesta: string = "";
  guardarClass: string = "guardar";

  constructor(
    public imageService: ImageService,
    private SkillService: SkillService,
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
    this.obtenerListaSkill();
  }

  async obtenerListaSkill(){
    await this.SkillService.ObtenerLista(1).then(data => this.listaSkill = data);
  }

  Volver(){
    this.router.navigate(['Inicio']);
  }

  Agregar(){
    this.listaSkill.push({} as Skill);
  }

  Eliminar(Skill: Skill){
    this.listaEliminar.push(Skill);
    let indexEliminar = this.listaSkill.findIndex(exp => exp.Id == Skill.Id);
    this.listaSkill.splice(indexEliminar,1);    
  }

  async Guardar(){
    this.respuesta = "Guardando Informacion";
    await this.SkillService.Guardar(this.listaSkill).then(data =>{
      console.log(data);      
      this.respuesta = data.toString();
      this.respuesta.includes("correctamente")? this.guardarClass = "guardar" : this.guardarClass = "guardar error" ;
    });
    if (this.listaEliminar.length > 0){
      await this.SkillService.Eliminar(this.listaEliminar).then(data => {
        this.respuesta += data;
        this.respuesta.includes("correctamente")? this.guardarClass = "guardar" : this.guardarClass = "guardar error" ;
      });
    }    
    await this.obtenerListaSkill();
  }

  borrarRespuesta(){
    this.respuesta = '';
  }

  async uploadImagen($event: any, i: number){
    
    let id = 0;
    if (this.listaSkill[i].Id < 1){
      this.listaSkill.forEach(exp => {
        if(exp.Id > id) id = exp.Id;
      });
    } else {
      id = this.listaSkill[i].Id;
    }
    
    const name = 'Skill_' + id;
    this.imageService.uploadImage($event, name);
    this.imageService.getImages(name).then(data =>{
      console.log(data);      
      this.listaSkill[i].img_skill = data;
    });
      
  }

}
