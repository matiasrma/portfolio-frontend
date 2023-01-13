import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/Model/experiencia';
import { ImageService } from 'src/app/services/image.service';
import { ServiceExperienciaService } from 'src/app/services/service-experiencia.service';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent implements OnInit {

  lista: Experiencia[] = [];    
  experiencia: Experiencia;
  enableUpload: boolean = false;

  constructor(
    private serviceExpericia: ServiceExperienciaService, 
    private router: Router,
    public imageExpService: ImageService) { }

  ngOnInit(): void {
    this.cargarExperiencia();
    this.experiencia = new Experiencia("","","","");
    this.imageExpService.imageurl= "";
    this.imageExpService.uploadProgress = 0;
  }

  cargarExperiencia(): void{
    this.serviceExpericia.lista().subscribe(
      data => {this.lista = data, this.enableUpload = true;}      
    )
  }

  onCreate(): void{
    this.experiencia.imgExp = this.imageExpService.imageurl;    
    this.serviceExpericia.save(this.experiencia).subscribe(
      data=>{
        alert("Experiencia añadida");
        this.router.navigate(['']);
      }, err=>{
        alert('No se pudo agregar experiencia')
        this.router.navigate([''])
      }
    )
  }

  uploadImagen($event: any): void{    
    let nuevoid:number = 0;
    this.lista.forEach(element => {
      if(element.id > nuevoid) { nuevoid = element.id};
    }); 
    const numero = nuevoid + 1;
    const name = 'experiencia_' + numero;
    this.imageExpService.uploadImage($event, name);        
  }
}
