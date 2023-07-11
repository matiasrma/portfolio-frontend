import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/Model/experiencia';
import { ServiceExperienciaService } from 'src/app/services/experiencia.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  listaExperiencia: Experiencia[] = [];
  userName: string = "";

  listaEliminar: Experiencia[] = [];
  
  respuesta: string = "";
  guardarClass: string = "guardar";

  constructor(
    public imageService: ImageService,
    private experienciaService: ServiceExperienciaService,
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
    this.obtenerListaExperiencia();
  }

  async obtenerListaExperiencia(){
    await this.experienciaService.ObtenerLista(1).then(data => this.listaExperiencia = data);
  }

  Volver(){
    this.router.navigate(['Inicio']);
  }

  Agregar(){
    this.listaExperiencia.push({} as Experiencia);
  }

  Eliminar(experiencia: Experiencia){
    this.listaEliminar.push(experiencia);
    let indexEliminar = this.listaExperiencia.findIndex(exp => exp.Id == experiencia.Id);
    this.listaExperiencia.splice(indexEliminar,1);    
  }

  async Guardar(){
    this.respuesta = "Guardando Informacion";
    await this.experienciaService.Guardar(this.listaExperiencia).then(data =>{
      this.respuesta = data;
      this.respuesta.includes("correctamente")? this.guardarClass = "guardar" : this.guardarClass = "guardar error" ;
    });
    if (this.listaEliminar.length > 0){
      await this.experienciaService.Eliminar(this.listaEliminar).then(data => {
        this.respuesta += data;
        this.respuesta.includes("correctamente")? this.guardarClass = "guardar" : this.guardarClass = "guardar error" ;
      });
    }    
    await this.obtenerListaExperiencia();
  }

  borrarRespuesta(){
    this.respuesta = '';
  }

  async uploadImagen($event: any, i: number){
    
    let id = 0;
    if (this.listaExperiencia[i].Id < 1){
      this.listaExperiencia.forEach(exp => {
        if(exp.Id > id) id = exp.Id;
      });
    } else {
      id = this.listaExperiencia[i].Id;
    }
    
    const name = 'experiencia_' + id;
    this.imageService.uploadImage($event, name);
    this.imageService.getImages(name).then(data =>{
      console.log(data);      
      this.listaExperiencia[i].img_exp = data;
    });
      
  }

}
